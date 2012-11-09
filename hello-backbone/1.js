;(function() {

var ListView = Backbone.View.extend(
   {
      el: $('body'),
      counter: 0,

      // where DOM events bound to View methods.
      events: {
        'click button#add': 'addItem'
      },

      initialize : function initialize () {
         _.bindAll(this, 'render', 'addItem'); // ??? Seems this is not required
         this.render();
      },

      render : function render () {
         $(this.el).append('<button id="add">Add list item</button>');
         $(this.el).append('<ul><li>Hello Backbone - Script 1</li></ul>');
      },


      addItem : function addItem () {
         this.counter++;
         $('ul', this.el).append('<li>Hello counter: ' + this.counter + '</li>');
      }


   }),

    // magic question: new an instance will be invoked automatically. how?
    listView = new ListView();

})(jQuery);
