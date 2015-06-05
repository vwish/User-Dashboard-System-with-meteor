
Template.header.helpers({
  //add active to current route
	active: function(routeName) {
  	var curRoute = Router.current().route;
  	return curRoute ? (curRoute.getName() === routeName ? 'active' : '') : '';
	}
});
