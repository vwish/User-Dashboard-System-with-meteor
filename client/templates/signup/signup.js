Template.signup.helpers({
  errorMessage: function() {
    return Template.instance().errorMessage.get();
  },
  infoMessage: function() {
    return Template.instance().infoMessage.get();
  }
});

Template.signup.events({
  'submit form': function(e, t) {
    e.preventDefault();

    var signupForm = $(e.currentTarget),
        username = trimInput(signupForm.find('#signupUser').val().toLowerCase()),    
        email = trimInput(signupForm.find('#signupEmail').val().toLowerCase()),
        password = signupForm.find('#signupPassword').val(),
        passwordConfirm = signupForm.find('#signupPasswordConfirm').val();

    if (isNotEmpty(Template.instance(), email) && isNotEmpty(Template.instance(), password) && isEmail(Template.instance(), email) && areValidPasswords(Template.instance(), password, passwordConfirm)) {

      Accounts.createUser({username: username, email: email, password: password}, 
        (function(template) {
          return function(err) {

            if (err) {
              template.errorMessage.set(err.reason);
              // wait 3 seconds, then clear the msg
              Meteor.setTimeout(function() {
                template.errorMessage.set(null);
              }, 3000);
            } else {
              template.infoMessage.set('Welcome to Meteoryte!');
              Meteor.setTimeout(function() {
                template.infoMessage.set(null);
                Router.go('home');
              }, 3000);
            }
          }; 
        })(Template.instance())  
      );

      // Accounts.createUser({username: username, email: email, password: password}, function(err) {
      //   if (err) {
      //     alert(err.reason);
      //     if (err.message === 'Email already exists. [403]') {
      //       console.log('We are sorry but this email is already used.');
      //     } else {
      //       console.log('We are sorry but something went wrong.');
      //     }
      //   } else {
      //     console.log('Congrats new Meteoryte, you\'re in!');
      //     Router.go('home');
      //   }
      // });

    }
    return false;
  }
});

Template.signup.created = function() {
  this.errorMessage = new ReactiveVar;
  this.infoMessage = new ReactiveVar;
};
