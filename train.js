 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyDJvXMXX8vWJCWDuSGEnzT_EfnXjtXOmxc",
  authDomain: "train-schedule-d4f16.firebaseapp.com",
  databaseURL: "https://train-schedule-d4f16.firebaseio.com",
  projectId: "train-schedule-d4f16",
  storageBucket: "train-schedule-d4f16.appspot.com",
  messagingSenderId: "631644143705"
};
firebase.initializeApp(config);

 var database=firebase.database();



$("#Train-form").on("submit",function(event){
 
  event.preventDefault();

   var trainDataInput=  {
     name :$("#name-input").val().trim(),
     destination :$("#destination-input").val().trim(),
     frequence:$("#frequence-input").val().trim(),
     firsttrain:$("#firsttrain-input").val().trim()
     

   }

   console.log(trainDataInput);

   database.ref().push(trainDataInput);

   trainDataInput.empty(trainData);

});

database.ref().on("child_added", function(childSnapshot) {
 
  console.log(childSnapshot.val());

  
  var trainData = childSnapshot.val();
  


  var randomFrequence=5;

  var randomTime= "08:00";
 
  
  var timeConverted=moment(randomTime,("hh:mm a"));
  console.log(timeConverted);

  var ftimeconvert=moment(randomTime,"hh:mm a").subtract(1,"hours");
  console.log(ftimeconvert);

  var currentTime = moment();
  console.log("Current Time :" + moment(currentTime).format(("hh:mm a")));


  var timeDiff= moment().diff(moment(ftimeconvert),"minutes");
  console.log("Time Difference::"+ timeDiff);

  var arrivalTime = currentTime % randomFrequence;
  console.log(arrivalTime);

  var timetoTrain= randomFrequence + arrivalTime;
  console.log("Minutes Away:"+timetoTrain);


  

  var nextTrainArrival= moment().add(timetoTrain,"minutes");
  console.log(" Next Train::" +moment(nextTrainArrival).format("hh:mm a"));
  
 
  var $tr = $('<tr>');
 
  var $tdname = $('<td>').text(trainData.name);
  var $tddestination = $('<td>').text(trainData.destination);
  var $tdfrequence = $('<td>').text( trainData.frequence);
  var $tdnextTrain = $('<td>').text(nextTrainArrival);
  var $tdminutesAway = $('<td>').text(timetoTrain);
  


  $tr.append($tdname, $tddestination,  $tdfrequence,$tdnextTrain,$tdminutesAway);

  
  $("tbody").append($tr);

  
});




