'use strict';

var $ = require('jquery');
var Cookies = require('./vendor/js-cookie');
require('./form-disable');
require('./scroll-to-top-for-hash');
require('./sidenav');
require('./vendor/politespace');
require('./vendor/stickyfill.min.js');


// Initialize sticky fill
var stickyElements = document.getElementsByClassName('sticky');

for (var i = stickyElements.length - 1; i >= 0; i--) {
  Stickyfill.add(stickyElements[ i ]);
}

// // Styling switching
// var changeStyle = function (val) {
//   var styleToSwitchTo = val;
//   $('link[rel=stylesheet]').attr('href', styleToSwitchTo);
//   Cookies.remove('style', { path: '/' });
//   Cookies.set('style', styleToSwitchTo, { path: '/' }); 
//   $('.style-switcher').val(styleToSwitchTo);
// };

// var cookieStyleValue = Cookies.get('style', { path: '/' });

// if(cookieStyleValue !== '' && cookieStyleValue !== undefined){
//   changeStyle(cookieStyleValue);
// }else{
//   Cookies.set('style', '/css/styleguide.css', { path: '/' });
// }

// $('.style-switcher').on('change', function () {
//   var curStyle = Cookies.get('style', { path: '/' });
//   if(curStyle !== this.value){
//     changeStyle(this.value);
//   }
// });
$('.style-switcher').val(window.curStyle);

$('.style-switcher').on('change', function () {
  if(window.curStyle !== this.value){
    var onlyUrl = window.location.href.replace(window.location.search, '');
    window.location = onlyUrl + '?s=' + this.value;
  }
});

$('a').on('click', function (e) {
  e.preventDefault();
  window.location.href = $(this).attr('href') + '?s='+ window.curStyle;
});


