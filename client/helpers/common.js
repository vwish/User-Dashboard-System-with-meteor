/* for accounts */

trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isEmail = function(template, value) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
      return true;
  }
  template.errorMessage.set('Please enter a valid email address.');
  // console.log('Please enter a valid email address.');
  Meteor.setTimeout(
    (function(template) {
      return function() {

        template.errorMessage.set(null);

      }; 
    })(template)  
  , 3000);
  return false;
};

isValidPassword = function(template, password) {
  // For production test for ^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*
  // Length 8-32, at least one upper, one lower, one number
  if (password.length < 6) {
    template.errorMessage.set('Password must be 6 characters or longer.');
    // console.log('Your password should be 6 characters or longer.');
    Meteor.setTimeout(
      (function(template) {
        return function() {

          template.errorMessage.set(null);

        }; 
      })(template)  
    , 3000);
      return false;
  }
  return true;
};

areValidPasswords = function(template, password, confirm) {
  if (!isValidPassword(template, password)) {
      return false;
  }
  if (password !== confirm) {
    template.errorMessage.set('Passwords are not equivalent.');
    // console.log('Your two passwords are not equivalent.');
    Meteor.setTimeout(
      (function(template) {
        return function() {

          template.errorMessage.set(null);

        }; 
      })(template)  
    , 3000);
      return false;
  }
  return true;
};

isNotEmpty = function(template, value) {
  if (value && value !== ''){
      return true;
  }
  template.errorMessage.set('Please fill in all required fields.');
  // console.log('Please fill in all required fields.');
  Meteor.setTimeout(
    (function(template) {
      return function() {

        template.errorMessage.set(null);

      }; 
    })(template)  
  , 3000);

  return false;
};

/* for usersList */

toField = function(astr) {
  switch(astr) {
    case "UserName":
    return "user";

    case "Full Name":
    return "name";

    case "email":
    return "email";

    default:
    return "user";      
  }
};

makeQuery = function(rawsearch, field, admin) {
  if (rawsearch) {
    var search = escapeRegex(rawsearch);
    switch(field) {
      case "user" :
          // db.users.find({username: { $regex: norm}})
          if (admin == 'true')
          {
            return {$and: [{roles:['admin']}, {username: { $regex: search }}]};
          } else {
            return {username: { $regex: search }};
          }
      case "name" :
          // db.users.find({ "profile.fullName" : { "$regex" : "cath" , "$options" : "i" }})
          if (admin == 'true')
          {
            return {$and: [{roles:['admin']}, {"profile.fullName" : { "$regex" : search , "$options" : "i" }}]};
          } else {
            return { "profile.fullName" : { "$regex" : search , "$options" : "i" }};
          }
      case "email" :
          // db.users.find({ emails: { $elemMatch: {address: { $regex: "Normal6@meteoryte.com", $options: 'i' }}}})
          if (admin == 'true')
          {
            return { $and: [{roles:['admin']}, {emails: { $elemMatch: {address: { $regex: search, $options: 'i' }}}}]};
          } else {
            return {emails: { $elemMatch: {address: { $regex: search, $options: 'i' }}}};            
          }
      default:
        return {username: { $regex: search }};
    }
  }
  else {
//    return {};

    return (admin == 'true') ? {roles:['admin']} : {};
  }
};

makeSort = function(field){
  switch(field) {
    case "user" :
      return {'username': 1};
    case "name" :
      return {'profile.fullName': 1};
    case "email" :
      return {'emails.address': 1};
    default:
      return {'username': 1};
  }
}

escapeRegex = function(s) {  
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};





