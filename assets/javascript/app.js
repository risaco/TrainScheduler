
// Document Ready Function
$(document).ready(function() {
    // Firebase Init
    var config = {
	    apiKey: "AIzaSyArPEgK6D0RSJTJZb8oqjDrtKHbhGeYjgo",
	    authDomain: "catchthetrain-61e17.firebaseapp.com",
	    databaseURL: "https://catchthetrain-61e17.firebaseio.com",
	    projectId: "catchthetrain-61e17",
	    storageBucket: "",
	    messagingSenderId: "1036705812575"
  	};
  	firebase.initializeApp(config);


    // Create a variable to reference the database.
    var database = firebase.database();

    // Capture Button Click
    $("#add").on("click", function(event) {
        event.preventDefault();

        // Grabbed user input from text boxes
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var startTime = $("#startTime-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        // Creates local "temporary" object for new trains
        var newTrain = {

        	name: name,
            destination: destination,
            startTime: startTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        // Code for handling the push
        database.ref().push(newTrain);

        // log everythig to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.startTime);
        console.log(newTrain.frequency);

        // Clears all of the text-boxes
  		$("#name-input").val("");
  		$("#destination-input").val("");
 		$("#startTime-input").val("");
  		$("#frequency-input").val("");
    });

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	console.log(childSnapshot.val());

  	// Store everything into a variable.
  	var name = childSnapshot.val().name;
  	var destination = childSnapshot.val().destination;
  	var startTime = childSnapshot.val().startTime;
  	var frequency = childSnapshot.val().frequency;

  	// Employee Info
  	console.log(name);
  	console.log(destination);
  	console.log(startTime);
  	console.log(frequency);

  	// Using frequency and start time, calulate time to nextTrain

      // minutesPassed = (currentTime - startTime)
      // minutesIn = minutesPassed % frequency
      // minutesLeft = frequency - minutesIn

      // nextTrain = currentTime + minutesLeft

    // Start Time (pushed back 1 year to make sure it comes before current time)
    var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
    console.log(startTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times -- minutes passed since first train left
    var totalMinPassed = moment().diff(moment(startTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + totalMinPassed);

    // Time apart (remainder) -- minutes passed since the last train left
    var minFromLast = totalMinPassed % frequency;
    console.log(minFromLast);

    // Minutes Until Next Train Arrives
    var minToNext = frequency - minFromLast;
    console.log("MINUTES TILL TRAIN: " + minToNext);

    // Next Train Arrival time
    var nextTrain = moment().add(minToNext, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format('LT'));

    var nextTrainTime = moment(nextTrain).format("LT");


  	// Add each train's data into the table
  	$("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  	frequency + "</td><td>" + nextTrainTime + "</td><td>" + minToNext + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case

//         // Handle the errors
//     }, function(errorObject) {
//         console.log("Errors handled: " + errorObject.code);
//     });
});
