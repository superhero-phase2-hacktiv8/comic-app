const baseUrl = 'http://localhost:3000'
let tableCharacter, tableComic;


$(document).ready(function() {
    if (localStorage.access_token) {
        $('#manipulateMe').html(`Welcome to admin dashboard comic & superhero app ${localStorage.fullname}`)
        $('span#fullname').html(localStorage.fullname)

        modalCharacter()
        modalComic()
        select2character()
        select2comic()
        dashboardPage()
        showCharacters();
        characterTable()
        comicTable()
        getLocation()
        getWeather()
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
    $('#manipulateMe').html(`Welcome to admin dashboard comic and superhero app ${localStorage.fullname}`)
    $('span#fullname').html(localStorage.fullname)
    document.body.className = document.body.className.replace("no-javascript", "");
    showCharacters();
    getLocation()
    getWeather()
}

const modalCharacter = () => {
    $('#modal-character form').on('submit', (e) => {
        if (!e.isDefaultPrevented()) {
            url = `${baseUrl}/characters/add`;
            method = 'POST';
            $.ajax({
                url,
                method,
                data: $('#modal-character form').serialize(),
                dataType: 'JSON',
                headers: {
                    access_token: localStorage.access_token
                },
                success: (data) => {
                    toastr.success('Successfully add new character!', 'Success Alert', { timeOut: 4000 });
                    $('#modal-character').modal('hide');
                    tableCharacter.ajax.reload(null, false);
                },
                error: (err) => {
                    if (err.responseJSON.message === 'jwt expired') {
                        toastr.info(`${err.responseJSON.message}`, 'session expired');
                        $('#modal-character').modal('hide');
                        logout()
                    } else {
                        toastr.warning(err.responseJSON.message, 'Warning Alert')
                    }
                }
            });
            return false;
        }
    });
}

const modalComic = () => {
    $('#modal-comic form').on('submit', (e) => {
        if (!e.isDefaultPrevented()) {
            url = `${baseUrl}/comic/add`;
            method = 'POST';
            $.ajax({
                url,
                method,
                data: $('#modal-comic form').serialize(),
                dataType: 'JSON',
                headers: {
                    access_token: localStorage.access_token
                },
                success: (data) => {
                    toastr.success('Successfully add new comic!', 'Success Alert', { timeOut: 4000 });
                    $('#modal-comic').modal('hide');
                    tableComic.ajax.reload(null, false);
                },
                error: (err) => {
                    if (err.responseJSON.message === 'jwt expired') {
                        toastr.info(`${err.responseJSON.message}`, 'session expired');
                        $('#modal-comic').modal('hide');
                        logout()
                    } else {
                        toastr.warning(err.responseJSON.message, 'Warning Alert')
                    }
                }
            });
            return false;
        }
    });
}

const select2character = () => {
    $('#character_id').select2({
        allowClear: true,
        dropdownParent: $("#modal-character"),
        placeholder: 'Pilih Charachter',
        ajax: {
            url: `${baseUrl}/characters/select2character`,
            dataType: 'json',
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: function(params) {
                return {
                    search: params.term
                }
            },
            processResults: function(data) {
                return {
                    results: data.map(function(item) {
                        return {
                            id: item.id,
                            text: item.name
                        };
                    }),
                }
            },
            cache: true
        }
    });
}

const select2comic = () => {
    $('#comic_id').select2({
        allowClear: true,
        dropdownParent: $("#modal-comic"),
        placeholder: 'Pilih Comic',
        ajax: {
            url: `${baseUrl}/comic/select2favorite`,
            dataType: 'json',
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: function(params) {
                return {
                    search: params.term
                }
            },
            processResults: function(data) {
                return {
                    results: data.map(function(item) {
                        return {
                            id: item.id,
                            text: item.title
                        };
                    }),
                }
            },
            cache: true
        }
    });
}

const showCharacters = () => {
    $.ajax({
            method: "GET",
            url: `${baseUrl}/characters`,
            headers: { "access_token": localStorage.access_token }
        })
        .done(response => {
            $("#characters").empty();
            response.forEach(res => {
                let char = `
            <a data="1" ondblclick="handleDoubleClick(${res.id})">
                <div class="col-md col-sm-12">
                    <div class="card m-2" style="width: 9.5rem;">
                        <div class="img-container">
                            <div id="heart-${res.id}" class="heart"><i class="fas fa-heart"></i></div>
                            <img src="${res.image.original_url}" alt="">
                        </div>
                        <p class="text-center">${res.name}</p>
                    </div>
                </div>
            </a>
            `
                $("#characters").append(char);
            })
        })
        .fail(err => {
            console.log(err);
        });
}

const searchCharacter = () => {
    const name = $("#search_character_name").val();
    if (!name) {
        showCharacters();
    } else {
        $.ajax({
                method: "POST",
                url: `${baseUrl}/characters/search`,
                headers: { "access_token": localStorage.access_token },
                data: { name }
            })
            .done(response => {
                $("#characters").empty();
                if (response.length === 0) {
                    $("#characters").append(`<p>${name} Not found</p>`);
                    $("#search_character_name").val('');
                }
                response.forEach(res => {
                    let char = `
                <a data="1" ondblclick="handleDoubleClick(${res.id})">
                    <div class="col-md col-sm-12">
                        <div class="card m-2" style="width: 9.5rem;">
                            <div class="img-container">
                                <div id="heart-${res.id}" class="heart"><i class="fas fa-heart"></i></div>
                                <img src="${res.image.original_url}" alt="">
                            </div>
                            <p class="text-center">${res.name}</p>
                        </div>
                    </div>
                </a>`
                    $("#characters").append(char);
                    $("#search_character_name").val('');
                })
            })
            .fail(err => {
                console.log(err);
            });
    }

}

$("#form-search").keypress(function(e) {
    if (e.which == 13) {
        searchCharacter();
        return false;
    }
});

const characterTable = () => {
    tableCharacter = $('#tableCharacter').DataTable({
        destroy: true,
        searchable: true,
        processing: true,
        async: false,
        order: [],
        language: {
            "processing": '<div class="spinner-border text-info m-2" role="status"><span class="sr-only"></span></div></br><div>Tunggu Sebentar yaa...</div>',
        },
        "drawCallback": function() {
            $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
        },
        ajax: {
            method: 'GET',
            url: `${baseUrl}/characters/favorite`,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            error: (err) => {
                if (err.responseJSON.message === 'jwt expired') {
                    toastr.info(`${err.responseJSON.message}`, 'session expired');
                    logout()
                }
            }
        },
        columns: [
            { data: 'id', name: 'id', visible: false, searchable: false },
            {
                data: 'imgUrl',
                render: (data) => {
                    return `<img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 10rem;" src="${data}" alt="">`
                }
            },
            { data: "name" },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false,
                render: function(data, type, row) {
                    return `<div class="input-group-btn"><button class="btn btn-danger" style="margin-left:5px" id="bDestroyCharacter"><i class="fa fa-trash"></i> Delete </button>   </div>`
                }
            },
        ],
    });
}

const comicTable = () => {
    tableComic = $('#tableComic').DataTable({
        destroy: true,
        searchable: true,
        processing: true,
        async: false,
        order: [],
        language: {
            "processing": '<div class="spinner-border text-info m-2" role="status"><span class="sr-only"></span></div></br><div>Tunggu Sebentar yaa...</div>',
        },
        "drawCallback": function() {
            $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
        },
        ajax: {
            method: 'GET',
            url: `${baseUrl}/comic`,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            error: (err) => {
                if (err.responseJSON.message === 'jwt expired') {
                    toastr.info(`${err.responseJSON.message}`, 'session expired');
                    logout()
                }
            }
        },
        columns: [
            { data: 'id', name: 'id', visible: false, searchable: false },
            { data: "title" },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false,
                render: function(data, type, row) {
                    return `<div class="input-group-btn"><button class="btn btn-danger" style="margin-left:5px" id="bDestroyComic"><i class="fa fa-trash"></i> Delete </button>   </div>`
                }
            },
        ],
    });
}

const refreshTableCharacter = () => {
    tableCharacter.ajax.reload(null, false);
}

const refreshTableComic = () => {
    tableComic.ajax.reload(null, false);
}

$('#btnCreateCharacter').click(function() {
    $('#modal-character').modal();
    $('#modal-character form')[0].reset();
    $('.modal-title').text('Add new character');
});

$('#btnCreateComic').click(function() {
    $('#modal-comic').modal();
    $('#modal-comic form')[0].reset();
    $('.modal-title').text('Add new comic');
});

$('#tableCharacter tbody').on('click', '#bDestroyCharacter', function() {
    const id = tableCharacter.row($(this).parents('tr')).data().id;

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: `${baseUrl}/characters/${id}`,
                headers: {
                    access_token: localStorage.access_token
                },
                success: (data) => {
                    Swal.fire("Done!", "Successfully deleted data!", "success");
                    toastr.success(data.message, 'Success Alert')
                    refreshTableCharacter()
                },
                error: (err) => {
                    if (err.responseJSON.message === 'jwt expired') {
                        toastr.info(`${err.responseJSON.message}`, 'session expired');
                        logout()
                    }
                    Swal.fire("Error deleting!", "Please try again", "error");
                    toastr.error(err.message, 'Error Alert')
                }
            });
        }
    })
});

$('#tableComic tbody').on('click', '#bDestroyComic', function() {
    const id = tableComic.row($(this).parents('tr')).data().id;

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: `${baseUrl}/comic/${id}`,
                headers: {
                    access_token: localStorage.access_token
                },
                success: (data) => {
                    Swal.fire("Done!", "Successfully deleted data!", "success");
                    toastr.success(data.message, 'Success Alert')
                    refreshTableComic()
                },
                error: (err) => {
                    if (err.responseJSON.message === 'jwt expired') {
                        toastr.info(`${err.responseJSON.message}`, 'session expired');
                        logout()
                    }
                    Swal.fire("Error deleting!", "Please try again", "error");
                    toastr.error(err.message, 'Error Alert')
                }
            });
        }
    })
});

const myFavoriteComic = () => {
    comicTable()
    $('#dashboardPage').show();
    $('#comicContent').show();
    $('#characterContent').hide();
    $('#dasboardContent').hide();
    $('#loginPage').hide();
    $('#registerPage').hide();
}

const myFavoriteCharacter = () => {
    characterTable()
    $('#dashboardPage').show();
    $('#characterContent').show();
    $('#comicContent').hide();
    $('#dasboardContent').hide();
    $('#loginPage').hide();
    $('#registerPage').hide();
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
            loginPage()
        },
        error: (err) => {
            err.responseJSON.message.forEach(el => toastr.warning(el, 'Warning Alert'))
        }
    })
})

function handleDoubleClick(id) {
    $(`#heart-${id}`).fadeIn(1000).fadeOut(1000)
    $.ajax({
        method: "POST",
        url: `${baseUrl}/characters/add`,
        headers: { "access_token": localStorage.access_token },
        data: { character_id: id },
        success: (data) => {
            toastr.success(data.message, 'Success Alert')
        },
        error: (err) => {
            toastr.warning(err.responseJSON.message, 'Warning Alert')
        }
    })
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(foundLocation);

    function foundLocation(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        localStorage.lat = lat
        localStorage.lon = lon
    }
}

function getWeather() {
    const { lat, lon } = localStorage
    const latitude = lat || -6.2146
    const longitude = lon || 106.8451
    $.ajax({
            method: 'GET',
            url: `${baseUrl}/weather/${latitude}/${longitude}`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(response => {
            $('#header-location').text(response.name)
            $('#header-temp').text(Math.floor(response.main.temp))
            $('#header-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`)
            $('#header-weather').text(response.weather[0].main)
        })
        .fail(err => console.log(err))
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