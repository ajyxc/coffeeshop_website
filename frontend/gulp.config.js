module.exports = function() {
  var client = 'client';
  var clientApp = './client/app';
  var dist = 'dist';
  var tmp = '.tmp';
  var docs = 'documentation';
  var landing = 'landing';

  var config = {
    client: client,
    dist: dist,
    tmp: tmp,
    index: client + '/index.html',
    alljs: [
      client + '/app/**/*.js',
      './*.js'
    ],
    assetsLazyLoad: [
      clientApp + '/email/**/*.js',
      client + '/bower_components/font-awesome/fonts/*',
      client + '/bower_components/font-awesome/css/*',
      client + '/bower_components/weather-icons/css/*',
      client + '/bower_components/weather-icons/font/*',
      client + '/bower_components/weather-icons/fonts/*',
      client + '/bower_components/angular-material-data-table/dist/md-data-table.min.js',
      client + '/bower_components/angular-wizard/dist/angular-wizard.min.js',
      client + '/bower_components/ngmap/build/scripts/ng-map.min.js',
      client + '/bower_components/moment/min/moment.min.js',
      client + '/bower_components/textAngular/dist/textAngular-sanitize.min.js',
      client + '/bower_components/rangy/rangy-core.min.js',
      client + '/bower_components/rangy/rangy-selectionsaverestore.min.js',
      client + '/bower_components/textAngular/dist/textAngular.js',
      client + '/bower_components/textAngular/dist/textAngularSetup.js',
    ],
    assetsToCopy: [
      client + '/bower_components/webfontloader/webfontloader.js',
      client + '/app/**/*.html',
      client + '/assets/**/*',
      client + '/data/**/*',
      client + '/vendors/**/*',
      client + '/favicon.ico',
      client + '/styles/loader.css',
    ],
    less: [],
    sass: [
      client + '/styles/**/*.scss'
    ],
    js: [
      clientApp + '/**/*.module.js',
      clientApp + '/**/*.js',
      '!' + clientApp + '/email/**/*.js',
      '!' + clientApp + '/**/*.spec.js'
    ],
    docs: docs,
    docsJade: [
      docs + '/jade/index.jade',
      docs + '/jade/faqs.jade',
      docs + '/jade/layout.jade'
    ],
    allToClean: [
      tmp,
      '.DS_Store',
      '.sass-cache',
      'node_modules',
      '.git',
      client + '/bower_components',
      docs + '/jade',
      docs + '/layout.html',
      landing + '/jade',
      landing + '/bower_components',
      'readme.md'
    ]
  };

  return config;
};
