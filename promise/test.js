;(function () {
   console.log("Hello Promise");

   var defaults = {user:"Simon"},
       errors = {errors: "error message"};

   function success (index) {
      return function _success () {
         var x = "Success-" + index;
         console.log(x + ":", arguments);
         return x;
      };
   }

   function failure (index) {
      return function _failure () {
         var y = "Failure-" + index;
         console.log(y + ":", arguments);
         return y;
      };

   }

   function progress (index) {
      return function _progress () {
         console.log("progress-" + index + ":", arguments);
      };
   }


   function testPromise1 () {
      $.when(data)
         .then(success(1), failure(1), progress(1));
   }

   function _aCallback (success, maybeData) {
      var d = $.Deferred(),
          data = maybeData ? maybeData : defaults;
      setTimeout(function () {
         return !!success ? d.resolve(data) : d.reject(errors);
      }, 200);
      return d;
   }

   /**
    * 1. input of "done" function is : either the origin data from "resolve" or last "then".
    * 2. notice how the second _aCallback change the value chain.
    */
   function testPromise2 () {
      return _aCallback(0)
         .then(null, function fn1 () {
            console.log("fail 1: ", arguments);
            // return _aCallback(1, {email: "freizl"}).then(success(20));
            return _aCallback(1, {email: "fail one"});
         })
         .then(success(3), failure(3))
         .done(success(4))
         .then(function fn2 () {
            return _aCallback(0, {login: "simon"});
         })
         .done(success(5))
         .fail(failure(4))
         .progress(progress(1))
         .progress(progress(2));
   }


   $(function (){
      //testPromise1();
      testPromise2();
   });

})(jQuery);
