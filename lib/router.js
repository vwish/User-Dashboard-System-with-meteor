Router.configure({
  layoutTemplate: 'applicationLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});


// Router.route('meAccount', {
// name:'meAccount',
// layoutTemplate: 'applicationLayout',
// });




Router.route('/', {name: 'home'});
Router.route('/discover', {name: 'discover'});
Router.route('/support', {name: 'support'});
Router.route('/signup', {name: 'signup'});

Router.route('/about', {name: 'about'});
Router.route('/terms', {name: 'terms'});
Router.route('/privacy', {name: 'privacy'});

Router.route('/admin/user/:_id', {
  name: 'userPage',
  layoutTemplate: 'adminLayout',
  waitOn: function() {
    return Meteor.subscribe('singleUser', this.params._id);
  },
  data: function() { 
    return Meteor.users.findOne(this.params._id);
  }
});

Router.route('/admin/sub2', {
  name: 'sub2',
  layoutTemplate: 'adminLayout'
});


Router.route('/admin/users/:usersLimit?', {
  name: 'usersList',
  controller: 'adminController'
});


adminController = RouteController.extend({
  layoutTemplate: 'adminLayout',  
  increment: 5, 
  searchAdmin: function() { 
    return this.params.query.admin || 'false'; 
  },
  searchField: function() { 
    return this.params.query.field || 'user'; 
  },
  searchString: function() { 
    return this.params.query.search; 
  },
  usersLimit: function() { 
    return parseInt(this.params.usersLimit) || this.increment; 
  },
  subscriptions: function() {
      this.usersSub = Meteor.subscribe('users', makeQuery(this.searchString(), this.searchField(), this.searchAdmin()), this.usersLimit());
  },
  userItems: function() {
    return Meteor.users.find({}, {limit: this.usersLimit()});
  },
    
  data: function() {
    var hasMore = this.userItems().count() === this.usersLimit();

    if (this.searchString()) {
      var nextPath = this.route.path({usersLimit: this.usersLimit() + this.increment}, {query: 'search=' + this.searchString() + '&field=' + this.searchField() + '&admin=' + this.searchAdmin()});
    } else {
      var nextPath = this.route.path({usersLimit: this.usersLimit() + this.increment});      
    }

    return {
      userItems: this.userItems(),
      ready: this.usersSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }

});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

var requireAdmin = function() {
  var user = Meteor.user();
  if ((!user) || (!Roles.userIsInRole(user, ['admin']))) {
    this.render('accessDeniedAdmin');
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireAdmin, {only: 'usersList'});
Router.onBeforeAction(requireAdmin, {only: 'userPage'});
