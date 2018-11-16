$(document).ready(function(){

  var currentTab = 0; // Current tab is set to be the first tab (0)
  showTab(currentTab); // Display the current tab

  $('#prevBtn').click(() => {
    nextPrev(-1)
  })
  $('#nextBtn').click(() => {
    nextPrev(1)
  })

  function showTab(n) {
    // This function will display the specified tab of the form ...
    x = $(".tab");
    $(x[n]).css('display', 'block');

    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      $('#prevBtn').css('display', 'none');
    } else {
      $('#prevBtn').css('display', 'inline');
    }
    if (n == (x.length - 1)) {
      $('#nextBtn').html('Submit');
    } else {
      $('#nextBtn').html('Next');
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)

  }

  function nextPrev(n) {
    // This function will figure out which tab to display
    var x = $('.tab');
    // Exit the function if any field in the current tab is invalid:
    //if (n == 1 && !validateForm()) return false;

    // Hide the current tab:
    $(x[currentTab]).css('display', 'none');
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      $("#regForm").submit();
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }

  function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = $(".tab");
    y = $(x[currentTab]).find("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
  }

  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = $(".step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
  }
})
