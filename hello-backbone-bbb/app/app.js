define(
[
   'jquery',
   'backbone',
   'underscore',
   'models/item',
   'views/item'
],

function ($, Bacbbone, _, Item, ItemView) {

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
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // ??? Seems this is not required
            this.collection = new List();
            this.collection.bind('add', this.appendItem);

            this.render();
         },

         render : function render () {
            var that = this;
            $(that.el).append('<button id="add">Add list item</button>');
            $(that.el).append('<ul><li>Hello Backbone</li></ul>');
         },

         addItem : function addItem () {
            this.counter++;
            var item = new Item();
            item.set(
               {
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

