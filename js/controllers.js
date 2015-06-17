Todos.TodosController = Ember.Controller.extend({
  actions: {
    createTodo: function() {
      var title = this.get('newTitle');
      if(!title.trim()) { return }

      //create a new Todo record
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      })

      //clear the "New Todo" input
      this.set('newTitle', '')

      todo.save();
    },

    clearCompleted: function() {
      var completed = this.get('model').filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  allAreDone: function(key, value) {
    var _this = this.get('model');
    if(value === undefined) {
    return !!_this.get('length') && _this.isEvery('isCompleted');
    } else {
      _this.setEach('isCompleted', value);
      _this.invoke('save');
      return value;
    }
  }.property('model.@each.isCompleted'),

  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
    return this.get('model').filterBy('isCompleted', true).get('length');
  }.property('model.@each.isCompleted'),

  remaining: function() {
    return this.get('model').filterBy('isCompleted', false).get('length')
  }.property('model.@each.isCompleted'),
  inflection: Ember.computed('remaining', function() {
    var remaining = this.get('remaining')
    return remaining === 1 ? 'todo' : 'todos'
  })
})