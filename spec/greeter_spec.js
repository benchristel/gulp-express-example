const Yavanna = require('@benchristel/yavanna')

const greet = Yavanna.get('greet')

describe('English greeting', () => {
  var englishGreeting = greet('Hello')  

  it('says hello', () => {
    expect(englishGreeting('Satoshi')).toEqual('Hello, Satoshi.')
  })
})
