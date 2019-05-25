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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        
        // test that loops through each feed in the allFeeds object to check it has a URL and is defined and not empty
        it('URL is defined and not empty', function() {
			for (i in allFeeds) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe('');
			}
        });

        // test that loops through each feed in the allFeeds object to check it has a name and is defined and not empty
        it('names are defined and not empty', function() {
			for (i in allFeeds) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe('');
			}
		});		
    });


    // new test suite name "The Menu"
    describe('The Menu', function() {

    
        // test to make sure the menu element is hidden by default
        it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true)
        });
        
        // test to check if the menu becomes visable when clicked and does a 2nd test to see if the menu goes hidden when clicked
         it('menu changes visibility', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
          }); 
    });

    // new suite named "Initial Entries"
    describe('Initial Entries', function()  {

        // test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. loadFeed() is asynchronous so this test requires the use of Jasmine's beforeEach and asynchronous done() function
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });    
         });
         
         it('feed container has atleast 1 entry', function() {
            const feed = $('.feed .entry').length;
            expect(feed).toBeGreaterThan(0);
         });
    });

    // new suite named "New Feed Selection"
    describe('New Feed Selection', function()   {

    
        // test that ensures when a new feed is loaded by the loadFeed function that the content changes
        let feedList;
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedList = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('new feed has loaded and changed', function(){
            expect($('.feed').html()).not.toEqual(feedList);
        });
    });
}());