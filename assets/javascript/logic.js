$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCAUNG-pFEylHQoAEcdPZYp4DZudju91Lo",
        authDomain: "train-schedule-82815.firebaseapp.com",
        databaseURL: "https://train-schedule-82815.firebaseio.com",
        projectId: "train-schedule-82815",
        storageBucket: "",
        messagingSenderId: "1043169766350",
        appId: "1:1043169766350:web:4d2e535e843014321b199f"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    //var minutesTimer;
    //Minutes Away
    var tMinutesTillTrain;


    $("#submitButton").on("click", function (e) {
        e.preventDefault();

        //enter the values to the database
        var trainName = $("#nameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var ftt = $("#fttInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            ftt: ftt,
            frequency: frequency,
        });

    });

    database.ref().on("child_added", function (snapshot) {

        var sv = snapshot.val();
        var name = sv.trainName;
        var destination = sv.destination;
        var firstTime = sv.ftt;
        var tFrequency = sv.frequency;

        var firstTimeConverted = moment(firstTime, "HH:mm A").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        //Minutes Away
        tMinutesTillTrain = tFrequency - tRemainder;
        // Next Arrival
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        //create a new row in the table
        var row = $("<tr>");

        //add the data to the row
        row.append($("<td>").text(name));
        row.append($("<td>").text(destination));
        row.append($("<td>").text(tFrequency));
        row.append($("<td>").text(moment(nextTrain).format("hh:mm A")));
        row.append($("<td class='minutes'>").text(tMinutesTillTrain));        
        $("tbody").append(row);        

        //minutesTimer=setInterval(updateMinutesAway,1000*60);
        
    });


    // var updateMinutesAway=function(){
    //     console.log("timer triggered");
    //     var tmin=$('tbody').find(".minutes").html();
    //     console.log(tmin);
    //     if(tmin>0){
    //     $('tbody').find(".minutes").text(--tmin);
    //     }
    //     else{
    //         clearInterval(minutesTimer);
    //     }
    // };

});