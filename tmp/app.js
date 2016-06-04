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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWx1ZGUuanMiLCJsaWIvZm9vLmpzIiwibGliL2dyZWV0ZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDZkE7QUFDQTtBQUNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgWWF2YW5uYSA9IHJlcXVpcmUoJ0BiZW5jaHJpc3RlbC95YXZhbm5hJylcblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB3aW5kb3cuWWF2YW5uYSA9IFlhdmFubmFcbmlmICh0eXBlb2YgZ2xvYmFsID09PSAnb2JqZWN0JykgZ2xvYmFsLllhdmFubmEgPSBZYXZhbm5hXG5cbiIsIllhdmFubmEucHJvdmlkZSgnZW5nbGlzaEdyZWV0aW5nJywgKGluaikgPT4ge1xuICBjb25zdCBncmVldCA9IGluai5ncmVldFxuXG4gIHZhciBhID0gMSwgYiA9IDEsIHN1bSA9IDAsIG5leHQsIGlcblxuICBmb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIG5leHQgPSBhICsgYlxuICAgIHN1bSArPSBuZXh0XG4gICAgYSA9IGJcbiAgICBiID0gbmV4dFxuICB9XG5cbiAgY29uc29sZS5sb2coc3VtKVxuXG4gIHJldHVybiBncmVldCgnSGVsbG8nKVxufSlcblxuIiwiWWF2YW5uYS5wcm92aWRlKCdncmVldCcsICgpID0+IFxuICBncmVldGluZyA9PiBuYW1lID0+IGAke2dyZWV0aW5nfSwgJHtuYW1lfS5gXG4pXG5cbiIsImNvbnN0IFlhdmFubmEgPSByZXF1aXJlKCdAYmVuY2hyaXN0ZWwveWF2YW5uYScpXG5cbmNvbnNvbGUubG9nKFlhdmFubmEuZ2V0KCdlbmdsaXNoR3JlZXRpbmcnKSgnU2F0b3NoaScpKVxuXG4iXX0=
