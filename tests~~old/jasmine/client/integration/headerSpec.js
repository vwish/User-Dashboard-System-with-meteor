// file: tests/client/integration/tutorialIntegrationSpec.js
 
describe("Header template - ", function() {

    beforeEach(function (done) {
        Router.go('/');
        Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);


    it("should show Get Started link to anonymous users", function () {
        var div = document.createElement("DIV");
        Blaze.render(Template.header, div);
 
        expect($(div).find("#getStartedLink")[0]).toBeDefined();
    });
 
    it("should not show Admin link to anonymous users", function () {
        var div = document.createElement("DIV");
        Blaze.render(Template.header, div);
 
        expect($(div).find("#adminLink")[0]).not.toBeDefined();
    });

    it("should be able to login normal user", function (done) {
        Meteor.loginWithPassword('normal', 'YoGr8t', function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });
 
    it("should show Me link to normal user", function () {
        var div = document.createElement("DIV");
        Blaze.render(Template.header, div);
 
 
        expect($(div).find("#meLink")[0]).toBeDefined();
    });
 
   it("should not show Admin link to normal user", function () {
        var div = document.createElement("DIV");
        Blaze.render(Template.header, div);
 
        expect($(div).find("#adminLink")[0]).not.toBeDefined();
    });
 
    it("should not show Get Started link to logged in users", function () {
        var div = document.createElement("DIV");
        Blaze.render(Template.header, div);
 
        expect($(div).find("#getStartedLink")[0]).not.toBeDefined();
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
 
    it("should show Me link to admin user", function () {
        var div = document.createElement("DIV");
        Blaze.render(Template.header, div);
 
 
        expect($(div).find("#meLink")[0]).toBeDefined();
    });

    it("should show Admin link to admin user", function () {
        var div = document.createElement("DIV");
        Blaze.render(Template.header, div);
 
        expect($(div).find("#adminLink")[0]).toBeDefined();
    });
 
    it("should be able to logout", function (done) {
        Meteor.logout(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });
 
});