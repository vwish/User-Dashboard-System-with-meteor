Template.login.helpers({
  showForgot: function() {
    return Template.instance().showForgot.get();
  },
  errorMessage: function() {
    return Template.instance().errorMessage.get();
  },
  infoMessage: function() {
    return Template.instance().infoMessage.get();
  },
  signup: function(){
    return document.title = "Sign Up";
  }
});

Template.login.events({
  'click #forgotPass': function(e, t) {
    Template.instance().showForgot.set(true);    
    return false;
  },

  'click #forgotPasswordCancel': function(e, t) {
    Template.instance().showForgot.set(false);
    return false;
  },

  'submit #formLogin': function(e, t) {
    e.preventDefault();

    var signinForm = $(e.currentTarget),
          username = trimInput(signinForm.find('#loginUser').val()),
          password = signinForm.find('#loginPassword').val();

    if (isNotEmpty(Template.instance(), username) && isNotEmpty(Template.instance(), password) && isValidPassword(Template.instance(), password)) {

      Meteor.loginWithPassword(username, password, 
        (function(template) {
          return function(err) {

            if (err) {
             template.errorMessage.set(err.reason);
              // wait 3 seconds, then clear the msg
              Meteor.setTimeout(function() {
                template.errorMessage.set(null);
              }, 3000);
            } else {
              Router.go('home');
            }

          }; 
        })(Template.instance())  
      );
    } 
    return false;
  },

  'submit #forgotPasswordForm': function(e, t) {
    e.preventDefault();

    var forgotPasswordForm = $(e.currentTarget),
        email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

    if (isNotEmpty(Template.instance(), email) && isEmail(Template.instance(), email)) {

      Accounts.forgotPassword({email: email}, 
        (function(template) {
          return function(err) {

            if (err) {
             template.errorMessage.set(err.reason);
              // wait 3 seconds, then clear the msg
              Meteor.setTimeout(function() {
                template.errorMessage.set(null);
              }, 3000);
            } else {
             template.infoMessage.set('Email Sent. Check your mailbox.');
              // wait 3 seconds, then clear the msg
              Meteor.setTimeout(function() {
                template.infoMessage.set(null);
                template.showForgot.set(false);
              }, 3500);
            }

          }; 
        })(Template.instance())  
      );
    } else {
      Template.instance().errorMessage.set("Invalid email address.");

      Meteor.setTimeout(
        (function(template) {
          return function() {

            template.errorMessage.set(null);

          }; 
        })(Template.instance())  
      , 3000);
    }
    return false;
  }
});

Template.login.created = function() {
  this.showForgot = new ReactiveVar;
  this.showForgot.set(false);

  this.errorMessage = new ReactiveVar;
  this.infoMessage = new ReactiveVar;
};

