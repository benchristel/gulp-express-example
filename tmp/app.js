;(function() {
"use strict";

const Yavanna = require('@benchristel/yavanna')

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
}());

;(function() {
"use strict";

const Yavanna = require('@benchristel/yavanna')

Yavanna.provide('greet', () => 
  greeting => name => `${greeting}, ${name}.`
)
}());

;(function() {
"use strict";

const Yavanna = require('@benchristel/yavanna')

console.log(Yavanna.get('englishGreeting')('Satoshi'))
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyIsImdyZWV0ZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBZYXZhbm5hID0gcmVxdWlyZSgnQGJlbmNocmlzdGVsL3lhdmFubmEnKVxuXG5ZYXZhbm5hLnByb3ZpZGUoJ2VuZ2xpc2hHcmVldGluZycsIChpbmopID0+IHtcbiAgY29uc3QgZ3JlZXQgPSBpbmouZ3JlZXRcblxuICB2YXIgYSA9IDEsIGIgPSAxLCBzdW0gPSAwLCBuZXh0LCBpXG5cbiAgZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBuZXh0ID0gYSArIGJcbiAgICBzdW0gKz0gbmV4dFxuICAgIGEgPSBiXG4gICAgYiA9IG5leHRcbiAgfVxuXG4gIGNvbnNvbGUubG9nKHN1bSlcblxuICByZXR1cm4gZ3JlZXQoJ0hlbGxvJylcbn0pXG5cbiIsImNvbnN0IFlhdmFubmEgPSByZXF1aXJlKCdAYmVuY2hyaXN0ZWwveWF2YW5uYScpXG5cbllhdmFubmEucHJvdmlkZSgnZ3JlZXQnLCAoKSA9PiBcbiAgZ3JlZXRpbmcgPT4gbmFtZSA9PiBgJHtncmVldGluZ30sICR7bmFtZX0uYFxuKVxuXG4iXX0=
