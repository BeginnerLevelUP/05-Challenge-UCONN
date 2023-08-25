
$(function () {
  // Add a click event listener to the save buttons
  $(".saveBtn").on("click", function () {
    var userInput = $(this).siblings(".description").val().trim();
    var timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using Day.js
  var currentHour = dayjs().hour();

  // Loop through each time block to apply the classes
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlockHour < currentHour) {
      $(this).addClass("past").removeClass("present future");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present").removeClass("past future");
    } else {
      $(this).addClass("future").removeClass("past present");
    }
  });

  // Loop through each time block to set the user input from local storage
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedInput = localStorage.getItem(timeBlockId);
    if (savedInput !== null) {
      $(this).find(".description").val(savedInput);
    }
  });

  // Display the current date in the header
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
