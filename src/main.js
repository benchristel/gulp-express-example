const TodoApp = Yavanna.get('TodoApp')
const View = Yavanna.get('View')

window.addEventListener('load', function () {
  TodoApp(View(document.body))
})
