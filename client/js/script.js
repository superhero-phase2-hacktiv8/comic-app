const baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    if (localStorage.access_token) {
        $('span#fullname').html(localStorage.fullname)
        dashboardPage()
    } else {
        loginPage()
    }
    $("#registerPassword, #registerRepeatPassword").keyup(checkPasswordMatch);
})

const dashboardPage = () => {
    $('#dashboardPage').show();
    $('#dasboardContent').show();
    $('#comicContent').hide();
    $('#characterContent').hide();
    $('#loginPage').hide();
    $('#registerPage').hide();
    $('#manipulateMe').html(`Welcome to admin dashboard comic app ${localStorage.fullname}`)
    $('span#fullname').html(localStorage.fullname)
    document.body.className = document.body.className.replace("no-javascript", "");
}

const myFavoriteComic = () => {
    $('#dashboardPage').show();
    $('#comicContent').show();
    $('#characterContent').hide();
    $('#dasboardContent').hide();
    $('#loginPage').hide();
    $('#registerPage').hide();
}

const myFavoriteCharacter = () => {
    $('#dashboardPage').show();
    $('#characterContent').show();
    $('#comicContent').hide();
    $('#dasboardContent').hide();
    $('#loginPage').hide();
    $('#registerPage').hide();

    $.ajax({
        method: "GET",
        url: `${baseUrl}/user/2/characters`,
        headers: { "access_token": localStorage.access_token }
    })
    .done(response => {
        console.log(response);
    })
    .fail(err => {
        console.log(err);
    });
}

const registerPage = () => {
    $('#registerFirstName').val('')
    $('#registerLastName').val('')
    $('#registerEmail').val('')
    $('#registerPassword').val('')
    $('#registerRepeatPassword').val('')
    $("#checkPasswordMatch").html("");
    $('#dashboardPage').hide();
    $('#loginPage').hide();
    $('#registerPage').show();
    $(document.body).addClass('bg-gradient-primary');
}

const loginPage = () => {
    if (localStorage.access_token) {
        $('span#fullname').html(localStorage.fullname)
        dashboardPage()
    } else {
        $('#loginEmail').val('')
        $('#loginPassword').val('')
        $('#dashboardPage').hide();
        $('#loginPage').show();
        $('#registerPage').hide();
        $(document.body).addClass('bg-gradient-primary');
    }
}

const logout = () => {
    localStorage.clear()
    $('#logoutModal').modal('hide')
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
    loginPage()
}

const checkPasswordMatch = () => {
    let password = $("#registerPassword").val();
    let confirmPassword = $("#registerRepeatPassword").val();

    if (password != confirmPassword) {
        $("#btnRegister").prop('disabled', true);
        $("#checkPasswordMatch").html("Passwords do not match!");
    } else if (password === "" && confirmPassword === "") {
        $("#btnRegister").prop('disabled', true);
        $("#checkPasswordMatch").html("");
    } else {
        $("#btnRegister").prop('disabled', false);
        $("#checkPasswordMatch").html("Passwords match.");
    }
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data: {
            id_token
        },
        success: (data) => {
            dashboardPage()
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('fullname', data.fullname)
            $('span#fullname').html(localStorage.fullname)
        },
        error: (err) => {
            toastr.warning(err.responseJSON.message, 'Warning Alert')
        }
    })
}

$('#btnLogin').click((event) => {
    event.preventDefault()
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            password
        },
        success: (data) => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('fullname', data.fullname)
            dashboardPage()
        },
        error: (err) => {
            toastr.warning(err.responseJSON.message, 'Warning Alert')
        }
    })
})

$('#btnRegister').click((event) => {
    event.preventDefault()
    let firstName = $('#registerFirstName').val()
    let lastName = $('#registerLastName').val()
    let email = $('#registerEmail').val()
    let password = $('#registerPassword').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {
            firstName,
            lastName,
            email,
            password
        },
        success: (data) => {
            console.log(data);
            loginPage()
        },
        error: (err) => {
            err.responseJSON.message.forEach(el => toastr.warning(el, 'Warning Alert'))
        }
    })
})

function handleDoubleClick(id){
  console.log(id);
  $(`#heart-${id}`).fadeIn(1000).fadeOut(1000)
}

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}