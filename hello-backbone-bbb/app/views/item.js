define(
[
   'jquery',
   'backbone',
   'underscore'
],

function ($, Backbone, _) {

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
            $(this.el).html('<span>'
                            + this.model.get('part1')
                            + ' => '
                            + this.model.get('part2')
                            + '</span>'
                            + '<button class="swap">swap</button>'
                            + '<button class="delete">delete</button>');
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
