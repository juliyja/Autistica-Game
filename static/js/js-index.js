$(document).ready(function(){
  $('#loginButton').click(function(){
    $('#registerationForm').slideUp()
    if ($('#loginForm').css('display') != 'none') $('#loginForm').slideUp()
    else $('#loginForm').slideDown()
  });
  $('#registerationButton').click(function(){
    $('#loginForm').slideUp()
    if ($('#registerationForm').css('display') != 'none') $('#registerationForm').slideUp()
    else $('#registerationForm').slideDown()
  })
});
