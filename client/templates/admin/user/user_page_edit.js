Template.userPageEdit.helpers({

  errorMessage: function() {
    return Template.instance().errorMessage.get();
  },
  infoMessage: function() {
    return Template.instance().infoMessage.get();
  },
  userName: function() {
    return this.username;
  },
  email: function() {
    return this.emails[0].address;
  },
  fullName: function() {
    return this.profile.fullName;
  },
  city: function() {
    return this.profile.city;
  },
  region: function() {
    return this.profile.region;
  },
  country: function() {
    return this.profile.country;
  },
  admin: function() {
    return Roles.userIsInRole(this, ["admin"]);
  },
  isNotUser: function() {
    return (this.username != Meteor.user().username);
  },
  checkDisable: function() {
    if (this.username == Meteor.user().username) {
      return "disabled";
    }
  }
});

Template.userPageEdit.events({

  'click #userPageEditDelete': function(e, t) {
    $("#userPageModal").modal("show");
    return false;
  },


  'submit #userPageEditForm': function(e, t) {
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
    };
    var adminProperty = acctForm.find('#inputAdmin').is(':checked');
    Meteor.users.update({_id: this._id}, {$set: accountProperties},
      (function(template) {
        return function(err) {

          if (err) {
            template.errorMessage.set(err.reason);
            // wait 3 seconds, then clear the msg
            Meteor.setTimeout(function() {
              template.errorMessage.set(null);
            }, 4000);
          } else {
            template.infoMessage.set('Updates successful!');
            Meteor.setTimeout(function() {
              template.infoMessage.set(null);
              Router.go('usersList');
            }, 3000);
          }
        }; 
      })(Template.instance())  
    );
    if (adminProperty){
      Roles.addUsersToRoles(this._id, ['admin']);      
    } else {
      Roles.removeUsersFromRoles(this._id, ['admin']);            
    };

  }

});

Template.userPageEdit.created = function() {
  this.errorMessage = new ReactiveVar;
  this.infoMessage = new ReactiveVar;
};
