const Yavanna = require('@benchristel/yavanna')

Yavanna.provide('greet', () => 
  greeting => name => `${greeting}, ${name}.`
)

