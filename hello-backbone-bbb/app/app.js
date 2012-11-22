define(
[
   'jquery',
   'backbone',
   'underscore',
   'mustache',
   'views/itemcollection.v'
],

function ($, Bacbbone, _, Mustache, ItemListView) {


   var Router = Backbone.Router.extend(
      {
         routes: { "" : "index"
                 , "index" : "index"
                 , "detail/:id" : "detail"
                 , "test" : "test"
                 },

         // TODO: initialize will be invoked each time navigation change??
         initialize : function () {
            console.log("router initialize");
         },

         start : function start () {
            Backbone.history.start({pushState:true});
         },

         index : function () {
            console.log("index fn ");
            this.todoListView = new ItemListView();
         },

         detail : function (id) {
            console.log("show details of %s", id);
            //TODO: whose reposbility to display item detail?
            //     itemModel, itemListModel, itemView, itemListView ??
         },

         test : function () {
           alert("test routers");
         }


      });

   return new Router();
});

