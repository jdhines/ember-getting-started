Todos.TodoItemComponent = Ember.Component.extend({
  actions: {
    editTodo: function() {
      this.set('isEditing', true)
    },
    acceptChanges: function() {
      this.set('isEditing', false)
      if(Ember.isEmpty(this.get('todo.title'))) {
        this.send('removeTodo')
      } else {
        this.get('todo').save()
      }
    },
    removeTodo: function() {
      var todo = this.get('todo')
      todo.deleteRecord()
      todo.save()
    }
  },
  isEditing: false,
  isCompleted: function(key, value) {
    var model = this.modelFor('index').todos;
    if(value === undefined) {
      //property is being used as a getter
      return model.get('isCompleted')
    } else {
      //property being used as a setter
      model.set('isCompleted', value)
      model.save()
      return value
    }
  }.property('model.isCompleted'),
  becomeFocused: function() {
    this.$().focus()
  }.on('didInsertElement')
})