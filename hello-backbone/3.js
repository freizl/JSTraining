;(function() {

var Item = Backbone.Model.extend(
   {
      defaults: {
         part1: 'Welcome to',
         part2: 'Stubhub'
      }
   }),

    // A collection of Items.
    // Basically an array of Model objects with some helper functions.
    List = Backbone.Collection.extend({ model: Item });

var ListView = Backbone.View.extend(
   {
      el: $('body'),
      counter: 0,

      // where DOM events bound to View methods.
      events: {
        'click button#add': 'addItem'
      },

      initialize : function initialize () {
         _.bindAll(this, 'render', 'addItem', 'appendItem'); // ??? Seems this is not required
         this.collection = new List();
         this.collection.bind('add', this.appendItem);

         this.render();
      },

      render : function render () {
         var that = this;
         $(that.el).append('<button id="add">Add list item</button>');
         $(that.el).append('<ul><li>Hello Backbone</li></ul>');

         /* in case collection is not empty
          * however it is empty at this example thus ignored.
          */
         //_(that.collection.models).each(
         //   function (item) {
         //      that.appendItem(item);
         //   }, that);

      },

      addItem : function addItem () {
         this.counter++;
         var item = new Item();
         item.set(
            {
               part2: item.get('part2') + this.counter
            });
         this.collection.add(item);
      },

      appendItem : function appendItem (item) {
         $('ul', this.el).append('<li>' + item.get('part1') + ' ' + item.get('part2') + '</li>');
      }
   }),

    // magic question: new an instance will be invoked automatically. how?
    listView = new ListView();

})(jQuery);
