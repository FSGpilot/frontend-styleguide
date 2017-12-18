'use strict';

var $ = require('jquery');
var Cookies = require('./vendor/js-cookie');
require('./form-disable');
require('./scroll-to-top-for-hash');
require('./sidenav');
require('./vendor/politespace');
require('./vendor/stickyfill.min.js');
var iFrameResize = require('./vendor/iframeResizer');

// Initialize sticky fill
var stickyElements = document.getElementsByClassName('sticky');

for (var i = stickyElements.length - 1; i >= 0; i--) {
  Stickyfill.add(stickyElements[i]);
}

// Initialize The style switcher fill
$('.style-switcher').val(window.curStyle);
$('.style-switcher').on('change', function () {
  if (window.curStyle !== this.value) {
    var onlyUrl = window.location.href.replace(window.location.search, '');
    window.location = onlyUrl + '?s=' + this.value;
  }
});

// Add style when navigating
$('a').on('click', function (e) {
  e.preventDefault();
  var targetUrl =  $(this).attr('href');
  var url = (targetUrl.indexOf('#') != -1 ? targetUrl.split('#')[0]+'?s='+window.curStyle+'#'+ targetUrl.split('#')[1] : targetUrl + '?s='+window.curStyle);
  window.location.href = url;
});

// Add style to preview-iframes
var previewElements = document.getElementsByClassName('preview-iframe');
for (var j = previewElements.length - 1; j >= 0; j--) {
  if (window.curStyle){
    previewElements[j].src = previewElements[j].src + '?s=' + window.curStyle;
  }
}

// Initialize the component previews
var activePreview = function(btnClicked){
  var $width = undefined;
  var $iframe = $('.component-preview').find('iframe');

  switch (btnClicked.id) {
    case 'mobil':
      $width = '375px';
      break;
    case 'tablet':
      $width = '768px';
      break;
    case 'desktop':
      $width = '1170px';
      break;
    default:
      return;
  }
  $iframe.attr({ width: $width });

  $('.is-active').removeClass('is-active');
  $('button[id=' + btnClicked.id + ']').addClass('is-active');
  Cookies.set('selected-preview', btnClicked.id);
};


// $(document).ready(function () {
var currentlyClicked = Cookies.get('selected-preview');
if (currentlyClicked == null) {
  currentlyClicked = 'desktop'; //mobil, tablet, desktop (not full)
}
$('#'+currentlyClicked).each(function() {
  activePreview(this);
});

iFrameResize({ log: false, heightCalculationMethod: 'taggedElement', resizeFrom: 'child' }, '.preview-iframe');
// });


// $('.preview-iframe').on('load', function () {
//   var $iframe = $(this);

//   $(this.contentWindow).on('resize', function () {
//     var $body = $iframe.contents().find('body');
//     var $margin = 0;
//     var $height = $iframe.contents().outerHeight();//$body.prop('scrollHeight') + $margin;
//     $iframe.css('height', $height + 'px');
//   });

//   $('.loader-container').hide();
//   $(this).show();
// });


$('.component-preview-button').on('click', function () {
  if(this.id != 'full') {
    activePreview(this);
  }
});


// Annotations 
$(document).ready(function () {
  $('.marker').bind('click mouseenter', function (e) {
    $(this).children('.desc').show();
    $(this).children('.desc').css('z-index', '-1');
    $(this).css('z-index', '1');
  });

  $('.marker').bind('mouseleave', function (e) {
    $(this).children('.desc').hide();
    $(this).css('z-index', 'auto');
  });

  //hide the description if clicked on anywhere on page
  $(document).on('mouseup', function (e) {
    var container = $('.desc');

    if (!container.is(e.target) // if the target of the click isn't the container...
      && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
      container.hide();
    }
  });  
});



