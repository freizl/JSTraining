define(
[
   'jquery',
   'backbone',
   'underscore',
   'models/item',
   'views/item',
   'speck!templates/app'
],

function ($, Backbone, _, Item, ItemView, speck) {

   Backbone.sync = function (method, model, success, error) {
      success();
   };

   var List = Backbone.Collection.extend({ model: Item });

   var ListView = Backbone.View.extend(
      {
         el: $('body'),
         counter: 0,

      // where DOM events bound to View methods.
         events: {
            'click button#add': 'addItem'
         },

         initialize : function initialize () {
            _.bindAll(this, 'render', 'addItem', 'appendItem');
            this.collection = new List();
            this.collection.bind('add', this.appendItem);

            this.render();
         },

         render : function render () {
            var that = this;

            speck.html({}).then($.fn.append.bind($(that.el)));
            //$(that.el).append(speck.html({}));
         },

         addItem : function addItem () {
            this.counter++;
            var item = new Item();
            item.set({
                        part2: item.get('part2') + this.counter
                     });
            this.collection.add(item);
         },

         appendItem : function appendItem (item) {
            var itemView = new ItemView({ model: item });
            $('ul', this.el).append(itemView.render().el);
         }

      });

   return ListView;

});

