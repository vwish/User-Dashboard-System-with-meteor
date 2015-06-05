
Template.usersList.events({

  'submit #usersListForm': function(e, t) {
    e.preventDefault();
    var userSearch = $(e.currentTarget).find('#searchUser').val();
    var userField = $(e.currentTarget).find('#searchField').val();
    var searchAdmin = $(e.currentTarget).find('#searchAdmin').is(':checked');
    Router.go('usersList',{}, {query: 'search=' + userSearch + '&field=' + toField(userField) + '&admin=' + searchAdmin});
    return false;
  }
});

