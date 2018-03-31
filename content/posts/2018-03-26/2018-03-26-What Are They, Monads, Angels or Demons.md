---
title: "What are they, monads, angels or demons?"
date: "2018-03-26T10:30:00.000Z"
author: "Zakharova Victoria"
path: "/monads"
featuredImage: ./angels.jpg
tags: ["monads", "Scala"]
---

You've heard about them many times, but still not sure if you need them? Or maybe you use them every day and happy with it? In any case, you do not want to miss a chance to discuss them one more time. If it is so, let's begin!

## Introduction

First of all I'll remind you how they look like.

```scala

trait Monad[F[_]] {

  def flatMap[A, B](fa: F[A])(f: A => F[B]): F[B] = ???
  
  def pure[A](x: A): F[A] = ???

}
```

!!!Monad laws

Misterious, aren't they?..

No, they are not! You must be hit on them several times a day. When you do like this:

```scala

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

def queryFromDatabase: List[Int] = ???

def nextQueryFromDatabase: List[Int] = ???

for{

  firstResult <- Future(queryFromDatabase)
  
  secondResult <- Future(nextQueryFromDatabase)
  
}yield(firstResult :: secondResult)

```

Or like this:

```scala

  val listFirst = List(1, 2, 3, 4)

  val listSecond = List(5, 6, 7, 8)

listFirst.flatMap{ valueFirst => listSecond.map { valueSecond => valueFirst + valueSecond } }

```

Nothing special, to be honest. But why are there generated so much buzz around them? Some people love them, some - hate them. Come on, they are simple lists, futures, options and nothing more!

Yes and no. Look here.

We can write code without monads at all. And there is nothing wrong with it, just another way to express your thoughts.

But notice, if the error occures, the program will crash and it is not a good user experience.

```scala

def queryFromDatabase: List[Int] = ???

def nextQueryFromDatabase: List[Int] = ???

val firstResult = queryFromDatabase

val secondResult = nextQueryFromDatabase

val result = if( firstResult != null ){
  if( secondResult != null ){
    
    firstResult :: secondResult
    
  }else{
  // Attention! The program will throw an error.
    throw(error)
  }
  
}else{
  throw(error)
}

```

We can get rid of flat map in the second case too. Just loop over each of the lists and sum the numbers. 

```scala

val listFirst = List(1, 2, 3, 4)

val listSecond = List(5, 6, 7, 8)

// Attention! Mutable value.
var result: List[Int] = List()

for(i <- listFirst){

  for(j <- listSecond){

    (i + j)::result

  }
}

```

Now it is hard to reason about the code. Somebody can change the state of the variable unintentionally, for example, on an another thread, and we will get a wrong result.

So, what do you think? It seems pretty obvious, that flatMap is a more consice and clever way to code. Is that all? Just a clear syntax? No, it isn't.

Let's elaborate. In both cases we had to use some unsafe technique: throw an error or use a mutable value. And a monad helped us to eliminate this. A monad can modify the value, isolating it from outside world in a container.

There are quite a few problems we can solve with monads. I won't list them myself, but I will cite Bartosz Milewski's great [article](https://bartoszmilewski.com/2016/11/30/monads-and-effects/):

> Here is a short list of similar problems, copied from [Eugenio Moggi’s seminal paper](https://core.ac.uk/download/pdf/21173011.pdf), all of which are traditionally solved by abandoning the purity of functions.
> 1. Partiality: Computations that may not terminate
> 2. Nondeterminism: Computations that may return many results
> 3. Side effects: Computations that access/modify state
>   a. Read-only state, or the environment
>   b. Write-only state, or a log
>   c. Read/write state
> 4. Exceptions: Partial functions that may fail
> 5. Continuations: Ability to save state of the program and then restore it on demand
> 6. Interactive Input
> 7. Interactive Output
> 
> What really is mind blowing is that all these problems may be solved using the same clever trick: turning to embellished functions *(monads, mine note)*.

Thus, we can solve several important problems in two ways. Traditional one is cumbersome and unsafe. Monadic one respects explicitness and clarity. 

More on the problems you can avoid with monads you can read in ["Escaping Hell with Monads"](https://philipnilsson.github.io/Badness10k/escaping-hell-with-monads/).

So, which approach to choose? Hey, take both!

Seriously, you don't have to give up one thing for another. I belive so. Think different. We must understand when to go which way. Understanding will help up to see clearly rather than roam blindly between functional and imperative worlds.

![functional](functional.png)

## It's all about... pure functons?

Now we know that monads can magically rewrite functions into powerfull constructions, which eliminate almost all issues with plain functions. But which properties allow them to do it?

Ok, first of all, list some of these issues, which can be a real pain in the ass, one more time:

1. Functions can fail.
2. The value may be uncertain, when we are not sure if it exists at all.
3. The value can depend on a shared state.
4. Functions can produce effects.
5. Functions can be asyncronous, when the value exists in the future.
6. The function result can vary for the same input.

What are common characteristics you see? We can't reason about the result for sure. We need to know the state of the whole application to do it. You can never know how your program actually works. It is bad, it is very bad. 

Can we invert this description? We want to be sure how the program works. We want to work with a part of an application in isolation to test it. We want to know, that every time, the function receives a result, it produces the same output. As you probably know, it is the definition of a pure function, which is ubiquitous in a functional programming.

I won't write about what functional programming is, you can read it in ["A practical introduction to functional programming"](https://maryrosecook.com/blog/post/a-practical-introduction-to-functional-programming) by Mary Rose Cook. We will talk about less discussed topic: what's the purpose of the pure functions and functional programming in general. 

Some say it is just a matter of style. If you think like that, then I strongly advise you to stop reading this nonsence and verify if you know all words from [here](https://github.com/hemanth/functional-programming-jargon). But if you love digging deeper, then follow me.

Since pure functions are tightly coupled with side effects, I'll better explain what a side effect is.


<div class="reddit-embed" data-embed-media="www.redditmedia.com" data-embed-parent="false" data-embed-live="false" data-embed-uuid="78f29787-e078-4498-9f85-c0151a78eaac" data-embed-created="2018-03-24T17:13:10.619Z"><a href="https://www.reddit.com/r/scala/comments/2898l1/functional_programming_what_are_side_effects/ci8p0bi/">Comment</a> from discussion <a href="https://www.reddit.com/r/scala/comments/2898l1/functional_programming_what_are_side_effects/">Functional Programming : What are side effects?</a>.</div>


From the [Side effect (computer science) - Wikipedia](https://en.wikipedia.org/w/index.php?title=Side_effect_(computer_science)):

> Absence of side effects is a necessary, but not sufficient, condition for referential transparency. Referential transparency means that an expression (such as a function call) can be replaced with its value; this requires that the expression has no side effects and is pure (always returns the same results on the same input). A function without side effects may be impure, for example if its output depends on the value of a global variable.

For example:

```scala
// referential transparent function
def sum(a: Int, b: Int): Int {
  a + b
}

sum(1, 2) == 3 // true

// function with side effect
def sumIO(a: Int, b: Int): Unit {
  println(a + b)
}

sumIO(1, 2) == () // false 

```

Thus, <span class="underline"> a pure function can be with or without side effects </span>, but [evaluation of the result does not cause any semantically observable side effect or output, such as mutation of mutable objects or output to I/O devices](https://en.wikipedia.org/wiki/Pure_function). For example:

```scala

def pureFunction(x: Int): Int = {

  val y = Math.rand()
  
  x
}

pureFunction(2) // always 2

```

And <span  class="underline"> a function without side effects can be impure.</span> For example:

```scala

var x = 3

def impureFunction(){
  x
}

impureFunction() // 3

x += 1

impureFunction() // 4

```

Functions with I/O operations still can be pure. And here we hit into monads. IO monads, to be precise. In Haskell side-effects don't actually execute, they return values instead. In Scala it is not so, as Scala doesn't support lazy evaluation by default. But we can emulate this behaviour ourself easily. We have to implement effectful function in such a way that it returns result, which can substitute the function itself.

```scala
// IO monad
trait IO[A]{ self =>

  def flatMap[B](f: A => IO[B]): IO[B] 

  def map[B](f: A => B): IO[B] = 
      IO{ () => f(self.pure) }

  def pure: A

}
object IO{

  // f - is a function with effects
  def apply[A](f: () => A): IO[A] = 
    new IO{
    
      // We do not actually execute effectful functions, 
      // we compose them instead
      override def flatMap[B](g: A => IO[B]): IO[B] =
        IO{() => g(f()).pure}
      
      // Actual execution
      override def pure: A = 
        f()
    }

}

// Now the funtion is referential transparent
def sum(a: Int, b: Int): IO[Int] {
  IO{() => println(a + b); a + b}
}

sum(1, 2).flatMap(a => IO{() => a + 3}) // returns IO{() => println(3); 6}

```

It may seem, that all monads must be pure, as such is in Haskell. Be careful. Take into consideration that nothing is obvious in Scala. For example, Option is a monad and in Scala it is implemented something like this:

```scala
sealed abstract class Option[+A] {
  def get: A

  def map[B](f: A => B): Option[B] =
      if (isEmpty) None else Some(f(this.get))

  def flatMap[B](f: A => Option[B]): Option[B] =
      if (isEmpty) None else f(this.get)
}

object Option {

  def apply[A](x: A): Option[A] = 
    if (x == null) None else Some(x)
    
}

case class Some[+A](value: A) extends Option[A] {
  def get = value
}

case object None extends Option[Nothing] {
  def get = throw new NoSuchElementException("None.get")
}

```

See anything misleading? Look at flatMap attentively. It is not lazy, it executes. What does it mean? That we can't safely implement effectful operations with it. And if you type Option(println(4)), 4 will be outputed to the console.

```scala

Option(println(4)) // prints 4

```

Same with Future, List, Try and other monads in Scala. So, <span  class="underline"> while monads in scala still abide monad laws, they can't be considered pure. </span> So, functional programming is about pure functions and side effects, but monads are completely orthogonal concepts.

So, while monads are not about purity, they still can help us with the issues we listed in the beginning of the section.

1. Functions can fail. - Option/Try/Either monad.
2. The value may be uncertain, when we are not sure if it exists at all. - Maybe monad.
3. The value can depend on a shared state. - State monad.
4. Functions can produce effects. - IO monad.
5. Functions can be asyncronous, when the value exists in the future. - Future/Promise monad.
6. The function result can vary for the same input. - Random monad.
7. The value may exists, but there are more than one of them. - List monad.


!!!We have to compose and it is hard.


![Transformer](Optimus_Prime.png)


## Monad Transformers

Again, I won't explain, what monad transformers are. You can find answers in a nice article [Monad Transformers for the working programmer](https://blog.buildo.io/monad-transformers-for-the-working-programmer-aa7e981190e7) by Gabriele Petronella.

The main inference from it is that [monads do not compose](http://blog.tmorris.net/posts/monads-do-not-compose/). For their composition you need monad transformers. Example:

```scala

def getUserFromDB(id: String): Future[User] = ???
def getOrderFromDB(user: User): Future[Order] = ???

def findOrderByUserID(id: String): Future[Order] =
  for {
    user    <- getUserFromDB(id)
    order <- getOrderFromDB(user)
  } yield order
  
```

What if we don't know if we have any orders?

```scala

def getUserFromDB(id: String): Future[User] = ???
def getOrderFromDB(user: User): Future[Option[Order]] = ???

def findOrderByUserID(id: String): Future[Order] =
  for {
    user  <- getUserFromDB(id) // Future[User]
    order <- getOrderFromDB(user) // Future[Option[Order]]
  } yield order
  
// Type error. Nothing like we expected.

```
But we can use a monad transformer! 

```scala
import cats.data.OptionT, cats.std.future._
def findOrderByUserID(id: String): Future[Option[Order]] =
  (for {
    user    <- OptionT(getUserFromDB(id))
    order <- OptionT(getOrderFromDB(user))
  } yield order).value

```
Great, now we are safe! Heh, not even close. When you enter the world of monad transformers, there is no way back. There exists a whole ["mtl" library](http://github.com/haskell/mtl/tree/master/Control/Monad) for them in Haskell. Haven't seen anything like that in Scala though. And John A De Goes wrote a great article, which named [There Can Be Only One...IO Monad](http://degoes.net/articles/only-one-io), leverage issues which occure, when we need to compose several monads together. 

So, monad transformers are, literally, just monads wrapping other monads, which help us to compose monads. Nothing more.

!!! Problems with mtl: effects when combine monads, many monads.

Due to several problems, which accompany monad transformers, people introduced other approaches, such as Eff monad ["From Monad Transformers to the Eff Monad"](ttps://rubenpieters.github.io/monadtransformer/cats/eff/2017/01/27/monadtransformer-vs-effmonad-1.html), Extensible effects ["Extensible Effects An Alternative to Monad Transformers"](https://www.cs.indiana.edu/~sabry/papers/exteff.pdf) by Oleg Kiselyov, Algebraic effects [An Introduction to Algebraic Effects and Handlers](http://www.eff-lang.org/handlers-tutorial.pdf).


!!!When we compose, it is overhead, because we can't use fusion. 
!!! All of the problems can be solved in an imperative approach.
JavaScript leverage it's single thread model to write in an imperative style

So, it is necessarily to write in monadic style? No. Can we write it in imperative way? Yes. 

clumsy


