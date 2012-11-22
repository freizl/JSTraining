define([
   'backbone'
],

function (Backbone) {
   var Item = Backbone.Model.extend(
      {
         defaults: {
            part1: 'Welcome to',
            part2: 'Stubhub'
         }
      });
   return Item;
});
