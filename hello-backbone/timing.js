var xs = ['navigation', 'redirect', 'fetch',
          'domainLookup', 'connect', 'request', 'response',
          'domLoading','domInteractive', 'domContentLoadedEvent', 'domComplete', 'loadEvent'],

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
     };

function showNavTiming () {
   xs.forEach(
      function (x) {
         var t = getNavTiming(x);
         console.log(x, "==>", t);
      });
}

