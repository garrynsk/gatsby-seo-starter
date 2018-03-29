---
title: "Non blocking single producer many consumers queue"
date: "2018-03-16T10:30:00.000Z"
author: "Zakharova Victoria"
path: "/non-blocking-queue"
featuredImage: ./queue-front.jpg
tags: ["non-blocking", "queue", "Scala"]
---

<div style="text-align: center; width: 100%; margin-bottom: 50px;">
<img src="queue.gif" width="80%">
</div>

Non-blocking algorithms allows threads to access shared state without blocking: locks, mutexes, semaphores etc. A blocking concurrency algorithm is an algorithm which can block the thread until the action can be performed safely.

```scala
package architect
package duna
package kernel

import java.lang.Throwable
import scala.util.{ Either, Left, Right }
import scala.runtime.ScalaRunTime._
import scala.reflect.ClassTag 
import java.util.concurrent.ConcurrentLinkedQueue
import scala.collection.immutable.SortedMap

trait QueueIssue{

    val message: String

}

case class CantDequeueEmptyQueue() extends QueueIssue{

    override val message: String = "Can't dequeue for an empty queue."

}
```

  The queue is actually a circular buffer and two pointers, which point to the next writable element and the next readable element.
```scala
case class Queue[

        @specialized(Short, Char, Int, Float, Long, Double, AnyRef) A: ClassTag

    ](private val size: Int){self =>
```

Both pointers start from the zero element. They have [@volatile](http://tutorials.jenkov.com/java-concurrency/volatile.html) annotation, because we need every thread to have an access to the newest value of the variable.
Here is the write pointer.

```scala
@volatile private var writePointer: Int = 0
```

And the read pointer.

```scala
@volatile private var readPointer: Int = 0
```

We calculate an array size available on the machine. 

```scala
private val availableSize = {

    val runtime = Runtime.getRuntime()
    // Hard coded values are: 32bits is Int size, 4 - memory share
    // TODO: change integer zite to A size
    (runtime.freeMemory/4/32).toInt 

}
```

We check the input size. If it is less than one, we make 100000 array (because I want so). 

```scala
val actualSize = size match {

    case number if(number < 1) => 100000

    case number if(number > availableSize) => availableSize

    case number => number

}
```

Then we calculate physical location of the pointers in the array buffer. It should be from 0 to actual array size. So we need to find a reminder of current pointer position and actual array size. 

```scala
private def physicalReadPointer: Int = {

    readPointer  % actualSize

}

private def physicalWritePointer: Int = {

    writePointer  % actualSize

}
```
Here is a buffer array, where we keep all the data.
```scala
private val store: Array[A] = new Array[A](actualSize) 
```

And the next one is for backpressure. I'll write about it below...
```scala
private val tmpStore: ConcurrentLinkedQueue[A] = new ConcurrentLinkedQueue[A]()
```
Whenever a write pointer is bigger than array size, we put next elements into the tmpStore. It is a backpressure strategy. If a producer is faster than consumer, then the default array is not enough. We start using tmpStore, which help us under heavy load. But it can cause an OutOfMemoryException exeption. Type of the tmpStore is ConcurrentLinkedQueue, so it is not limited and can be dynamically resized. Why we didn't do it before? 
Because any linked list based data structure with unknown length at runtime replaces itself with a new allocated structure when the capacity is exceeded. A new structure is allocated and a previous one is collected multiple times. This process can generate a lot of garbage and lead to memory leak.
```scala
def enqueue(value: => A): Either[A, QueueIssue] = {
    // The queue is full, can't rewrite an element which hasn't been read
    if(writePointer >= actualSize){ 

        tmpStore.add(value)

    }else{
        // Enqueue a new element
        store.update(phisicalWritePointer, value) 

    }
     // Move writePointer to the next slot
    val newWritePointer = writePointer + 1

    writePointer = newWritePointer

    Left(value)

}
```
The next method extracts next value from the queue.

```scala
def dequeue: Either[A, QueueIssue] = {

    if(isEmpty){ 
    
        Right{CantDequeueEmptyQueue()}

    }else{

        val res = if(readPointer < actualSize || tmpStore.isEmpty){

            val value = store(phisicalReadPointer) 

            value

        }else{
            
            val dec = tmpStore.poll

            store(phisicalReadPointer) = dec

            dec

        }
        
        val newReadPointer = readPointer + 1 // the next pointer can point at an empty slot, will check on the next dequeue
        
        readPointer = newReadPointer

        Left(res)

    }
}
```
The queue is empty or the next pointer points to an empty slot.
```scala
def isEmpty: Boolean = {

    readPointer == writePointer

}
}

```
