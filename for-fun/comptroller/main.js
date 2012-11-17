
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
 * e.g. { "2" : [ {"name": foo, "price": 11}, { "name": bar, "price": 13 } ]}
 */
function recordHandler (data, index) {
   var xs = data.filter(function (x) { return x && x.trim(); });
   if (xs
       && xs.length >= 3
       && parseInt(xs[0])
       && parseFloat(xs[1])) {

      var id = xs[0],
          price = parseFloat(xs[1]),
          items = xs.slice(2)
                    .map(function (y) { return {'name':y.trim(), 'price': price}; }),
          exists = store[id] ? store[id] : [];

      store[id] = exists.concat(items);
   } else {
      console.error("invalid record, ignored. %s", data);
   }
}

/**
 * do calculate over all restaurants and print result.
 */
function endingHandler () {
   var re = mapObj(store, calculate)
            .filter(function (x) { return x.price > 0; }),
       r = re.length > 0 ? minWith(re, function (x) { return x.price; })
                         : undefined;
   if (r) {
      console.log("Result: %s, %d ", r.id, r.price);
   } else {
      console.log("Result: Nothing found");
   }
}

/**
 * Calculate prices for all inputs of one restaurant.
 * Return either the price in all
 * or Zero when the restaurant does not have all input items.
 */
function calculate (id, items) {
   var obj = items.reduce(function (init, x) {
                             init[x.name] = x.price;
                             return init;
                          }, {}),
       price = inputs.reduce(function (init, x) {
                                return !! obj[x] ? (init + obj[x]) : init;
                             }, 0);
   return { id: id, price: price };
}

// Utils

function minWith (xs, fn) {
   if (xs.length === 1) {
      return xs[0];
   } else {
      return xs.slice(1)
               .reduce(function (init, a) { return (fn(init) > fn(a)) ? a : init;},
                       xs[0]);
   }
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
