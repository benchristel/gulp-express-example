const Yavanna = require('@benchristel/yavanna')

Yavanna.provide('englishGreeting', (inj) => {
  const greet = inj.greet
  return greet('Hello')
})

