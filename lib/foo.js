Yavanna.provide('englishGreeting', (inj) => {
  const greet = inj.greet

  var a = 1, b = 1, sum = 0, next, i

  for (i = 0; i < 10; i++) {
    next = a + b
    sum += next
    a = b
    b = next
  }

  console.log(sum)

  return greet('Hello')
})

