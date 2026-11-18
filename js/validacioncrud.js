var indiceEditar = -1;

$(document).ready(function() {
    $(".error").hide();
    $("#mensajeExito").hide();

    mostrarRegistros();

    $("#nombre").blur(function() {
        if ($(this).val().trim() == "") {
            $("#errorNombre").show();
        } else {
            $("#errorNombre").hide();
        }
    });

    $("#apellido").blur(function() {
        if ($(this).val().trim() == "") {
            $("#errorApellido").show();
        } else {
            $("#errorApellido").hide();
        }
    });

    $("#fecha_nacimiento").blur(function() {
        if ($(this).val() == "") {
            $("#errorFecha").show();
        } else {
            $("#errorFecha").hide();
        }
    });

    $("#genero").blur(function() {
        if ($(this).val() == "") {
            $("#errorGenero").show();
        } else {
            $("#errorGenero").hide();
        }
    });

    $("#telefono").blur(function() {
        if ($(this).val().trim() == "") {
            $("#errorTelefono").show();
        } else {
            $("#errorTelefono").hide();
        }
    });

    $("#email").blur(function() {
        if ($(this).val().trim() == "") {
            $("#errorEmail").show();
        } else {
            $("#errorEmail").hide();
        }
    });

    $("#tipo_pelea").blur(function() {
        if ($(this).val() == "") {
            $("#errorTipoPelea").show();
        } else {
            $("#errorTipoPelea").hide();
        }
    });

    $("#formTorneo").submit(function(event) {
        event.preventDefault();

        var valido = true;

        var nombre = $("#nombre").val().trim();
        var apellido = $("#apellido").val().trim();
        var fecha = $("#fecha_nacimiento").val();
        var genero = $("#genero").val();
        var telefono = $("#telefono").val().trim();
        var email = $("#email").val().trim();
        var nivel = $("input[name='nivel_pelea']:checked").val();
        var tipoPelea = $("#tipo_pelea").val();
        var mensaje = $("#mensaje").val().trim();

        var intereses = [];
        $("input[name='intereses[]']:checked").each(function() {
            intereses.push($(this).val());
        });

        if (nombre == "") { $("#errorNombre").show(); valido = false; } else { $("#errorNombre").hide(); }
        if (apellido == "") { $("#errorApellido").show(); valido = false; } else { $("#errorApellido").hide(); }
        if (fecha == "") { $("#errorFecha").show(); valido = false; } else { $("#errorFecha").hide(); }
        if (genero == "") { $("#errorGenero").show(); valido = false; } else { $("#errorGenero").hide(); }
        if (telefono == "") { $("#errorTelefono").show(); valido = false; } else { $("#errorTelefono").hide(); }
        if (email == "") { $("#errorEmail").show(); valido = false; } else { $("#errorEmail").hide(); }
        if (!nivel) { $("#errorNivel").show(); valido = false; } else { $("#errorNivel").hide(); }
        if (tipoPelea == "") { $("#errorTipoPelea").show(); valido = false; } else { $("#errorTipoPelea").hide(); }

        if (!valido) {
            alert("Por favor, complete todos los campos obligatorios marcados en rojo.");
            return;
        }

        var listaGuerreros = JSON.parse(localStorage.getItem("guerrerosTorneo")) || [];

        var guerrero = {
            nombre: nombre,
            apellido: apellido,
            fecha: fecha,
            genero: genero,
            telefono: telefono,
            email: email,
            nivel: nivel,
            tipoPelea: tipoPelea,
            intereses: intereses,
            mensaje: mensaje != "" ? mensaje : "Sin motivación"
        };

        if (indiceEditar == -1) {
            listaGuerreros.push(guerrero);
            alert("¡Se registró con éxito todo!");
            $("#mensajeExito").text("¡Se registró con éxito todo! El guerrero fue inscrito en el torneo.").fadeIn();
        } else {
            listaGuerreros[indiceEditar] = guerrero;
            indiceEditar = -1;
            $("#btnEnviar").val("Enviar formulario");
            $("#btnCancelar").hide();
            alert("¡Registro actualizado con éxito!");
            $("#mensajeExito").text("¡Los datos del guerrero se actualizaron con éxito!").fadeIn();
        }

        localStorage.setItem("guerrerosTorneo", JSON.stringify(listaGuerreros));

        $("#formTorneo")[0].reset();
        mostrarRegistros();
    });

    $("#btnCancelar").click(function() {
        indiceEditar = -1;
        $("#formTorneo")[0].reset();
        $(".error").hide();
        $("#btnEnviar").val("Enviar formulario");
        $(this).hide();
    });
});

function mostrarRegistros() {
    var listaGuerreros = JSON.parse(localStorage.getItem("guerrerosTorneo")) || [];
    var html = "";

    if (listaGuerreros.length == 0) {
        html = "<tr><td colspan='7' style='text-align:center;'>Aún no hay guerreros inscritos.</td></tr>";
    } else {
        for (var i = 0; i < listaGuerreros.length; i++) {
            var interesesTexto = listaGuerreros[i].intereses.length > 0 ? listaGuerreros[i].intereses.join(", ") : "Ninguno";
            
            html += "<tr>";
            html += "<td>" + listaGuerreros[i].nombre + " " + listaGuerreros[i].apellido + "</td>";
            html += "<td>" + listaGuerreros[i].email + "<br>(" + listaGuerreros[i].telefono + ")</td>";
            html += "<td>" + listaGuerreros[i].nivel + "</td>";
            html += "<td>" + listaGuerreros[i].tipoPelea + "</td>";
            html += "<td>" + interesesTexto + "</td>";
            html += "<td>" + listaGuerreros[i].mensaje + "</td>";
            html += "<td>";
            html += "<button type='button' class='btn-editar' onclick='cargarEdicion(" + i + ")'>Editar</button> ";
            html += "<button type='button' class='btn-eliminar' onclick='eliminarGuerrero(" + i + ")'>Eliminar</button>";
            html += "</td>";
            html += "</tr>";
        }
    }

    $("#tablaGuerreros").html(html);
}

function cargarEdicion(index) {
    var listaGuerreros = JSON.parse(localStorage.getItem("guerrerosTorneo")) || [];
    var g = listaGuerreros[index];

    $("#nombre").val(g.nombre);
    $("#apellido").val(g.apellido);
    $("#fecha_nacimiento").val(g.fecha);
    $("#genero").val(g.genero);
    $("#telefono").val(g.telefono);
    $("#email").val(g.email);
    $("#tipo_pelea").val(g.tipoPelea);
    $("#mensaje").val(g.mensaje == "Sin motivación" ? "" : g.mensaje);

    $("input[name='nivel_pelea'][value='" + g.nivel + "']").prop("checked", true);

    $("input[name='intereses[]']").prop("checked", false);
    for (var j = 0; j < g.intereses.length; j++) {
        $("input[name='intereses[]'][value='" + g.intereses[j] + "']").prop("checked", true);
    }

    $(".error").hide();
    $("#mensajeExito").hide();
    indiceEditar = index;
    $("#btnEnviar").val("Guardar cambios");
    $("#btnCancelar").show();
}

function eliminarGuerrero(index) {
    var listaGuerreros = JSON.parse(localStorage.getItem("guerrerosTorneo")) || [];
    var nombreCompleto = listaGuerreros[index].nombre + " " + listaGuerreros[index].apellido;

    if (confirm("¿Está seguro de eliminar la inscripción de " + nombreCompleto + "?")) {
        listaGuerreros.splice(index, 1);
        localStorage.setItem("guerrerosTorneo", JSON.stringify(listaGuerreros));
        mostrarRegistros();
    }
}