$(function () {

function doCal () {
	var profit = parseInt($('#profit').val()),
	    yearCount = parseInt($('#yearCount').val()),
	    investPerYear = parseFloat($('#yearInvest').val()),
	    result = 0,
	    resultData = [];

	var i = 1;
	for (;i <= yearCount; i++){
		result = result * ( 1 + profit / 100) + investPerYear
		resultData[i-1] = [i, result];
	};

	return resultData;
}

var options = {
    series: {
        lines: { show: true },
        points: { show: true }
    }
};

$('#cal').click(function () {
 	var re = doCal();
  	$.plot($("#placeholder"), [re], options);
});


});

