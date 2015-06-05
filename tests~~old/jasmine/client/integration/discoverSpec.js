// file: tests/client/integration/tutorialIntegrationSpec.js
 
describe("Discover template - ", function() {


    beforeEach(function (done) {
    Router.go('/discover');
    Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    it('should show Discover to anonymous users', function () { 
        expect($('h1:eq(0)').text().trim()).toEqual('Discover');
    });

 
});