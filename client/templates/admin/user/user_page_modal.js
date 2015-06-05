Template.userPageModal.helpers({

  userName: function() {
    return this.username;
  }
});


Template.userPageModal.events({

  'click #userPageModalConfirm': function(e, t) {
    $("#userPageModal").modal("hide");

    Meteor.setTimeout(function() {
      Router.go('usersList');
      Meteor.users.remove({_id: t.data._id});
    }, 500);

    return false;
  }
});

