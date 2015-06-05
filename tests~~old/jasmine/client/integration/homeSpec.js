// file: tests/client/integration/tutorialIntegrationSpec.js
 
describe("Home template - ", function() {

    beforeEach(function (done) {
    Router.go('/');
    Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    it('should show Welcome Home to anonymous users', function () { 
        expect($('h1:eq(2)').text().trim()).toEqual('Welcome Home');
    });
 
});