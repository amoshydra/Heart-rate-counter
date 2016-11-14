var click = 0;
var timePre;
var timeNow;
var timeAvg = 0;

var animationSpeed = 0;
var currentID;

$(document).ready(function (){

	var heartIcon = $("#heart-icon");
	animateHeartBeat();

	$("#heart").click(function () {

		if (!timeNow) {
			// first press
			timeNow = $.now();
			writeToFeedback("-&nbsp");
			animationSpeed = 0;
			return true;
		}

		timePre = timeNow;
		timeNow = $.now();
		click += 1;

		var timeDiff = timeNow - timePre;

		if (timeDiff > 2500) {
			// user stopped
			timeAvg = 0;
			click = 0;
			timeNow = $.now();
			writeToFeedback("-&nbsp");
			animationSpeed = 0;
			return true;
		}

		timeAvg = ((timeAvg * (click - 1)) + timeDiff) / click;
		writeToFeedback(60000/timeAvg | 0);
		animationSpeed = timeAvg/16;
		heartIcon.stop();
		animateHeartBeat();
	});

	function animateHeartBeat() {

		var animationID = $.now();
		currentID = animationID;

		if (animationSpeed == 0) {
			return;
		} else {
			heartIcon
				.animate({height: 15,width: 15}, animationSpeed)
				.animate({height: 10,width: 10}, animationSpeed)
				.animate({height: 13,width: 13}, animationSpeed)
				.animate({height: 10,width: 10}, animationSpeed)
				.animate({height: 10,width: 10}, animationSpeed*12, function (){
					
					if (currentID == animationID) {
						animateHeartBeat();	
					}
				});	
		}
	}

	var feedbackHeader = $("#feedback h1");

	function writeToFeedback(message) {
		feedbackHeader[0].innerHTML = message;
	}

	function shareToWhatsapp() {
		var message = "My heart rate is " + heartRate + " beat per minute."
		var urlToOpen = "whatsapp://send?text=" + message;
		window.open( urlToOpen, "_self");
	}
});

