define(
[
   'jquery',
   'backbone',
   'underscore',
   'mustache',
   'views/item-list'
],

function ($, Bacbbone, _, Mustache, ItemListView) {

   // What's purpose of this??
   Backbone.sync = function (method, model, success, error) {
      success();
   };

   return new ItemListView();

});

