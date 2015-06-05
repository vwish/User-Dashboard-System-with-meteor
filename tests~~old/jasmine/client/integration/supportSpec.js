// file: tests/client/integration/tutorialIntegrationSpec.js
 
describe("Support template - ", function() {


    beforeEach(function (done) {
    Router.go('/support');
    Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    it('should show Support to anonymous users', function () { 
        expect($('h1:eq(0)').text().trim()).toEqual('Support');
    });

 
});