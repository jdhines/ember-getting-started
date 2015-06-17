Todos.Router.map(function(){
  this.resource('todos', {path: '/'}, function() {
    this.route('active');
    this.route('completed');
  });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo')
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('todos');
  }
});
Todos.TodosActiveRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },
  /*
  reuse the index template since we want the same UI
  alternative is to create a separate template for each
  route under todos, but that only makes sense if the templates
  would need to be different
  */
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});

Todos.TodosCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },
  /*
  reuse the index template since we want the same UI
  alternative is to create a separate template for each
  route under todos, but that only makes sense if the templates
  would need to be different
  */
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});

