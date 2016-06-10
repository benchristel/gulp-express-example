const User = Yavanna.get('User')

window.addEventListener('load', function () {
  console.log('users name is', User().name)
})
