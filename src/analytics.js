const SEGMENT_DEV_ID = '1z4719htsDR8bcCM0gewNIwwTvxbmMZl';
// const SEGMENT_PROD_APP_ID = 'DevUW5byHV7rPWZmtDe2R7zDY36iI2Az';

// Create a queue, but don't obliterate an existing one!
const analytics = window.analytics = window.analytics || [];

const initializeAnalytics = function initialize() {
  // If the snippet was invoked already show an error.
  if (!analytics.invoked || analytics.initialize) {
    // Invoked flag, to make sure the snippet
    // is never invoked twice.
    analytics.invoked = true;

    // A list of the methods in Analytics.js to stub.
    analytics.methods = [
      'trackSubmit',
      'trackClick',
      'trackLink',
      'trackForm',
      'pageview',
      'identify',
      'reset',
      'group',
      'track',
      'ready',
      'alias',
      'debug',
      'page',
      'once',
      'off',
      'on',
    ];

    // Define a factory to create stubs. These are placeholders
    // for methods in Analytics.js so that you never have to wait
    // for it to load to actually record data. The `method` is
    // stored as the first argument, so we can replay the data.
    analytics.factory = function factory(method) {
      return function factoryMethod() {
        const args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        analytics.push(args);
        return analytics;
      };
    };

    // For each of our methods, generate a queueing stub.
    for (let i = 0; i < analytics.methods.length; i += 1) {
      const key = analytics.methods[i];
      analytics[key] = analytics.factory(key);
    }

    // Define a method to load Analytics.js from our CDN,
    // and that will be sure to only ever load it once.
    analytics.load = function load(key) {
      // Create an async script element based on your key.
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = [
        (document.location.protocol === 'https:' ? 'https://' : 'http://'),
        'cdn.segment.com/analytics.js/v1/',
        key,
        '/analytics.min.js',
      ].join('');

      // Insert our script next to the first script element.
      const first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    };

    // Add a version to keep track of what's in the wild.
    analytics.SNIPPET_VERSION = '4.0.0';

    // Load Analytics.js with your key, which will automatically
    // load the tools you've enabled for your account. Boosh!
    analytics.load(SEGMENT_DEV_ID);
    analytics.page();
  } else if (window.console && console.error) {
    console.error('Segment snippet included twice.');
  }
};

export { analytics, initializeAnalytics };
