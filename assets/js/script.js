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
  var hourArray = [hourNine, hourTen, hourEleven, hourTwelve,
  hourThirteen, hourFourteen, hourFifteen, hourSixteen, hourSeventeen];


  function getCurrentDay(){
    var currentDay = $("#currentDay");
    currentDay.text(dayjs().format("MMM-DD-YYYY"));
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function getTimeOfDay(){
    var currentTime = dayjs().hour();
    for (var i = 0; i < hourArray.length; i++){
      var hourEl = hourArray[i].attr("data-hour");
      hourEl = parseInt(hourEl);

      if(hourEl === currentTime){
        hourArray[i].removeAttr("past");
        hourArray[i].removeAttr("future");
      }
    }
    
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  getCurrentDay();
  getTimeOfDay();
});
