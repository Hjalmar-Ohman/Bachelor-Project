host = window.location.protocol + '//' + location.host
function loadPage() {
   $("div.container-fluid").html($("#view-home").html())
   navToggle();
}

function loadContactPage() {

   $("div.container-fluid").html($("#view-contact").html())
}

function loadToolsPage() {
   $("div.container-fluid").html($("#view-tools").html())
   loadTools();
}
function loadRegPage() {

   $("div.container-fluid").html($("#view-reg").html())
}
function loadLoginPage() {

   $("div.container-fluid").html($("#view-login").html())
}

$(document).ready(function () {
   // Kod i detta block körs när dokumentet laddats klart.
   sessionStorage.setItem('auth', '');
   loadPage();
})

$('#homeButton').click(function (e) {
   e.preventDefault();
   loadPage();
});


$('#toolButton').click(function (e) {
   e.preventDefault();
   loadToolsPage();
});

$('#regButton').click(function (e) {
   e.preventDefault();
   loadRegPage();
});
$('#loginButton').click(function (e) {
   e.preventDefault();
   loadLoginPage();
});
$('#logoutButton').click(function (e) {
   e.preventDefault();
   sessionStorage.setItem('auth', '');
   loadPage();
});


function newUser() {
   // e.preventDefault();
   var boolean = false;
   if ($('#regAdmin').val() == 1) {
      boolean = true;
   }

   alert(boolean);
   $.ajax({
      url: host + '/sign-up',
      type: 'POST',
      datatype: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({
         "name": regName.value,
         "email": regEmail.value,
         "password": regLosen.value,
         "is_admin": boolean
      }),
      success: function () {
         alert("Du är registrerad!");
         loadPage();
      }
   })
}

function login() {
   $.ajax({
      url: host + '/login',
      type: 'POST',
      datatype: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({
         "email": loginEmail.value,
         "password": loginLosen.value
      }),
      success: function (loginResponse) {

         sessionStorage.setItem('auth', JSON.stringify(loginResponse))
         loadPage();
         alert("Du har loggats in");
      }
   })
}

function navToggle() {
   if ((sessionStorage.getItem('auth').length == 0) || (sessionStorage.getItem('auth') == null)) {
      var signedIn = false;
   } else {
      var signedIn = true;
   }

   // alert("toggle check" + signedIn);
   $('#carsButton').toggleClass('d-none', !signedIn);
   $('#regButton').toggleClass('d-none', signedIn);
   $('#loginButton').toggleClass('d-none', signedIn);
   $('#logoutButton').toggleClass('d-none', !signedIn);
}
