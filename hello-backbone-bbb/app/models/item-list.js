define(
[
   'jquery',
   'backbone',
   'underscore',
   'mustache',
   'models/item'
],

function ($, Bacbbone, _, Mustache, Item) {

   var List = Backbone.Collection.extend({ model: Item });

   return List;
});
