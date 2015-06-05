Template.home.helpers({
  homeBody: function() {
    return Fake.paragraph(8);
  }
});

Template.home.onRendered(function() {
  if (Session.get('resetPasswordToken')){
      $('#resetPasswordModal').modal('show');
  }
});

