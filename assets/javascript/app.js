
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD1MqCxkQf6Nc3T3oUMBDzVdZxoWlM-Dlk",
    authDomain: "trainschedule-7a996.firebaseapp.com",
    databaseURL: "https://trainschedule-7a996.firebaseio.com",
    projectId: "trainschedule-7a996",
    storageBucket: "trainschedule-7a996.appspot.com",
    messagingSenderId: "480470890423"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  //display anything in firebase on page


  //Capture train info on click
  $("#submit").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val();
    var frequency = $("#frequency").val();

    //Store firebase
   database.ref().push({
        name: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

  });

  //Display on page
