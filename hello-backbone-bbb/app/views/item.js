define(
[
   'jquery',
   'backbone',
   'underscore',
   'speck!templates/item'
],

function ($, Backbone, _, Speck) {

   var ItemView = Backbone.View.extend(
      {
         tagName: 'li',

         events: {
            'click .swap': 'swap',
            'click .delete': 'remove'
         },

         initialize : function initialize () {
            _.bindAll(this, 'render', 'unrender',  'swap', 'remove');

            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
         },

         render : function render () {
            var data = {
               name1: this.model.get('part1'),
               name2: this.model.get('part2')
            };
            Speck.to_html(data, $(this.el));

            return this;
         },

         unrender : function unrender () {
            $(this.el).remove();
         },

         swap : function swap () {
            var model = this.model,
                swapped = {
                   part1: model.get('part2'),
                   part2: model.get('part1')
                };

            model.set(swapped);
         },

         remove : function remove () {
            this.model.destroy();
         }

   });

   return ItemView;

});
