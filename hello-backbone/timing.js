// http://stevesouders.com/cuzillion
//
//
// TODO: 1. what diff between $window.load and window.onload ??
//          + `jQuery.fn.load`
//       2. diff between jquery.doc.ready and DOMContentLoaded event handler.xs
//          + basicaly leverage DOMContentLoaded as well
//          + check source code for detail: `jQuery.ready.promise`
//
//
// FINDING
// 1. response - domLoading, fast, cache makes faster, what happened here??
// 2. domLoading - domInteractive, parsing; guess doing downloading resources because cache make a lot faster.
// 3. domInteractive - domContentLoadedEventStart, ???
// 4. domContentLoadedEventStart - domContentLoadedEventEnd (jquery.docReady ; DOMContentLoaded event handlers)
// 5. domContentLoadedEventEnd - domComplete, ???
//    + set of scripts that will execute as soon as possible
//    + the list of scripts that will execute in order as soon as possible
//    + delays the load event in the Document
// 6. domComplete - loadEventStart, loading extra *dynamic* resources; etc.
// 7. loadEventStart - loadEventEnd, jquery.window.load; window.onload
//
//
// MORE
// 1. HTML tag JavaScripts: need to be loaded and executed both in header and body
// 2. HTML - tag - Stylesheets: will possibly loaded after DOMContentLoaded End (css1.html, css2.html)
// 3. HTML - Body - Images: will possibly loaded after DOMContentLoaded End
//
// ??? Well, one thing that cant understand is when the HEADER has both JS and CSS, the loading time of CSS impact DOMContentLoaded time.
//

;(function (W) {
     var xs = ['navigation', 'redirect', 'fetch',
               'domainLookup', 'connect', 'request', 'response',
               'domLoading','domInteractive', 'domContentLoadedEvent',
               'domComplete', 'loadEvent'],

     getNavTiming = function getNavTiming (name) {
        if (!window.performance || !window.performance.timing) return 'unsupported';
        var t = window.performance.timing;
        var startName = name + 'Start', endName = name + 'End';
        if (name.indexOf('dom') == 0 && name.indexOf('domain') == -1) {
           startName = 'responseStart'; endName = name;
        }
        switch (name) {
           case 'load': startName = 'responseStart'; endName = 'loadEventEnd'; break;
           case 'connect':
              if (t.secureConnectionStart > 0) endName = 'secureConnectionStart';
              break;
           case 'secureConnection': endName = 'connectEnd'; break;
           case 'request': endName = 'responseStart'; break;
        }

        if (!(startName in t) || !(endName in t)) return 'invalid';
        if (t[startName] == 0 || t[endName] == 0) return 'n/a';

        var delta = t[endName] - t[startName], total = t[endName] - t.navigationStart;
        return delta + 'ms. Total: ' + total + 'ms';
     },

     showProcessLoadTime = function () {
        console.log('=========== PROCESS + LOAD TIME START');
        if (!window.performance || !window.performance.timing) return 'unsupported';
        var t = window.performance.timing;
        console.log('connectStart => connectEnd %s ms', t.connectEnd - t.connectStart);
        console.log('connectEnd => requestStart %s ms', t.requestStart - t.connectEnd);
        console.log('requestStart => responseStart %s ms', t.responseStart - t.requestStart);
        console.log('responseStart => responseEnd %s ms', t.responseEnd - t.responseStart);
        console.log('responseEnd => domLoading %s ms', t.domLoading - t.responseEnd);
        console.log('domLoading => domInteractive %s ms', t.domInteractive - t.domLoading);
        console.log('domInteractive => domContentLoadedEventStart %s ms', t.domContentLoadedEventStart - t.domInteractive);
        console.log('domContentLoadedEventStart => domContentLoadedEventEnd %s ms', t.domContentLoadedEventEnd - t.domContentLoadedEventStart);
        console.log('domContentLoadedEventEnd => domComplete %s ms', t.domComplete - t.domContentLoadedEventEnd);
        console.log('domComplete => loadEventStart %s ms', t.loadEventStart - t.domComplete);
        console.log('loadEventStart => loadEventEnd %s ms', t.loadEventEnd - t.loadEventStart);
        console.log('=========== PROCESS + LOAD TIME END');
        return 'done';
     },

     delayRun = function delayRun (sec) {
        var sleepNow = Number(new Date());
        while(sleepNow + sec > Number(new Date())) { var tmp = sleepNow; }
     },

     showNavTiming = function () {
        console.log(">> showNavTiming Start");
        xs.forEach(
           function (x) {
              var t = getNavTiming(x);
              console.log(x, "==>", t);
           });
        console.log("showNavTiming End");
        console.log("domContentLoadedEvent:", performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart);
     };

     W.showNavTiming = showNavTiming;
     W.delayRun = delayRun;
     W.showProcessLoadTime = showProcessLoadTime;
})(window);

;(function ($, W) {

     W.addEventListener("DOMContentLoaded",
        function () {
           console.log('>> DOMContentLoaded start');
           console.log('   doc.readyState %s', document.readyState);
           W.delayRun(500);
           $.getScript('https://raw.github.com/freizl/JSTraining/master/hello-backbone/3.js');
           console.log('   DOMContentLoaded end');

        });

     $(document).ready(
        function () {
           console.log('>> jquery Document Ready start');
           console.log('   doc.readyState ', document.readyState);
           W.delayRun(600);
           $('head').append('<script src="http://mustache.github.com/extras/mustache.js"></script>');
           console.log('   jquery Document Ready end');
           //W.Mustache = 0;
           // --disable-web-security
        });

     $(document).ready(
        function () {
           $.getScript('https://raw.github.com/freizl/JSTraining/master/hello-backbone/1.js');
        });

     document.onreadystatechange = function () {
        console.log('>> Document onreadystatechange start');
        console.log('   Document readyState: %s', document.readyState);
        console.log('   Document onreadystatechange end');
     };

     $(W).load(
        function () {
           console.log('>> jquery window load');
           console.log('   doc.readyState ', document.readyState);
           W.delayRun(50);
           console.log('   jquery window load');

        });

     W.onload = function _onload_ () {
        console.log('>> window onload function');
        console.log('   doc.readyState ', document.readyState);
        W.delayRun(500);
        $.getScript('https://raw.github.com/freizl/JSTraining/master/hello-backbone/4.js');
        console.log('   window onload function');

     };

  })(jQuery, window);


