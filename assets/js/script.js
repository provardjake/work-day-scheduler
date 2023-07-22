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
  var clearBtn = $(".clearBtn");
  var hourArray = [hourNine, hourTen, hourEleven, hourTwelve,
  hourThirteen, hourFourteen, hourFifteen, hourSixteen, hourSeventeen];
  var textContentArray = [];
  var hourIdArray = [];


  //gets the current date and displays it on the page
  function getCurrentDay(){
    var currentDay = $("#currentDay");
    currentDay.text(dayjs().format("MMM-DD-YYYY"));
  }

  //When the save button is clicked, saves the entered text to an array in local storage
  saveBtn.on("click", function(event){
    event.preventDefault();

    var textContent = $(this).prev().val();
    var hourId = $(this).parent().attr("id");

    textContentArray = JSON.parse(localStorage.getItem("textContentArray") || "[]");
    hourIdArray = JSON.parse(localStorage.getItem("hourIdArray") || "[]");

    if(!textContentArray === null){
      // This loop checks if a time block already has something stored. if it does, it gets replaced by the new text
      for(var i = 0; i < hourIdArray.length; i++){
        if (hourIdArray[i] === hourId){
          hourIdArray.splice(i, 1);
          textContentArray.splice(i, 1);
        }
      }
    }

    textContentArray.push(textContent);
    hourIdArray.push(hourId);

    localStorage.setItem("textContentArray", JSON.stringify(textContentArray));
    localStorage.setItem("hourIdArray", JSON.stringify(hourIdArray));

    renderHourText();
  });

  // clears the local storage and refreshes the page
  clearBtn.on("click", function(){
    localStorage.clear();
    window.location.reload();
  });

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
    var storedHourIdArray = JSON.parse(localStorage.getItem("hourIdArray"));
    var storedTextContentArray = JSON.parse(localStorage.getItem("textContentArray"));

    if(storedHourIdArray === null || storedHourIdArray === undefined){
      return;
    }
    else{
      for(var i = 0; i < hourArray.length; i++){
        for(var x = 0; x < storedHourIdArray.length; x++){
          if(storedHourIdArray[x] === hourArray[i].attr("id")){
            hourArray[i].children(".description").text(storedTextContentArray[x]);
          }
        }
      }
    }

  }

  renderHourText();
  getCurrentDay();
  getTimeOfDay();
});
