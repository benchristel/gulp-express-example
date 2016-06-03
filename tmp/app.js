;(function() {
"use strict";

const Yavanna = require('@benchristel/yavanna')

Yavanna.provide('englishGreeting', (inj) => {
  const greet = inj.greet
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyIsImdyZWV0ZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSkE7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFlhdmFubmEgPSByZXF1aXJlKCdAYmVuY2hyaXN0ZWwveWF2YW5uYScpXG5cbllhdmFubmEucHJvdmlkZSgnZW5nbGlzaEdyZWV0aW5nJywgKGluaikgPT4ge1xuICBjb25zdCBncmVldCA9IGluai5ncmVldFxuICByZXR1cm4gZ3JlZXQoJ0hlbGxvJylcbn0pXG5cbiIsImNvbnN0IFlhdmFubmEgPSByZXF1aXJlKCdAYmVuY2hyaXN0ZWwveWF2YW5uYScpXG5cbllhdmFubmEucHJvdmlkZSgnZ3JlZXQnLCAoKSA9PiBcbiAgZ3JlZXRpbmcgPT4gbmFtZSA9PiBgJHtncmVldGluZ30sICR7bmFtZX0uYFxuKVxuXG4iXX0=
