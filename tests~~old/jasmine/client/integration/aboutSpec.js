// file: tests/client/integration/tutorialIntegrationSpec.js
 
function reloadPage() {
    location.reload();
}

function bindEvents() {
    $('#logo').click(reloadPage);
}
 
describe("About template - ", function() {


    beforeEach(function (done) {
    Router.go('/about');
    Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    it('should show About to anonymous users', function () { 
        expect($('h1:eq(0)').text().trim()).toEqual('About');
    });

 
});