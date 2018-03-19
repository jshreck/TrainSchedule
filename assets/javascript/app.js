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
    var newTrain ={
    trainName: `${$("#train-name").val().trim()}`,
    destination: `${$("#destination").val().trim()}`,
    firstTrainTime: `${$("#first-train-time").val()}`,
    frequency: `${$("#frequency").val()}`,
    };
    console.log(newTrain)
    //Push info into firebase
    database.ref().push(newTrain);
    //clear inputs
    $("input").val("");
  });


//Display on page; displays for every child and then when new child added
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var train = childSnapshot.val();
  var trainName = train.trainName;
  var destination = train.destination;
  var frequency = train.frequency;
  var nextArrival;
  //(moment()- moment(train.firstTrainTime).format("HH:mm"))*frequency + train.firstTrainTime;
  //console.log('"nextarrival:" ' + nextArrival);
  //console.log("first train time from now" + train.firstTrainTime.fromNow());
  //concole.log("first train time in minutes" + train.firstTrainTime.toMinutes());
  var minutesAway; //moment unis of next arrival - moent unix of now (or jsut diff between)
  $("#trains-added").append(`<tr>
  <td>${trainName}</td>
  <td>${destination}</td>
  <td>${frequency}</td>
  <td>${nextArrival}</td>
  <td>${minutesAway}</td></tr>`);

console.log("frequency type " + typeof parseInt(frequency));  
var currentTime = moment() //.format("HH:mm");
console.log("firstTrainTime " + train.firstTrainTime);
console.log("firstTrainTime HH:mm " + moment(train.firstTrainTime, "HH:mm").format("HH:mm"));
var databaseTime = moment("08:00", "HH:mm") //.format("HH:mm");

console.log("diff?" + (moment().diff(databaseTime)).toMinutes());

});
 


//on load loop to display stored data, to display stored data is function (call in loop), which can also be called each time train is added

//=====================================================================