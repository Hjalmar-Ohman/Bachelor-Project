host = window.location.protocol + '//' + location.host


function emptyRegLoadPage(){
   input3.value = "";
   input4.value = "";
   input5.value = "";
   loadPage();
}

function emptyLoginLoadPage(){
   input1.value = "";
   input2.value = "";
   loadPage();
}

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
   loadTools();
}

function loadBookingsPage() {
   $("div.container-fluid").html($("#view-bookings").html())
   getBookings();
}
function loadAccountPage() {
   $("div.container-fluid").html($("#view-account").html())
   getUser()
}

function loadRegPage() {

   $("div.container-fluid").html($("#view-reg").html())
}
function loadLoginPage() {

   $("div.container-fluid").html($("#view-login").html())
}

$(document).ready(function () {
   // Kod i detta block körs när dokumentet laddats klart.
   //sessionStorage.setItem('auth', '');
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
//Används för att ladda användare från server till "Mina sidor"
function getUser() {
   
  
   
   let user_jwt_Token = JSON.parse(sessionStorage.getItem('auth'))
   $.ajax({
      url: host + '/user/get/' + sessionStorage.getItem('user_id'),
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      headers: {'Authorization': 'Bearer ' + user_jwt_Token},
      success: function (user) {
         console.log(user);
         var accountContainer = $('.accountContainer')
         var cardBody = $('<div class="cardBody" id = "' + user.id + '"></div>');
         var button = $('<a href="#" class="font accountButton btn" onclick="editUser(' + user.id + ')">Ändra</a>');
         var myaccount = $('<h1 class = "font4 Rubrik"> Mitt konto</h1>')
         var name = $('<p class="font5">' + user.name + '</p>');
         var nametitle = $('<h5 class="font5"> Namn </h5>');
         var email = $('<p class="font5">' + user.email + '</p>');
         var emailtitle = $('<h5 class="font5"> Email </h5>');
         cardBody.append(myaccount, nametitle, name, emailtitle, email, button)
         accountContainer.append(cardBody);
      },
      error: function () {
         console.log("error")
      }
   })

}

function updateUser(userId, name, email) {

   // Skicka AJAX-förfrågan med uppdateringsdata till servern
   let user_jwt_Token = JSON.parse(sessionStorage.getItem('auth'))
   $.ajax({
      url: host + '/user/edit/' + userId,
      type: 'PUT',
      datatype: 'JSON',
      contentType: 'application/json',
      headers: { 'Authorization': 'Bearer ' + user_jwt_Token },
      data: JSON.stringify({
         "name": name,
         "email": email
      }),
      success: function () {
         // Uppdatera användarens namn och e-postadress på sidan
         $('.accountContainer').find('.cardBody').find('.font5:eq(1)').text(name);
         $('.accountContainer').find('.cardBody').find('.font5:eq(3)').text(email);

         alert("Uppdateringen lyckades!");
      },
      error: function () {
         alert("Uppdateringen misslyckades!");
      }
   });
}



function editUser() {
   // Fill in the form with the user's current details
   $('#editName').val($('.accountContainer .cardBody .font5:eq(1)').text());
   $('#editEmail').val($('.accountContainer .cardBody .font5:eq(3)').text());

   // Show the modal
   $('#editModal').modal('show');
}

function submitEditUser() {
   // Get the updated details from the form
   var name = $('#editName').val();
   var email = $('#editEmail').val();

   // Get the user id from the card body
   var userId = $('.accountContainer .cardBody').attr('id');

   // Send the update request to the server
   updateUser(userId, name, email);

   // Hide the modal
   $('#editModal').modal('hide');
}


function register() {
   // e.preventDefault();
   var boolean = false;
   if ($('#regAdmin').val() == 1) {
      boolean = true;
   }

   var email = document.getElementById("regEmail").value
   var password = document.getElementById("regLosen").value

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
         //alert("Du är registrerad!");
         auto_login(email, password);
      },
      error: function () {
         alert("nu blev det fel")
      }
   })
   input3.value = "";
   input4.value = "";
   input5.value = "";
}

var input1 = document.getElementById("loginEmail");
var input2 = document.getElementById("loginLosen");
var input3 = document.getElementById("regEmail");
var input4 = document.getElementById("regName");
var input5 = document.getElementById("regLosen");

input2.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        login();
        $("#myModal").modal("hide");
       // document.getElementById("logInButton").click();
    }
});


input5.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        register();
        $("#myRegModal").modal("hide");
    }
});

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
      },
      error: function () {
         alert("fel epost eller lösenord")
      }
   })
   input1.value = "";
   input2.value = "";
}

//Används vid registrering, tar emot mail och password från register() funktionen
function auto_login(email, password) {

   $.ajax({
      url: host + '/login',
      type: 'POST',
      datatype: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({
         "email": email,
         "password": password
      }),
      success: function (loginResponse) {

         sessionStorage.setItem('auth', JSON.stringify(loginResponse.token))
         sessionStorage.setItem('user_id', JSON.stringify(loginResponse.user_id))
         loadPage();
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
   $('#bookingsButton').toggleClass('d-none', !signedIn);
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

function arrowDownScroll() {
   let e = document.getElementById("arrowDown");
   e.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
      inline: 'start'
   });
}