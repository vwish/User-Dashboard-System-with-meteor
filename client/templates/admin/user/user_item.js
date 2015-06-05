Template.userItem.helpers({

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
  }  
});
