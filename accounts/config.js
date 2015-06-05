// Router.plugin('ensureSignedIn', {
//     except: ['home']
// });

// Router.plugin('ensureSignedIn', {
//     only: ['profile', 'privateStuff']
// });

AccountsTemplates.configureRoute('signIn', {
    redirect: function(){
        var user = Meteor.user();
        if (user)
          Router.go('/user/' + user._id);
    }
});

