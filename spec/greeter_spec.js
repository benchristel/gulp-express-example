const greet = require('../lib/greeter')

describe('English greeting', () => {
  var englishGreeting = greet('Hello')  

  it('says hello', () => {
    expect(englishGreeting('Satoshi')).toEqual('Hello, Satoshi.')
  })
})
