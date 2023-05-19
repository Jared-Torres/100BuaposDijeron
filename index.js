let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

window.onload = function () {

};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

let Par1;
let Par2;
let Par3;
let Par4;

let scoreE1 = 0;
let scoreE2 = 0;

let error = 0;
let aciertos = 0;

let turnoE1;

let scoreR = 0;

let scoreF1 = 0;
let scoreF2 = 0;
let firsWin = true;
let cont = 0;
let robo = false;

function iniciar() {
  document.getElementById("Bienvenida").style.display = "none";
  cambiarEstilo("Equipo1", "display: block;     width: 98vw; height: 97vh; display: inline-flex; flex-direction: column; justify-content: center; align-items: center;");


  //escogerPreguntaAleatoria();
}

function AgregarE1() {
  Par1 = document.getElementById('nombre-input').value;
  Par2 = document.getElementById('nombre-input2').value;
  cambiarEstilo("Equipo1", "display: none");
  cambiarEstilo("Equipo2", "display: block;     width: 98vw; height: 97vh; display: inline-flex; flex-direction: column; justify-content: center; align-items: center;");

}

function AgregarE2() {
  Par3 = document.getElementById('nombre-input3').value;
  Par4 = document.getElementById('nombre-input4').value;
  cambiarEstilo("Equipo2", "display: none");
  InicioRonda();



}

function InicioRonda() {
  error = 0;
  aciertos = 0;
  scoreR = 0;
  robo = false;
  cont = 0;
  firsWin = true;
  scoreF1 = 0;
  scoreF2 = 0;

  document.getElementById('preg').style.display = "none";
  document.getElementById('BotonInicio').style.display = "block";
  cambiarEstilo("preguntas", "display: block;     width: 98vw; height: 97vh; display: inline-flex; flex-direction: column; justify-content: center; align-items: center;");

  document.getElementById('Par1').textContent = Par1;
  document.getElementById('Par2').textContent = Par2;
  document.getElementById('Par3').textContent = Par3;
  document.getElementById('Par4').textContent = Par4;
  document.getElementById('score1').textContent = scoreE1;
  document.getElementById('score2').textContent = scoreE2;
  base_preguntas = readText("NuevoJson.json");
  interprete_bp = JSON.parse(base_preguntas);
  escogerPreguntaAleatoria();
  // Función para manejar el evento de teclado
  function teclaPresionada(event) {
    if (event.key === "a" || event.key === "A") {
      Swal.fire({
        html: '<div class="image-container">' +
          '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
          '<p class="image-text">TURNO EQUIPO 1</p>' +
          '</div>',
        showConfirmButton: false,
        showCancelButton: false,
        background: 'transparent',
        allowOutsideClick: true
      });

      setTimeout(function () {
        Swal.close();
      }, 2000);
      turnoE1 = true;
      document.getElementById('iniciador').textContent = "TURNO EQUIPO 1";
      document.getElementById("BotonInicio").style.display = "none";
      document.getElementById('preg').style.display = "block";

      window.removeEventListener('keydown', teclaPresionada);

    } else if (event.key === "l" || event.key === "L") {
      Swal.fire({
        html: '<div class="image-container">' +
          '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
          '<p class="image-text">TURNO EQUIPO 2</p>' +
          '</div>',
        showConfirmButton: false,
        showCancelButton: false,
        background: 'transparent',
        allowOutsideClick: true
      });

      setTimeout(function () {
        Swal.close();
      }, 2000);
      turnoE1 = false;
      document.getElementById('iniciador').textContent = "TURNO EQUIPO 2";
      document.getElementById("BotonInicio").style.display = "none";
      document.getElementById('preg').style.display = "block";

      window.removeEventListener('keydown', teclaPresionada);

    }
  }

  // Asignar el evento de teclado a la ventana
  window.addEventListener('keydown', teclaPresionada);


}

function cambiarEstilo(elementoId, estilo) {
  var elemento = document.getElementById(elementoId);
  elemento.style.cssText = estilo;
}

function escogerPreguntaAleatoria() {
  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    if (n >= interprete_bp.length) {
      n = 0;
    }
  }
  if (preguntas_hechas == 2) {
    resultadoFinal = "";
    //Aquí es donde el juego se reinicia
    if (mostrar_pantalla_juego_términado) {
      if (scoreE1 > scoreE2) {
        resultadoFinal = "GANA EQUIPO 1 CON " + scoreE1;
      }
      else {
        resultadoFinal = "GANA EQUIPO 2 CON " + scoreE2;
      }
      Swal.fire({
        html: '<div class="image-container">' +
          '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
          '<p class="image-text">' + resultadoFinal + '</p>' +
          '</div>',
        showConfirmButton: false,
        showCancelButton: false,
        background: 'transparent',
        allowOutsideClick: true
      });

      setTimeout(function () {
        Swal.close();
      }, 5000);
    }
    if (reiniciar_puntos_al_reiniciar_el_juego) {
      error = 0;
      aciertos = 0;
      scoreR = 0;
      robo = false;
      cont = 0;
      firsWin = true;
      scoreF1 = 0;
      scoreF2 = 0;
      scoreE1 = 0;
      scoreE2 = 0;
      preguntas_correctas = 0
      preguntas_hechas = 0
      error = 0;
      aciertos = 0;
      scoreR = 0;

      document.getElementById("preguntas").style.display = "none";
      document.getElementById("Bienvenida").style.display = "BLOCK";

    }
    npreguntas = [];
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("pregunta2").innerHTML = pregunta.pregunta;
  document.getElementById('res1').textContent = "";
  document.getElementById('res2').textContent = "";
  document.getElementById('res3').textContent = "";
  document.getElementById('res4').textContent = "";
  document.getElementById('iniciador').textContent = "";
  document.getElementById('score1').textContent = scoreE1;
  document.getElementById('score2').textContent = scoreE2;
  document.getElementById('ronda').textContent = scoreR;
  let pc = preguntas_correctas;

}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta1,
    pregunta.respuesta2,
    pregunta.respuesta3,
    pregunta.respuesta4,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn() {

  respuesta = document.getElementById('res').value;
  document.getElementById('res').value = "";
  let scoreA = 0;

  if (comprobarRespuesta(respuesta, pregunta.respuesta1)) {
    document.getElementById('res1').textContent = pregunta.respuesta1 + " " + pregunta.Puntaje1;
    scoreA = parseInt(pregunta.Puntaje1);
    scoreR = scoreR + scoreA;
    document.getElementById('ronda').textContent = scoreR;
    aciertos++;
  } else {
    if (comprobarRespuesta(respuesta, pregunta.respuesta2)) {
      document.getElementById('res2').textContent = pregunta.respuesta2 + " " + pregunta.Puntaje2;
      scoreA = parseInt(pregunta.Puntaje2);
      scoreR = scoreR + scoreA;
      document.getElementById('ronda').textContent = scoreR;
      aciertos++;
    } else {
      if (comprobarRespuesta(respuesta, pregunta.respuesta3)) {
        document.getElementById('res3').textContent = pregunta.respuesta3 + " " + pregunta.Puntaje3;
        scoreA = parseInt(pregunta.Puntaje3);
        scoreR = scoreR + scoreA;
        document.getElementById('ronda').textContent = scoreR;
        aciertos++;
      } else {
        if (comprobarRespuesta(respuesta, pregunta.respuesta4)) {
          document.getElementById('res4').textContent = pregunta.respuesta4 + " " + pregunta.Puntaje4;
          scoreA = parseInt(pregunta.Puntaje4);
          scoreR = scoreR + scoreA;
          document.getElementById('ronda').textContent = scoreR;
          aciertos++;
        }
        else {
          error++;
          var terror = "";
          for (var i = 0; i < error; i++) {
            terror = terror + " X ";
          }
          Swal.fire({
            html: '<div class="image-container">' +
              '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
              '<p class="image-text">' + terror + '</p>' +
              '</div>',
            showConfirmButton: false,
            showCancelButton: false,
            background: 'transparent',
            allowOutsideClick: true
          });

          setTimeout(function () {
            Swal.close();
          }, 2000);
        }
      }
    }

  }

  if (firsWin) {
    if (cont < 2) {
      if (turnoE1) {
        scoreF1 = scoreA;
        turnoE1 = false;
        if (cont < 1) {
          document.getElementById('iniciador').textContent = "TURNO EQUIPO 2";
          Swal.fire({
            html: '<div class="image-container">' +
              '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
              '<p class="image-text">TURNO EQUIPO 2</p>' +
              '</div>',
            showConfirmButton: false,
            showCancelButton: false,
            background: 'transparent',
            allowOutsideClick: true
          });

          setTimeout(function () {
            Swal.close();
          }, 2000);
        }

      }
      else {
        scoreF2 = scoreA;
        turnoE1 = true;
        if (cont < 1) {
          document.getElementById('iniciador').textContent = "TURNO EQUIPO 1";
          Swal.fire({
            html: '<div class="image-container">' +
              '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
              '<p class="image-text">TURNO EQUIPO 1</p>' +
              '</div>',
            showConfirmButton: false,
            showCancelButton: false,
            background: 'transparent',
            allowOutsideClick: true
          });

          setTimeout(function () {
            Swal.close();
          }, 2000);
        }
      }
      cont++;
    }
    if (cont >= 2) {
      if (scoreF1 > scoreF2) {
        document.getElementById('iniciador').textContent = "TURNO EQUIPO 1";
        Swal.fire({
          html: '<div class="image-container">' +
            '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
            '<p class="image-text">RONDA EQUIPO 1</p>' +
            '</div>',
          showConfirmButton: false,
          showCancelButton: false,
          background: 'transparent',
          allowOutsideClick: true
        });

        setTimeout(function () {
          Swal.close();
        }, 2000);
        turnoE1 = true;
        firsWin = false;
      }
      if (scoreF2 > scoreF1) {
        document.getElementById('iniciador').textContent = "TURNO EQUIPO 2";
        Swal.fire({
          html: '<div class="image-container">' +
            '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
            '<p class="image-text">RONDA EQUIPO 2</p>' +
            '</div>',
          showConfirmButton: false,
          showCancelButton: false,
          background: 'transparent',
          allowOutsideClick: true
        });

        setTimeout(function () {
          Swal.close();
        }, 2000);
        turnoE1 = false;
        firsWin = false;
      }
      if (scoreF2 == scoreF1) {

        if (turnoE1) {
          document.getElementById('iniciador').textContent = "TURNO EQUIPO 1";
          Swal.fire({
            html: '<div class="image-container">' +
              '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
              '<p class="image-text">TURNO EQUIPO 1</p>' +
              '</div>',
            showConfirmButton: false,
            showCancelButton: false,
            background: 'transparent',
            allowOutsideClick: true
          });

          setTimeout(function () {
            Swal.close();
          }, 3000);
        }
        else {
          document.getElementById('iniciador').textContent = "TURNO EQUIPO 2";
          Swal.fire({
            html: '<div class="image-container">' +
              '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
              '<p class="image-text">TURNO EQUIPO 2</p>' +
              '</div>',
            showConfirmButton: false,
            showCancelButton: false,
            background: 'transparent',
            allowOutsideClick: true
          });

          setTimeout(function () {
            Swal.close();
          }, 3000);
        }
        cont = 0;
      }


      error = 0;

    }


  }

  if (error == 4) {
    if (turnoE1) {
      turnoE1 = false;
    }
    else {
      turnoE1 = true;
    }
    if (turnoE1) {
      scoreE1 = scoreR + scoreE1;
    }
    else {
      scoreE2 = scoreR + scoreE2;
    }
    InicioRonda();
    firsWin = true;
    cont = 0;
  }

  if (aciertos == 4) {
    if (turnoE1) {
      scoreE1 = scoreR + scoreE1;
    }
    else {
      scoreE2 = scoreR + scoreE2;
    }
    InicioRonda();
    firsWin = true;
    cont = 0;
  }

  if (error == 2) {
    if (turnoE1) {
      Swal.fire({
        html: '<div class="image-container">' +
          '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
          '<p class="image-text">PREPARESE ROBO DE PUNTOS</p>' +
          '</div>',
        showConfirmButton: false,
        showCancelButton: false,
        background: 'transparent',
        allowOutsideClick: true
      });

      setTimeout(function () {
        Swal.close();
      }, 3000);
    }
    else {
      Swal.fire({
        html: '<div class="image-container">' +
          '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
          '<p class="image-text">PREPARESE ROBO DE PUNTOS</p>' +
          '</div>',
        showConfirmButton: false,
        showCancelButton: false,
        background: 'transparent',
        allowOutsideClick: true
      });

      setTimeout(function () {
        Swal.close();
      }, 3000);
    }
  }

  if (error == 3 && robo == false) {
    if (turnoE1) {
      document.getElementById('iniciador').textContent = "TURNO EQUIPO 2";
      Swal.fire({
        html: '<div class="image-container">' +
          '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
          '<p class="image-text">EQUIPO 2 ROBO DE PUNTOS</p>' +
          '</div>',
        showConfirmButton: false,
        showCancelButton: false,
        background: 'transparent',
        allowOutsideClick: true
      });

      setTimeout(function () {
        Swal.close();
      }, 3000);
      turnoE1 = false;
    }
    else {
      document.getElementById('iniciador').textContent = "TURNO EQUIPO 1";
      Swal.fire({
        html: '<div class="image-container">' +
          '<img src="assets/img/MARCADORES.png" alt="Imagen">' +
          '<p class="image-text">EQUIPO 1 ROBO DE PUNTOS</p>' +
          '</div>',
        showConfirmButton: false,
        showCancelButton: false,
        background: 'transparent',
        allowOutsideClick: true
      });

      setTimeout(function () {
        Swal.close();
      }, 3000);
      turnoE1 = true;
    }
    robo = true;
  } else {
    if (error == 3 && robo == true) {
      if (turnoE1) {
        scoreE1 = scoreR + scoreE1;
      }
      else {
        scoreE2 = scoreR + scoreE2;
      }
      InicioRonda();
      firsWin = true;
      cont = 0;
      robo = false;
    }
  }


  /*if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++;
    scoreR = scoreR + 10;
    document.getElementById('ronda').textContent = scoreR;
    
    btn_correspondiente[i].style.background = "lightgreen";
  } else {
    btn_correspondiente[i].style.background = "pink";
    error++;
    document.getElementById('error').textContent = error;
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }*/
  document.getElementById('score1').textContent = scoreE1;
  document.getElementById('score2').textContent = scoreE2;
  //setTimeout(() => { reiniciar(); }, 3000);
}

function comprobarRespuesta(respuestaUsuario, respuestaCorrecta) {
  // Convertir ambas respuestas a minúsculas para evitar errores de mayúsculas y minúsculas
  const respuestaUsuarioMin = respuestaUsuario.toLowerCase();
  const respuestaCorrectaMin = respuestaCorrecta.toLowerCase();

  // Eliminar espacios en blanco adicionales alrededor de la respuesta del usuario
  const respuestaUsuarioLimpia = respuestaUsuarioMin.trim();
  const respuestaCorrectaLimpia = respuestaCorrectaMin.trim();

  // Verificar si la respuesta del usuario coincide exactamente con la respuesta correcta
  if (respuestaUsuarioLimpia === respuestaCorrectaLimpia) {
    return true; // Respuesta correcta
  }

  // Verificar si la respuesta del usuario contiene la respuesta correcta con un margen de error
  if (respuestaCorrectaMin.includes(respuestaUsuarioLimpia)) {
    return true; // Respuesta aceptada con errores de escritura
  }

  return false; // Respuesta incorrecta
}

// let p = prompt("numero")

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}


