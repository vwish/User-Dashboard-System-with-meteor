
// set done as a variable to pass
var doneCallback;

Accounts.onResetPasswordLink(function(token, done) {
  Session.set('resetPasswordToken', token);
  //see home.js for modal show
  doneCallback = done;
});


Template.resetPasswordModal.helpers({
  errorMessage: function() {
    return Template.instance().errorMessage.get();
  },
  infoMessage: function() {
    return Template.instance().infoMessage.get();
  }
});


Template.resetPasswordModal.events({

  'click #dismissResetPassword': function(e, t) {
    $("#resetPasswordModal").modal("hide");
    Session.set('resetPasswordToken', null);
    Router.go('home');
    return false;
  },

  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();

    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

    if (isNotEmpty(Template.instance(), password) && areValidPasswords(Template.instance(), password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('resetPasswordToken'), password, 
        (function(template) {
          return function(err) {

            if (err) {
              template.errorMessage.set(err.reason);
              // wait 3 seconds, then clear the msg
              Meteor.setTimeout(function() {
                template.errorMessage.set(null);
              }, 3000);
            } else {
              template.infoMessage.set('Password reset!');
              Meteor.setTimeout(function() {
                template.infoMessage.set(null);
                Session.set('resetPasswordToken', null);
                $("#resetPasswordModal").modal("hide");

                if (doneCallback) {
                  doneCallback();
                }
              }, 3000);
              Router.go('home');
            }

          }; 
        })(Template.instance())  
      );

      // Accounts.resetPassword(Session.get('resetPasswordToken'), password, function(err) {
      //   if (err) {
      //     console.log('We are sorry but something went wrong.');
      //   } else {
      //     console.log('Your password has been changed. Welcome back!');
      //     Session.set('resetPasswordToken', null);
      //     if (doneCallback) {
      //       doneCallback();
      //     }
      //     Router.go('home');
      //   }
      // });

    } 
    return false;
  }
});

// if you have links in your template that navigate to other parts of your app, you need to reset your session variable before navigating away, you also need to call the doneCallback to re-enable autoLogin
Template.resetPasswordModal.rendered = function() {
  var sessionReset = function() {
    $("#resetPasswordModal").modal("hide");
    Session.set('resetPasswordToken', null); 
    if (doneCallback) {
      doneCallback();
    }    
  }
};

Template.resetPasswordModal.created = function() {
  this.errorMessage = new ReactiveVar;
  this.infoMessage = new ReactiveVar;
};
