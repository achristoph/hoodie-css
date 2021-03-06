
// We need this because PhantomCSS isn't a npm package
var fs = require('fs');
var path = fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/phantomcss.js');
var phantomcss = require(path);
var screenshotDelay = 3000;

// Begin testing
casper.test.begin('Run tests against pages with a viewport of 1024 x 768', function(test) {

  phantomcss.init({
    // Reference to a particular Casper instance. Required for SlimerJS.
    // Refers to itself because we're running CasperJS directly
    casper: casper,
    // Points to the PhantomCSS library
    libraryRoot: fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/'),
    // Folder for all screenshots
    screenshotRoot: fs.absolute(fs.workingDirectory + '/visual-regression-tests/screenshots/medium/'),
    // Removes results directory tree after run.  Use in conjunction with failedComparisonsRoot to see failed comparisons.
    cleanupComparisonImages: true,
    // Folder for failed comparisons
    failedComparisonsRoot: fs.absolute(fs.workingDirectory + '/visual-regression-tests/screenshots/medium/failures/')
  });


  casper.start('localhost:3000', function() {

    phantomcss.turnOffAnimations();
    this.viewport(1024, 786);

    this.wait(1000, function() {
      this.then(function() {
        phantomcss.screenshot('html', screenshotDelay, '' , 'hoodie-index--1024x786');
      });

      this.then(function() {
        this.open('localhost:3000/intro/');
        this.then(function() {
          phantomcss.screenshot('html', screenshotDelay, '' , 'hoodie-intro--1024x786');
        });
      });

      this.then(function() {
        this.open('localhost:3000/contribute/');
        this.then(function() {
          phantomcss.screenshot('html', screenshotDelay, '' , 'hoodie-contribute--1024x786');
        });
      });

      this.then(function() {
        this.open('localhost:3000/get-help/');
        this.then(function() {
          phantomcss.screenshot('html', screenshotDelay, '' , 'hoodie-get-help--1024x786');
        });
      });

      this.then(function() {
        this.open('localhost:3000/about/');
        this.then(function() {
          phantomcss.screenshot('html', screenshotDelay, '' , 'hoodie-about--1024x786');
        });
      });

      this.then(function() {
        this.open('localhost:3000/community/');
        this.then(function() {
          phantomcss.screenshot('html', screenshotDelay, '' , 'hoodie-community--1024x786');
        });
      });

      this.then(function() {
        this.open('localhost:3000/animals/');
        this.then(function() {
          phantomcss.screenshot('html', screenshotDelay, '' , 'hoodie-animals--1024x786');
        });
      });

      this.then(function() {
        this.open('localhost:3000/contact/');
        this.then(function() {
          phantomcss.screenshot('html', screenshotDelay, '' , 'hoodie-contact--1024x786');
        });
      });


    });

    this.then(function() {
      phantomcss.compareSession();
    });
  });

  casper.run(function() {
    test.done();
  });
});
