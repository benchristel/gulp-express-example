const $ = require('jquery')

window.addEventListener('load', function () {
  var user = Yavanna.get('User')

  console.log('User', user)

  $.get('/user')
    .then(user => {
      document.body.innerHTML = `Hello, ${user.name}`
    })
})
