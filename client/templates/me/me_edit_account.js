Template.meEditAccount.helpers({
  userName: function() {
    return Meteor.user().username;
  },
  email: function() {
    return Meteor.user().emails[0].address;
  },
  fullName: function() {
    return Meteor.user().profile.fullName;
  },
  city: function() {
    return Meteor.user().profile.city;
  },
  region: function() {
    return Meteor.user().profile.region;
  },
  country: function() {
    return Meteor.user().profile.country;
  }

});


