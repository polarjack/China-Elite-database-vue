Vue.component('todo-item', {
  template: '\
  <div class="collection-item">\
  {{title}}\
  <i class="material-icons right" v-on:click="$emit(\'remove\')" >delete</i>\
  </div>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      'first',
      'second',
      'third'
    ]
  },
  methods: {
    addNewTodo: function() {
      this.todos.push(this.newTodoText)
      this.newTodoText = ''
    }
  }
})
