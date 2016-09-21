/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test in our first suite - it tests that
         * the allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /* This is our second test in our first suite -
         * it tests that each feed in the allFeeds object
         * has a URL defined and that the URL is not empty.
         */
        it('have defined URLs', function() {
            allFeeds.forEach(function( feed ) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* This is our third test in our first suite -
         * it tests that each feed in the allFeeds object
         * has a name defined and that the name is not empty.
         */
         it('have defined names', function() {
             allFeeds.forEach(function( feed ) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).toBeGreaterThan(0);
             });
         });
    });

    /* This is our second test suite. This suite is all
     * about the navigation menu located in the upper-left-hand
     * corner of the application.
     */
    describe('The menu', function(){

        /* This is our first test in our second suite -
         * it tests that the menu is hidden by default.
         * I had initially thought that I would need to
         * add an "onload" condition, but the test is within
         * the $() function, so automatically it will not
         * run until the document is loaded.
         */
        var $body = $('body'); // element

        it('is hidden by default', function(){
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });

        /* This is our second test in our second suite -
         * it tests that the menu changes visibility
         * when the menu icon is clicked. This test has
         * two expectations: 1) does the menu display when
         * clicked and 2) does it hide when clicked again.
         */
        it('changes visibility when menu icon is clicked', function(){
            var menuIcon = $('.menu-icon-link');
            //menu displays on first click
            menuIcon.click();
            expect($body.hasClass('menu-hidden')).toBeFalsy();
            //menu hides on second click
            menuIcon.click();
            expect($body.hasClass('menu-hidden')).not.toBeFalsy();
        });
    });

    /* This is our third test suite. This suite is all
     * about the initial entries created after the loadFeed
     * function is called.
     */
    describe('Initial Entries', function(){

        /* This is the first test in our third suite -
         * it tests that there is at minimum a single .entry
         * element with the .feed container after the loadFeed()
         * function is called asynchronously and has completed its work.
         */
        beforeEach(function(done) {
            loadFeed(0, done());
        });

        it('are defined', function(done) {
            var container = $('.feed')
            expect(container.length).toBeGreaterThan(0);
            done();
        });
    });

    /* This is our fourth test suite. This suite is all
     * about the loading of new feeds by the loadFeed() function.
     */
    describe('New Feed Selection', function() {

        /* This is the first test in our fourth suite -
         * it tests that the content of the .feed container
         * changes when a new feed is loaded by the
         * asynchronous loadFeed() function.
         */
        var container = $('.feed'),
            title = $('.header-title'),
            titleOne,
            titleTwo;

        beforeEach(function(done) {
            container.empty(); // Empty out all previous entries
            loadFeed(0, function() {
                titleOne = title.html(); // Get header text of the 1st entry
            });

            loadFeed(1, function() {
                titleTwo = title.html(); // Get header text of the 2nd entry
                done(); //function will get called when async work is done
            });

        });

        it('changes when a new feed is loaded', function(){
            expect(titleOne).not.toMatch(titleTwo);
        });
    });
}());
