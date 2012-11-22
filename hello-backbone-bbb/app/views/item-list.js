define(
[
   'jquery',
   'backbone',
   'underscore',
   'mustache',
   'text!templates/app.mustache',
   'models/item',
   'views/item',
   'models/item-list'
],

function ($, Bacbbone, _, Mustache, template, Item, ItemView, List) {

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
            $(that.el).append(Mustache.to_html(template));
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

