function isOnScreen(element) {
  const bounds = element.getBoundingClientRect()
  const y = bounds.y
  const bottom = window.innerHeight - bounds.bottom
  return y + bounds.height / 2 > 0 && bottom + bounds.height / 2 > 0
}

window.onscroll = function() {
  const els = document.getElementsByClassName("image")
  Array.prototype.forEach.call(els, function(element) {
    if (isOnScreen(element) === true) {
      element.classList.remove("blur")
    } else {
      element.classList.add("blur")
    }
  })
}
