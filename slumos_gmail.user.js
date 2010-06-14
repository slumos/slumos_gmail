// ==UserScript==
// @name           Slumos Gmail
// @namespace      http://steven.lumos.us/greasemonkey/
// @description    My own Gmail hacks
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

function slumos_gmail_setup(gmail) {
  var font_link = window.document.createElement('link');
  font_link.rel = 'stylesheet';
  font_link.type = 'text/css';
  font_link.href = 'http://fonts.googleapis.com/css?family=Droid+Sans+Mono';
  document.getElementsByTagName('HEAD')[0].appendChild(font_link);

  var plain_style = "@namespace url(http://www.w3.org/1999/xhtml); .Ak, .ii, .dV { font-family: 'Droid Sans Mono' !important; }";
  GM_addStyle(plain_style);

  // modified from http://userscripts.org/scripts/review/14256
  document.addEventListener('focus',
    function(event) {
      if ( !event.target.id || event.target.name != 'body' ) {
        return;
      }
      var textarea = event.target;
      var body     = textarea.value;
      if (!body.match(/^\n\n\w.*?:\n>/)) {
        return;
      }
    
      // Strip empty lines and attribution blob.
      textarea.value = body.replace(/^\n\n\w.*:\n/, '');
    
      textarea.scrollTop = textarea.scrollHeight;
    
      var text_end = body.length;
    
      // Cursor won't move unless we wait for something (what?) to finish.
      setTimeout(function() {textarea.setSelectionRange(text_end, text_end)}, 1);
    }, true);
}

// window.addEventListener('load', 
//   function() {
//     if (unsafeWindow.gmonkey) {
//       unsafeWindow.gmonkey.load('1.0', slumos_gmail_setup);
//     }
//   }, true);

slumos_gmail_setup(0);
