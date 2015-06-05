Template.me.helpers({
  showChange: function() {
    return Template.instance().showChange.get();
  },
  showAccount: function() {
    return Template.instance().showAccount.get();
  },
  showEditAccount: function() {
    return Template.instance().showEditAccount.get();
  },
  errorMessage: function() {
    return Template.instance().errorMessage.get();
  },
  infoMessage: function() {
    return Template.instance().infoMessage.get();
  }
});

Template.me.events({
  'click #meSignOut': function(e, t) {
    clearMessages(); //not strictly nec. given setTimeout clears
    Meteor.logout(function() {
      Router.go('home');
    });
    return false;
  },

  'click #meChangePass': function(e, t) {
    Template.instance().showChange.set(true);
    clearMessages();    
    return false;
  },

  'click #meCancel': function(e, t) {
    Template.instance().showChange.set(false);
    clearMessages();
    return false;
  },

  'click #meAccount': function(e, t) {
    Template.instance().showAccount.set(true);    
    // Router.go('account');
    return false;
  },

  'click #meEditAccountCancel': function(e, t) {
    Template.instance().showEditAccount.set(false);
    Template.instance().showAccount.set(true);
    return false;
  },

  'click #meEditAccount': function(e, t) {
    Template.instance().showAccount.set(false);
    Template.instance().showEditAccount.set(true);
    return false;
  },

  'click #meAccountCancel': function(e, t) {
    Template.instance().showAccount.set(false);
    return false;
  },

  'submit #meChangePasswordForm': function(e, t) {
    e.preventDefault();

    var passForm = $(e.currentTarget),
        oldPassword = passForm.find('#oldPassword').val(),
        newPassword = passForm.find('#newPassword').val(),
        newPasswordConfirm = passForm.find('#newPasswordConfirm').val();

    if (isNotEmpty(Template.instance(), oldPassword) && isNotEmpty(Template.instance(), newPassword) && areValidPasswords(Template.instance(), newPassword, newPasswordConfirm)) {

      //inject Template into callback scope
      Accounts.changePassword(oldPassword, newPassword,  
        (function(template) {
          return function(err) {

            if (err) {
              template.errorMessage.set(err.reason);
              // wait 3 seconds, then clear the msg
              Meteor.setTimeout(function() {
                template.errorMessage.set(null);
              }, 3000);
            } else {
              template.infoMessage.set('Password changed');
              Meteor.setTimeout(function() {
                template.infoMessage.set(null);
              }, 3000);
              Router.go('home');
            }

          }; 
        })(Template.instance())  
      );

      //instead of:
      // Accounts.changePassword(oldPassword, newPassword, function(err) {
      //   if (err) {
      //     Template.instance().errorMessage.set(err.reason);
      //   } else {
      //     Template.instance().infoMessage.set('Password changed');
      //     Router.go('home');
      //   }
      // });

    } 
    
    // To go to main dropdown after submit:
    // Template.instance().showChange.set(false);

    return false;
  },

  //TODO: get rid of camelcase in mongo fields

  'submit #meEditAccountForm': function(e, t) {
    e.preventDefault();
    var acctForm = $(e.currentTarget);
    var accountProperties = { 
      emails: [  
        { address: acctForm.find('#inputEmail').val()}
      ], 
      profile: {
        fullName: acctForm.find('#inputFullName').val(),
        city: acctForm.find('#inputCity').val(),
        region: acctForm.find('#inputRegion').val(),
        country: acctForm.find('#inputCountry').val()
      }
    }
    // Meteor.users.update({_id: Meteor.userId()}, {$set: accountProperties}, function(error) {
    //   if (error) {
    //     alert(error.reason);
    //   } else {
    //     Template.instance().showEditAccount.set(false);
    //     Template.instance().showAccount.set(true);
    //   }
    // });

    Meteor.users.update({_id: Meteor.userId()}, {$set: accountProperties},
      (function(template) {
        return function(err) {

          if (err) {
            template.errorMessage.set(err.reason);
            // wait 3 seconds, then clear the msg
            Meteor.setTimeout(function() {
              template.errorMessage.set(null);
            }, 3000);
          } else {
            template.showEditAccount.set(false);
            template.showAccount.set(true);
          }

        }; 
      })(Template.instance())  
    );

  }

});

//use reactive variable to save UI state
Template.me.created = function() {
  this.showChange = new ReactiveVar;
  this.showChange.set(false);
  this.showAccount = new ReactiveVar;
  this.showAccount.set(false);
  this.showEditAccount = new ReactiveVar;
  this.showEditAccount.set(false);
  this.errorMessage = new ReactiveVar;
  this.infoMessage = new ReactiveVar;
};

var clearMessages = function() {
    Template.instance().errorMessage.set(null);
    Template.instance().infoMessage.set(null);
};

var errorMessage = function(str) {
  Template.instance().errorMessage.set(str);
};

var infoMessage = function(str) {
  Template.instance().infoMessage.set(str);
};
