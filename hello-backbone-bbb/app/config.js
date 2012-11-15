// Set the require.js configuration for your application.
require.config(
   {

      // Initialize the application with the main application file.
      deps: ["main"],

      paths: {
         // Libraries.
         jquery: "../assets/js/libs/jquery-1.8.2",
         underscore: "../assets/js/libs/underscore",
         backbone: "../assets/js/libs/backbone",
         dust: "../assets/js/libs/require-dust",
         text: "../assets/js/libs/text",
         speck: "../assets/js/libs/speck"
      },

      shim: {
         // Backbone library depends on lodash and jQuery.
         backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
         },
         speck: {
            deps: ["text", "dust", "jquery", "backbone"],
            exports: "Speck"
         }

         // Backbone.LayoutManager depends on Backbone.
         //"plugins/backbone.layoutmanager": ["backbone"]
      }

   }
);
