// file: tests/client/integration/tutorialIntegrationSpec.js
 
describe("Admin template - ", function() {


    beforeEach(function (done) {
    Router.go('/admin/users');
    Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    it('should show Access Denied to anonymous users', function () { 
        expect($('h2:eq(0)').text().trim()).toEqual('Access Denied');
    });

    it("should be able to login normal user", function (done) {
        Meteor.loginWithPassword('normal', 'YoGr8t', function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it('should show Access Denied to normal users', function () { 
        expect($('h2:eq(0)').text().trim()).toEqual('Access Denied');
    });

    it("should be able to logout", function (done) {
        Meteor.logout(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });
 
    it("should be able to login admin user", function (done) {
        Meteor.loginWithPassword('root', 'YoGr8t', function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });
 
    it('should show Admin to admin users', function () { 
        expect($('h1:eq(0)').text().trim()).toEqual('Admin');
    });

    it('should show a table', function () { 
        expect($('table:visible')).toBeDefined();

    });

    it('should show a table with root user first', function () { 
        expect($('td:eq(0)').text().trim()).toEqual('root');
    });

    it('should show a table with more than 1 user', function () { 

        expect($('tr:eq(3)')).toBeDefined();
    });

    it('should show Load More button', function () { 
        expect($('.load-more')).toBeDefined();

    });

    it("should be able to logout", function (done) {
        Meteor.logout(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });
 

 
});