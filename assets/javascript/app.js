
// Document Ready Function
$(document).ready(function() {
    // Firebase Init
    var config = {
        apiKey: "AIzaSyCkOKvemoaIHzwCXXzssVxJeiAN38tqvOI",
        authDomain: "employee-database-d9e5a.firebaseapp.com",
        databaseURL: "https://employee-database-d9e5a.firebaseio.com",
        projectId: "employee-database-d9e5a",
        storageBucket: "",
        messagingSenderId: "450233857300"
    };
    firebase.initializeApp(config);


    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values for Database Storage
    var name = "";
    var role = "";
    var startDate = "";
    var monthlyRate = "";

    // Capture Button Click
    $("#add").on("click", function(event) {
        event.preventDefault();

        // Grabbed values from text boxes
        name = $("#name-input").val().trim();
        role = $("#role-input").val().trim();
        startDate = $("#startDate-input").val().trim();
        monthlyRate = $("#monthlyRate-input").val().trim();

        // Code for handling the push
        database.ref().push({
            name: name,
            role: role,
            startDate: startDate,
            monthlyRate: monthlyRate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        
        });

    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        // Console.loging the last user's data
        console.log(sv.name);
        console.log(sv.role);
        console.log(sv.startDate);
        console.log(sv.monthlyRate);

        // Change the HTML to reflect
        $("#name-display").html(sv.name);
        $("#email-display").html(sv.role);
        $("#age-display").html(sv.startDate);
        $("#comment-display").html(sv.monthlyRate);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});