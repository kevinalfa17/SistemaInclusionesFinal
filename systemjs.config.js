/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
var System;
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'

    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // other libraries
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

      'angular2-text-mask': 'npm:angular2-text-mask',
      'text-mask-core': 'npm:text-mask-core',
      "ng2-cookies": 'node_modules/ng2-cookies',
      'file-saver': 'node_modules/file-saver/FileSaver.js',
      'xlsx': 'node_modules/xlsx/xlsx.js',
      'fs': '@node/fs',
      'crypto': '@node/crypto',
      'stream': '@node/stream'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },

      'angular2-text-mask': {
        defaultExtension: 'js',
        main: 'dist/angular2TextMask'
      },

      'text-mask-core': { defaultExtension: 'js' },

      
      'ng2-cookies': {defaultExtension: 'js', main:'./index.js'}
      
    }
  });
})(this);

/*SystemJS.import('xlsx').then(function(XLSX) {

	var w = XLSX.readFile('test.xlsx');
	var j = XLSX.utils.sheet_to_json(w.Sheets[w.SheetNames[0]], {header:1});
	console.log(j);
});*/