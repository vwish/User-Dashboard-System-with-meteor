// file: tests/client/integration/tutorialIntegrationSpec.js
 
describe("Sign up template - ", function() {


    beforeEach(function (done) {
    Router.go('/signup');
    Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    it('should show Sign up to anonymous users', function () { 
        expect($('h1:eq(0)').text().trim()).toEqual('Sign up');
    });

 
});