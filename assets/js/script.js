// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var hourNine = $("#hour-9");
  var hourTen = $("#hour-10");
  var hourEleven = $("#hour-11");
  var hourTwelve = $("#hour-12");
  var hourThirteen = $("#hour-13");
  var hourFourteen = $("#hour-14");
  var hourFifteen = $("#hour-15");
  var hourSixteen = $("#hour-16");
  var hourSeventeen = $("#hour-17");
  var saveBtn = $(".saveBtn");
  var hourArray = [hourNine, hourTen, hourEleven, hourTwelve,
  hourThirteen, hourFourteen, hourFifteen, hourSixteen, hourSeventeen];
  var hourTextArray = [];


  //gets the current date and displays it on the page
  function getCurrentDay(){
    var currentDay = $("#currentDay");
    currentDay.text(dayjs().format("MMM-DD-YYYY"));
  }

  //When the save button is clicked, saves the entered text to an array in local storage
  saveBtn.on("click", function(event){
    event.preventDefault();
    var hourText = {
      textContent: $(this).prev().val(), 
      id: $(this).parent().attr("id")
    };

    // this loop checks if a saved object already exists. if it does,
    // replace it with the new input. 
    for(var i = 0; i < hourTextArray.length; i++){
      if (hourTextArray[i].id === hourText.id){
        hourTextArray.splice(i, 1);
      }
    }

    hourTextArray.push(hourText);

    localStorage.setItem("hourTextArray", JSON.stringify(hourTextArray));

    renderHourText();
  })

  
  // this function gets the current time and compares it to the data-hour of each element. 
  // gives styling based on the comparison
  function getTimeOfDay(){
    var currentTime = dayjs().hour();
    for (var i = 0; i < hourArray.length; i++){
      var hourEl = hourArray[i].attr("data-hour");
      hourEl = parseInt(hourEl);

      if(hourEl === currentTime){
        hourArray[i].removeClass("past");
        hourArray[i].removeClass("future");
      }
      if (hourEl > currentTime){
        hourArray[i].removeClass("past");
        hourArray[i].removeClass("present");
      }
      if (hourEl < currentTime){
        hourArray[i].removeClass("present");
        hourArray[i].removeClass("future");
      }
    }
    
  }


  //this function displays the stored text to each of the time blocks
  function renderHourText(){
    var storedHourTextArray = JSON.parse(localStorage.getItem("hourTextArray"));

    for(var i = 0; i < hourArray.length; i++){
      if(hourArray[i].attr("id") == storedHourTextArray[0].id){
        hourArray[i].children("textarea").text(storedHourTextArray[i].textContent);
      }
    }
  }

  renderHourText();
  getCurrentDay();
  getTimeOfDay();
});
