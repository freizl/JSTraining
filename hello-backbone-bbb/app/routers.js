define(
[
   'jquery',
   'backbone',
   'underscore',
   'views/itemcollection.v'
],

function ($, Bacbbone, _, ItemListView) {


   var Router = Backbone.Router.extend(
      {
         routes: {
                  "" : "index",
                 "index" : "index",
                  "detail/:id" : "detail",
                  "test" : "test",
                  "*filter" : "filter"
                 },

         initialize : function (options) {
            console.log("router initialize. Options: %s", JSON.stringify(options));
         },

         index : function () {
            console.log("Router: index fn ");
            !!this.appview || (this.appview = new ItemListView());
            this.appview.render();
         },

         //TODO: whose reposbility to display item detail?
         //     itemModel, itemListModel, itemView, itemListView ??
         detail : function (id) {
            console.log("Router: show details of %s", id);
            var app = this.appview,
                models = app && app.collection ? app.collection.models : [],
                model = _(models).filter(function (x) { return x.get('id') == id ;})[0];
            model && model.trigger("view-detail");
         },

         test : function () {
           console.log("Router: test fn");
         },

         filter : function (param) {
            console.log("Router: filter %s", param);
         }



      });

   return Router;

});

