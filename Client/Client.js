host = window.location.protocol + '//' + location.host
function loadPage() {

   $("div.container-fluid").html($("#view-home").html())
   links.forEach(l => {
      l.classList.remove("active");
   });
   navToggle();

}

function loadContactPage() {
   $("div.container-fluid").html($("#view-contact").html())
}

function loadHowtoPage() {
   $("div.container-fluid").html($("#view-howto").html())
}

function loadToolsPage() {
   $("div.container-fluid").html($("#view-tools").html())
}

function loadBookingsPage() {
   $("div.container-fluid").html($("#view-bookings").html())
   getBookings();
}
function loadAccountPage() {
   $("div.container-fluid").html($("#view-account").html())
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

$('#bookingsButton').click(function (e) {
   e.preventDefault();
   loadBookingsPage();
});

$('#regButton').click(function (e) {
   e.preventDefault();
   loadRegPage();
});
$('#loginButton').click(function (e) {
   e.preventDefault();
   loadLoginPage();
});

$('#accountButton').click(function (e) {
   e.preventDefault();
   loadAccountPage();
});

$('#howtoButton').click(function (e) {
   e.preventDefault();
   loadHowtoPage();
});

$('#logoutButton').click(function (e) {
   e.preventDefault();
   sessionStorage.setItem('auth', '');
   loadPage();
});

function logout() {

   sessionStorage.clear();

}

function register() {
   // e.preventDefault();
   var boolean = false;
   if ($('#regAdmin').val() == 1) {
      boolean = true;
   }

   alert(boolean);
   $.ajax({
      url: host + '/signup',
      type: 'POST',
      datatype: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({
         "name": document.getElementById("regName").value,
         "email": document.getElementById("regEmail").value,
         "password": document.getElementById("regLosen").value
         //"is_admin":boolean
      }),
      success: function () {
         alert("Du är registrerad!");
         loadPage();
      },
      error: function () {
         alert("nu blev det fel")
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
         "email": document.getElementById("loginEmail").value,
         "password": document.getElementById("loginLosen").value
      }),
      success: function (loginResponse) {

         sessionStorage.setItem('auth', JSON.stringify(loginResponse.token))
         sessionStorage.setItem('user_id', JSON.stringify(loginResponse.user_id))
         loadPage();
         alert("Du har loggats in");
      },
      error: function () {
         alert("fel epost eller lösenord")
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
   $('#howtoButton').toggleClass('d-none', signedIn);
   $('#loginButton').toggleClass('d-none', signedIn);
   $('#logoutButton').toggleClass('d-none', !signedIn);
   $('#accountButton').toggleClass('d-none', !signedIn);
   $('#bookingsButton').toggleClass('d-none', signedIn);
}

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
   link.addEventListener("click", function () {
      // Ta bort "active" från alla länkar som har den
      links.forEach(l => {
         l.classList.remove("active");
      });
      // Lägg till "active" på den klickade länken
      link.classList.add("active");
   });
});