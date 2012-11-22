define([
   'backbone'
],

function (Backbone) {
   var Item = Backbone.Model.extend(
      {
         defaults: {
            id: 0,
            part1: 'Welcome to',
            part2: 'Stubhub'
         }
      });
   return Item;
});
