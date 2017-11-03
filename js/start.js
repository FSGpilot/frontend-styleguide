'use strict';

var $ = require('jquery');
var Cookies = require('./vendor/js-cookie');
require('./form-disable');
require('./scroll-to-top-for-hash');
require('./sidenav');
require('./vendor/politespace');
require('./vendor/stickyfill.min.js');

$(document).ready(function () {
  var currentlyClicked = Cookies.get('selected-preview');
  if (currentlyClicked == null) {
    currentlyClicked = 'mobil';
  }
  $('#' + currentlyClicked).trigger('click');

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

// Initialize sticky fill
var stickyElements = document.getElementsByClassName('sticky');

for (var i = stickyElements.length - 1; i >= 0; i--) {
  Stickyfill.add(stickyElements[i]);
}

$('.style-switcher').val(window.curStyle);

$('.style-switcher').on('change', function () {
  if (window.curStyle !== this.value) {
    var onlyUrl = window.location.href.replace(window.location.search, '');
    window.location = onlyUrl + '?s=' + this.value;
  }
});

$('a').on('click', function (e) {
  e.preventDefault();
  window.location.href = $(this).attr('href') + '?s=' + window.curStyle;
});

function setContentWidthToDefault() {
  $('.styleguide-content').removeClass('styleguide-content-full-width');
  $('.styleguide-content').addClass('styleguide-content-default-width');
}

function setContentWidthToFull() {
  $('.styleguide-content').removeClass('styleguide-content-default-width');
  $('.styleguide-content').addClass('styleguide-content-full-width');
}

$('.preview-iframe').on('load', function () {
  var $iframe = $(this);

  $(this.contentWindow).on('resize', function () {
    var $body = $iframe.contents().find('body');
    var $margin = 70;
    var $height = $body.prop('scrollHeight') + $margin;
    $iframe.css('height', $height + 'px');
  });

  $('.loader-container').hide();
  $(this).show();
});

$('.components__resizer-button').on('click', function () {
  var $width = undefined;
  var $iframe = $('#component-preview').find('iframe');

  switch (this.id) {
    case 'mobil':
      $width = '375px';
      setContentWidthToDefault();
      break;
    case 'tablet':
      $width = '768px';
      setContentWidthToDefault();
      break;
    case 'desktop':
      $width = '1024px';
      setContentWidthToFull();
      break;
    case 'full':
      $width = '100%';
      setContentWidthToFull();
      break;
    default:
      return;
  }

  Cookies.set('selected-preview', this.id);
  $iframe.attr({ width: $width });

  $('.is-active').each(function () {
    $(this).removeClass('is-active');
  });
  $('button[id=' + this.id + ']').each(function () {
    $(this).addClass('is-active');
  });

  $('.showtext').each(function () {
    $(this).removeClass('showtext');
  });
  $('.components__' + this.id).each(function () {
    $(this).addClass('showtext');
  });
});




