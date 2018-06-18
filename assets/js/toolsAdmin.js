// Used to manage certain functions for the administrator view 
toolsAdmin = {
    showNotificationAdmin: function (Type, Message) { // function used to show a little panel of notifications
        type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

        $.notify({
            icon: "notifications",
            message: Message

        }, {
                type: type[Type],
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'center'
                }
            });
    },

    showSwal: function (type, id) {
        var res;
        if (type == 'basic') {
            swal({
                title: id,
                allowOutsideClick: false,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success"
            });

        } else if (type == 'success-message') {
            swal({
                title: "Good job!",
                text: "You clicked the button!",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success"
            });

        } else if (type == 'warning-message-and-confirmation') {
            swal({
                title: '¿Está seguro?',
                text: "Realizar cambios temporales!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                confirmButtonText: 'Aceptar',
                cancelButtonText: "Cancelar",
                allowOutsideClick: false,
                buttonsStyling: false
            }).then(function () {
                swal({
                    title: 'Acción realizada!',
                    text: 'Los cambios serán efectuados de manera permanente cuando guarde todos los cambios.',
                    type: 'success',
                    allowOutsideClick: false,
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                });
                res = "true";
            }
            ).catch(function () {
                res = "false";
            }).then(() => {
                document.getElementById(id).value = res;
            });

        } else if (type == 'auto-close') {
            swal({
                title: "Mensaje!",
                text: id,
                type: 'success',
                allowOutsideClick: false,
                timer: 2000,
                showConfirmButton: false
            });
        } else if (type == 'input-field') {
            swal({
                title: 'Input something',
                html: '<div class="form-group">' +
                    '<input id="input-field" type="text" class="form-control" />' +
                    '</div>',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (result) {
                swal({
                    type: 'success',
                    html: 'You entered: <strong>' +
                        $('#input-field').val() +
                        '</strong>',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false

                })
            }).catch(swal.noop)
        }
    }


};