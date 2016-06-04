;(function() {
"use strict";

const Yavanna = require('@benchristel/yavanna')

if (typeof window === 'object') window.Yavanna = Yavanna
if (typeof global === 'object') global.Yavanna = Yavanna
}());

;(function() {
"use strict";

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

Yavanna.provide('greet', () => 
  greeting => name => `${greeting}, ${name}.`
)
}());

;(function() {
"use strict";

const Yavanna = require('@benchristel/yavanna')

console.log(Yavanna.get('englishGreeting')('Satoshi'))
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWx1ZGUuanMiLCJmb28uanMiLCJncmVldGVyLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTs7Ozs7O0FDRkE7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFlhdmFubmEgPSByZXF1aXJlKCdAYmVuY2hyaXN0ZWwveWF2YW5uYScpXG5cbmlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykgd2luZG93LllhdmFubmEgPSBZYXZhbm5hXG5pZiAodHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcpIGdsb2JhbC5ZYXZhbm5hID0gWWF2YW5uYVxuXG4iLG51bGwsbnVsbCwiY29uc3QgWWF2YW5uYSA9IHJlcXVpcmUoJ0BiZW5jaHJpc3RlbC95YXZhbm5hJylcblxuY29uc29sZS5sb2coWWF2YW5uYS5nZXQoJ2VuZ2xpc2hHcmVldGluZycpKCdTYXRvc2hpJykpXG5cbiJdfQ==
