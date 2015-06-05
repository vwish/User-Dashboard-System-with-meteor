//set server side filter to only allow user changes to emails and profile
//unless admin
Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
 		var allowed=["emails", "profile"]; //top level keys allowed

    // Allow admins access to everything published
    if (Roles.userIsInRole(Meteor.userId(), ["admin"])) {
      Meteor.users.update({_id: user._id}, modifier);
      return true;
    } else { 
      // can only change your own documents
      if(user._id === userId) { 
        //check if each field is allowed
      	for (var i =0; i < fields.length; i++) {
      		if (allowed.indexOf(fields[i]) === -1)
  				{
  					return false;
  				}
  			}
  	    Meteor.users.update({_id: userId}, modifier);
  	    return true;
  		}
    }
  },

  remove: function (userId, user) {
    // Allow admins access to everything published
    if (Roles.userIsInRole(Meteor.userId(), ["admin"])) {
      Meteor.users.remove({_id: user.id});
      return true;
    } else { 
      return false;
    }
  }
});

Accounts.emailTemplates.siteName = "meteoryte.com";
Accounts.emailTemplates.from = "Meteoryte Admin <accounts@meteoryte.com>";

//Test denied:  Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'username': "Noot" }} );
//Test allowed:  Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.fullname': "Noot" }} );

// Admins have access to all user records,
// Normal people can only access their own
Meteor.publish("users", function (query, limit) {

  var user = Meteor.users.findOne({_id:this.userId});
  if (Roles.userIsInRole(user, ["admin"])) {
    return Meteor.users.find(query, {limit: limit, fields: {username: 1, emails: 1, profile: 1, roles: 1}});
  } 

  this.stop();
  return;
});

Meteor.publish("singleUser", function (id) {

  var user = Meteor.users.findOne({_id:this.userId});
  if (Roles.userIsInRole(user, ["admin"])) {
    return Meteor.users.find(id, {fields: {username: 1, emails: 1, profile: 1, roles: 1}});
  } 

  this.stop();
  return;
});

// On server startup, if the database is empty, create some initial data.
if (Meteor.isServer) {
  Meteor.startup(function () {
    createUserAdminRole();
    createUsers(); //delete this line before launching
  });

}

createUserAdminRole = function() {
  try {
    // console.log('Creating roles');
    Roles.createRole("admin");
  } catch (error) {
  }
};


// Heroku update
// Create Test Users after db reset
createUsers = function () {
  
  if (Meteor.users.find().fetch().length === 0) {

    console.log('Creating initial users..');

    //add initial admin and a normal
    var users = [
        {username:"normal",fullName:"Normal User",email:"normal@meteoryte.com",roles:[]},
        {username:"root",fullName:"Root User",email:"root@meteoryte.com",roles:['admin']}
      ];

    // add lots of users
    var fakeUser;
    for (i=2; i < 100; i++) {
      fakeUser = Fake.user({
        fields: ['username', 'fullname', 'emails.address'],
      });
      users[i] = {username: 'user' + i, fullName: fakeUser.fullname, email: fakeUser.emails[0].address, roles: {}};
      // users[i] = {username:"normal" + i,fullName:"Normal User" + i,email:"normal" + i + "@meteoryte.com",roles:[]};
    };

    _.each(users, function (userData) {
      var id,
          user;
      
      // console.log(userData);

      id = Accounts.createUser({
        username: userData.username,
        email: userData.email,
        password: "YoGr8t",
        profile: { fullName: userData.fullName }
      });

      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);
    
    });

    console.log('Creating initial users..');

  }
};

