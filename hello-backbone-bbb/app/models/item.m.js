define([
   'backbone',
   'underscore'
],

function (Backbone, _) {
   var Item = Backbone.Model.extend(
      {
         defaults: {
            id: 0,
            part1: 'Welcome to',
            part2: 'Stubhub'
         },

         initialize : function  () {
            _.bindAll(this, "onViewDetail");
            this.on("view-detail", this.onViewDetail);
         },

         onViewDetail : function () {
            console.log("On View Detail event, %s", JSON.stringify(this));
         }


      });
   return Item;
});
