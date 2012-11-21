
// require
var csv = require('csv'), // npm install csv
    fs = require('fs'),
    store = {},
    argv = process.argv,
    file = argv[2],
    inputs = argv.slice(3);

if (!file || !inputs || inputs.length === 0) {
   console.log('Usage: %s FILE_NAME ITEM [, ITEM1]', argv[0]);
   return -1;
}
console.log(argv.join(' '));

// read csv
csv()
   .from.stream(fs.createReadStream(__dirname + '/' + file))
   .on('record', recordHandler)
   .on('end', endingHandler);

/**
 * csv record handler.
 * records has been tranformed to table (Object)
 * which key is ID, value is a list a items along with its price.
 * e.g. { "2" : [ { "foo", 11 }, { "bar" : 13 } ] }
 */
function recordHandler (data, index) {
   var xs = data.filter(function (x) { return x && x.trim(); });
   if (xs
       && xs.length >= 3
       && parseInt(xs[0])
       && parseFloat(xs[1])) {

      var id = xs[0],
          price = parseFloat(xs[1]),
          items = xs.slice(2),
          exists = store[id] ? store[id] : {};

      items.map(function (y) { exists[y.trim()] = price; });
      store[id] = exists;
   } else {
      console.error("invalid record, ignored. %s", data);
   }
}

/**
 * do calculate over all restaurants and print result.
 */
function endingHandler () {
   var re = mapObj(store, calculate).filter(function (x) { return x.price > 0; }),
       r = re.length > 0 ? minWith(re, function (x) { return x.price; }) : 0,
       report = "Result: " + (!! r ? r.id + ", " + r.price : "Nothing Found" );

   console.log(report);
}

/**
 * Calculate prices for all inputs of one restaurant.
 * Return either the price in all
 * or Zero when the restaurant does not have all input items.
 */
function calculate (id, obj) {
   var price = inputs.reduce(function (init, x) { return obj[x] > 0 ? (init + obj[x]) : init;},
                             0);
   return { id: id, price: price };
}

// Utils
function minWith (xs, fn) {
   return xs.slice(1)
            .reduce(function (init, a) { return (fn(init) > fn(a)) ? a : init;},
                    xs[0]);
}

function mapObj (obj, fn) {
   var k, re = [];
   for (k in obj) {
     if (obj.hasOwnProperty(k)) {
        var o = fn(k, obj[k]);
        re.push(o);
     }
   }
   return re;
}
