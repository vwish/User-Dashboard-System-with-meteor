// file: tests/client/integration/tutorialIntegrationSpec.js
 
describe("Terms template - ", function() {


    beforeEach(function (done) {
    Router.go('/terms');
    Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    it('should show Terms of use to anonymous users', function () { 
        expect($('h1:eq(0)').text().trim()).toEqual('Terms of Use');
    });

 
});