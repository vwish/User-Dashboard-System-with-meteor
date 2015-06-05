// file: tests/client/integration/tutorialIntegrationSpec.js
 
describe("Privacy template - ", function() {


    beforeEach(function (done) {
    Router.go('/privacy');
    Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    it('should show Privacy of use to anonymous users', function () { 
        expect($('h1:eq(0)').text().trim()).toEqual('Privacy');
    });

 
});