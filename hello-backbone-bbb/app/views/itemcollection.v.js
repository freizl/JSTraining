define(
[
   'jquery',
   'backbone',
   'underscore',
   'mustache',
   'text!templates/item.list.mustache',
   'models/item.m',
   'views/item.v',
   'collections/item.c'
],

function ($, Bacbbone, _, Mustache, template, Item, ItemView, List) {

   // sync list when delete a item.
   Backbone.sync = function (method, model, options) {
      options.success();
   };

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

         },

         render : function render () {
            var that = this;
            $(that.el).html(Mustache.to_html(template));
            _(that.collection.models).each( function (x) { that.appendItem(x); });
         },

         addItem : function addItem () {
            this.counter++;
            var item = new Item({id: this.counter});
            item.set({
                        part2: item.get('part2') //+ this.counter
                     });
            this.collection.add(item);
         },

         appendItem : function appendItem (item) {
            var itemView = new ItemView({ model: item });
            $('#content ul', this.el).append(itemView.render().el);
         },

         findItem : function (id) {
            var that = this,
                models = that.collection.models;
         }


      });

   return ListView;

});

