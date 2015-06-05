
Template.adminHeader.helpers({
  //add active to current route
  active: function(routeName) {
    var curRoute = Router.current().route;
    return curRoute.getName() === routeName ? 'active' : '';
  },

  adminHeaderContent: function() {
    return Fake.paragraph(8);
  }
  
});
