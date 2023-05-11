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

let turnoE1;

let scoreR = 0;

function iniciar() {
  cambiarEstilo("Bienvenida", "display: none");
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
  cambiarEstilo("BotonInicio", "display: block;     width: 98vw; height: 97vh; display: inline-flex; flex-direction: column; justify-content: center; align-items: center;");

  // Función para manejar el evento de teclado
  function teclaPresionada(event) {
    if (event.key === "a" || event.key === "A") {
      alert("¡Equipo 1 ha presionado su tecla!");
      turnoE1 = true;
      document.getElementById('iniciador').textContent = "TURNO EQUIPO 1";
      cambiarEstilo("BotonInicio", "display: none");
      cambiarEstilo("preguntas", "display: block;     width: 98vw; height: 97vh; display: inline-flex; flex-direction: column; justify-content: center; align-items: center;");
      document.getElementById('Par1').textContent = Par1;
      document.getElementById('Par2').textContent = Par2;
      document.getElementById('Par3').textContent = Par3;
      document.getElementById('Par4').textContent = Par4;
      document.getElementById('score1').textContent = scoreE1;
      document.getElementById('score2').textContent = scoreE2;
      base_preguntas = readText("base-preguntas.json");
      interprete_bp = JSON.parse(base_preguntas);
      escogerPreguntaAleatoria();
      window.removeEventListener('keydown', teclaPresionada);
    } else if (event.key === "l" || event.key === "L") {
      alert("¡Equipo 2 ha presionado su tecla!");
      turnoE1=false;
      document.getElementById('iniciador').textContent = "TURNO EQUIPO 2";
      cambiarEstilo("BotonInicio", "display: none");
      cambiarEstilo("preguntas", "display: block;     width: 98vw; height: 97vh; display: inline-flex; flex-direction: column; justify-content: center; align-items: center;");
      document.getElementById('Par1').textContent = Par1;
      document.getElementById('Par2').textContent = Par2;
      document.getElementById('Par3').textContent = Par3;
      document.getElementById('Par4').textContent = Par4;
      document.getElementById('score1').textContent = scoreE1;
      document.getElementById('score2').textContent = scoreE2;
      base_preguntas = readText("base-preguntas.json");
      interprete_bp = JSON.parse(base_preguntas);
      escogerPreguntaAleatoria();
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
    //Aquí es donde el juego se reinicia
    if (mostrar_pantalla_juego_términado) {
      if (turnoE1){
        scoreE1 = scoreE1 + scoreR;
        turnoE1 = false;
        document.getElementById('iniciador').textContent = "TURNO EQUIPO 2";
      }
      else{
        scoreE2 = scoreE2 + scoreR;
        turnoE1 = true;
        document.getElementById('iniciador').textContent = "TURNO EQUIPO 1";
      }
      swal.fire({
        title: "Juego finalizado T",
        text:
          "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas),
        icon: "success"
      });
    }
    if (reiniciar_puntos_al_reiniciar_el_juego) {
      preguntas_correctas = 0
      preguntas_hechas = 0
      error = 0;
      scoreR = 0;
    }
    npreguntas = [];
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  document.getElementById('error').textContent = error;
  document.getElementById('score1').textContent = scoreE1;
  document.getElementById('score2').textContent = scoreE2;
  document.getElementById('ronda').textContent = scoreR;
  let pc = preguntas_correctas;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i] == pregunta.respuesta) {
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
  }
  document.getElementById('score1').textContent = scoreE1;
  document.getElementById('score2').textContent = scoreE2;
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
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


