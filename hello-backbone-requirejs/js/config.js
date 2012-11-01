// Set the require.js configuration for your application.
require.config(
   {

      // Initialize the application with the main application file.
      deps: ["main"],

      paths: {
         // Libraries.
         json2: "../libs/json2",
         jquery: "../libs/jquery-1.8.2",
         underscore: "../libs/underscore",
         backbone: "../libs/backbone"
      },

      shim: {
         // Backbone library depends on lodash and jQuery.
         backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
         }

         // Backbone.LayoutManager depends on Backbone.
         //"plugins/backbone.layoutmanager": ["backbone"]
      }

   }
);
