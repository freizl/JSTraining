define(
[
   'jquery',
   'backbone',
   'underscore',
   'mustache',
   'routers',
   'views/itemcollection.v'
],

function ($, Bacbbone, _, Mustache, Router, ItemListView) {

   var router = new Router({routers: {}});
   router.on("route:test", function __onRouteTest () {
                console.log("Event: on route test");
             });

   //TODO: set {pushState:true} doesnt work.
   Backbone.history.start();

});

