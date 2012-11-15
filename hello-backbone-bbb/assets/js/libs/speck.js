/**
 * NOTE: Thu Nov 15 22:59:53 2012
 *   This plugin can work with the optimzer `r.js`.
 *   It probably have to implement something silimar to `text.js` since it need to compile text to .js.
 *   Therefore would not try to use this module currently but just try to use text plus dust.
 */
define(

   ['jquery', 'module', 'text', 'dust'],

   function($, module, text, dust) {

      var masterConfig = module.config();

      var normalizeObject = function(obj) {
         if (obj === undefined || obj === null) {
            return {};
         }
         return JSON.parse(JSON.stringify(obj));
      },

      /**
       * Render template to html. return a jquery.Deferred.
       */
      html = function(name, obj){
         var ret = $.Deferred();
         dust.render(name, obj,
                     function(err, out) {
                        if (err) {
                           ret.reject(err);
                           throw err;
                        }
                        ret.resolve(out);
                     });
         return ret;
      },

      /**
       * set compiled result(html) to element.
       */
      to_html = function (html, element) {
         html.then(
            function (out) {
            if(!('jquery' in element)) {
              element = $(element);
            }
            element.html(out);
            });
      },

      view = function(name, view, replace) {
         var obj = normalizeObject(view.model);
         var context = dust.makeBase(view);
         var instance = context.push(obj);
         if (replace) {
            var old = view.$el;
            return render(view.$el, instance).done(
               function () {
                  var content = view.$el.contents();
                  //put it in the correct place in the dom:
                  view.$el.replaceWith(content);
                  view.setElement(content);
               });
         }
         return render(view.$el, instance);
      };

     return {
        load: function(name, req, onLoad, config) {
           var url = name;
           if(masterConfig && 'speckUrl' in masterConfig && url[0] !== '.'){
              url = masterConfig.speckUrl + url;
           }
           if (url.indexOf('.dust', url.length - 5) === -1) {
              url = url + '.dust';
           }

           text.get(req.toUrl(url),
                    function(data) {
                       var compiled = dust.compile(data, name);
                       dust.loadSource(compiled);

                       var out = {
                          render: function(obj, callback) {
                             dust.render.call(dust, name, obj, callback);
                          },

                          html: function (obj) {
                             return html(name, obj);
                          },

                          to_html: function (obj, element) {
                             to_html(html(name, obj), element);
                          },
                          view : function(view, replace) {
                             view(name, view, replace);
                          },

                          url: url,
                          name: name,
                          compiled: compiled
                       };

                       onLoad(out);
                    });
        }
     };
   });
