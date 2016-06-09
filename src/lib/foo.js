Yavanna.provide('englishGreeting', (inj) => {
  const greet = inj.greet

  var a = 1
  var b = 1
  var sum = 0
  var next, i

  for (i = 0; i < 10; i++) {
    next = a + b
    sum += next
    a = b
    b = next
  }

  return greet('Hello')
})

