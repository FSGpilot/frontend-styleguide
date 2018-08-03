'use strict';

var $ = require('jquery');
var calculateAnchorPosition = require('./calculate-anchor-position');
var SmoothScroll = require('./vendor/smooth-scroll.polyfills.min.js');

/* Firefox needs html, others need body */
var root = $('body, html');

// capture that the enter key was used to "click"
$('.sidenav').on('keydown', 'a', function (e) {
  var ENTER = 13;
  if (e.which === ENTER) {
    $(this).data('keypress', true);
  }
});

$('.sidenav').on('click', 'a', function (e) {
  // long url splitting
  var hashLocation  = $(this).attr('href').split('#')[ 1 ];
  var scrollTopPos  = calculateAnchorPosition(hashLocation);

  //if anchor doesn't exist on the page, or calc fails
  //then exit gracefully
  if (scrollTopPos === 0) {
    return true;
  }

  e.preventDefault();

  var scroll = new SmoothScroll();
  scroll.animateScroll(scrollTopPos);

  var newHash = '#' + hashLocation;
  // using pushState is easiest way to prevent double jumps
  if (history && history.pushState && window.location.hash !== newHash) {
    history.pushState(null, null, newHash);
  } else if (window.location.hash !== newHash) {
    window.location.hash = newHash;
  }

});
