"use strict";

//DECLARACION DE VARIABLES
// #region
let datos = {};
let instante;
//.todos los elementos que se crearan para añadir datos a tabla
let tbody = document.querySelector("#tbody");
let tdN = 0;
let tdA = 0;
let tdNif = 0;
let tdTlf = 0;
let tdCumple = 0;
let tdFechaHora = 0;
let tdObservaciones = 0;
let tdOrden = 0;
let orden = 0;
let numerofilas = 0;

//botones de tabla
let tdButtonDelete = "";
let tdButtonModify = "";
let tr = 0;
let claseOrden = document.querySelectorAll("td.orden");

//boton formulario
let submit = document.querySelector(".btn-submit");
let erase = document.getElementById("erase");
let inputs = document.getElementsByClassName("tabla");
//botones tabla
let classDelete = document.getElementsByClassName("delete");
let classModify = document.getElementsByClassName("modify");
//declarando expresiones regulares

let regexpNombre = /[0-9.,-?¿!]/;
let regexpPhone = /[0-9]{9}/;
let regexpDni = /[0-9]{8}[A-Z]$/i;
let regexpNacimiento = /[0-9]{4}\-[0-9]{2}\-[0-9]{2}/;
let regexpFechaHora =
  /[0-9]{4}\-+[0-9]{2}\-+[0-9]{2}[A-Z]{1}[0-9]{2}\:[0-9]{2}/;

//ASOCIANDO HTML CON JS. input fields
let nombre = document.querySelector(".nombre");
let text = document.querySelector(".text");

let apellido = document.querySelector(".apellidos");
let textSurname = document.querySelector(".textSurname");

let telefono = document.querySelector(".telefono");
let textTelefono = document.querySelector(".text-telefono");

let dni = document.querySelector(".dni");
let textDni = document.querySelector(".textDni");

let fechaNacimiento = document.querySelector(".fechaNacimiento");
let textNacimiento = document.querySelector(".textNacimiento");

let fechaHora = document.querySelector(".fecha-hora");
let textFechaHora = document.querySelector(".textFechaHora");

let observaciones = document.querySelector(".observaciones");
let textObservaciones = document.querySelector(".textObservaciones");

let formulario = document.querySelector(".formulario");

let campoVacio = document.querySelector(".campoVacio");
let idUnico = 0;
// #endregion

//SI LA TABLA ESTÁ VACIA MUESTRA UNA FILA DE CELDAS

function emptyTable() {
  console.log("entra en emptytable()");
  if (numerofilas <= 0) {
    campoVacio.classList.remove("hidden");
    numerofilas = 0;
  } else {
    campoVacio.classList.add("hidden");
  }
}

/*
? con esta funcion obtenemos los valores almacenados. cosas a tener en cuenta: hay que recorrer el localStorage, para ello lo primero es obtener la clave de cada posicion.
! OJO! gran fallo que me lleva a confusión, estamos trabajando con un objeto por lo que cambia la nomenclatura a la hora de acceder a sus elementos. en el caso de los objetos (asociacion clave-valor). la expresion para acceder a una clave (por ejemplo el identificador unico empleado a partir de Date()) es localStorage.key(i). de esta forma estamos accediendo a todos los elementos key y, dentro de estos recorrer su posicion. Hay que recordar que en un objeto, la posicion se establece por el nombre de la clave y no por el indice.
?  a la hora de almacenarlo se convirtio en cadena de texto JSON, al acceder a el, es recomendable reconvertirlo al formato inicial . por último simplemente se recorre cada clave y se agrega al html
*/

function loadSaveData() {
  let totalDatos = localStorage.length;
  for (let i = 0; i < totalDatos; i++) {
    let datosRestaurado = {};
    let clave = localStorage.key(i);
    console.log(`clave ${localStorage.key(0)}`);
    let dato = localStorage.getItem(clave);
    let dato1 = JSON.parse(dato);
    console.log(dato1); //al ser recuperado como un string debe ser pasado a JSON
    console.log(dato1.nombre);
    console.log(totalDatos);
    console.log(typeof dato);
    datosRestaurado[clave] = dato1;
    console.log(
      `valor de tabla que almacena datos guardados ${datosRestaurado[clave].nombre}` //es un string
    );

    /*
! aqui empieza lo que seria la funcion addSavedToTable
 */

    orden++;
    tr = document.createElement("tr");
    tr.setAttribute("contenteditable", "true");
    tr.className = ` fila`;
    tr.id = `${clave}`;

    tdN = document.createElement("td");
    let getNombre = datosRestaurado[clave]; //!paramRestored es la fila recuperada del JSON apunta al localStorage(clave). creo que el parse no es necesario, lo que era necesario es reasociar la variable instanciada en la funcion que anida a esta (ese era el fallo)
    console.log(getNombre.nombre);
    tdN.textContent = getNombre.nombre;

    console.log(
      `el tipo de datos es ${typeof getNombre.nombre} y del conjunto de daots ${typeof datosRestaurado} y ${typeof paramRestored}`
    );

    tdN.id = "nombreT";

    tdA = document.createElement("td");
    tdA.textContent = getNombre.apellido;

    tdNif = document.createElement("td");
    tdNif.textContent = getNombre.nif;

    tdTlf = document.createElement("td");
    tdTlf.textContent = getNombre.telefono;

    tdCumple = document.createElement("td");
    tdCumple.textContent = getNombre.fechacumplee;

    tdFechaHora = document.createElement("td");
    tdFechaHora.textContent = getNombre.fechacita;

    tdObservaciones = document.createElement("td");
    tdObservaciones.textContent = getNombre.observacion;

    tdOrden = document.createElement("td");
    tdOrden.textContent = `${orden}`;
    tdOrden.className = "orden";
    //CREA LOS BOTONES PARA LA FILA DE LA TABLA
    tdButtonDelete = document.createElement("button");
    tdButtonDelete.setAttribute("type", "reset");
    tdButtonDelete.textContent = "borrar";
    tdButtonDelete.className = `delete`;

    tdButtonModify = document.createElement("button");
    tdButtonModify.setAttribute("type", "button");
    tdButtonModify.textContent = "modificar";
    tdButtonModify.className = "modify";

    //UNIMOS LO CREADO
    tbody.appendChild(tr);

    tr.appendChild(tdN);
    tr.appendChild(tdA);
    tr.appendChild(tdNif);
    tr.appendChild(tdTlf);
    tr.appendChild(tdCumple);
    tr.appendChild(tdFechaHora);
    tr.appendChild(tdObservaciones);
    tr.appendChild(tdOrden);
    tr.appendChild(tdButtonDelete);
    tr.appendChild(tdButtonModify);

    console.log("entra en addToTable()");
    emptyTable();
    modifyButton();
    setOrden();

    //addSavedToTable(paramRestored, clave);
    console.log("entra en loadSaveData");
    numerofilas++;
    console.log(`el numero de filas es: ${numerofilas}`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  deleteBtn();
});

loadSaveData();

//comprueba si hay algun error en los datos enviados. WORKS, NO REQUIERE NADA MAS, NO PRESENTA FUNCION ANIDADA
function PressSubmit() {
  if (regexpNombre.test(nombre.value) === true || !nombre.value) {
    nombre.style.border = "3px solid red";
    text.classList.remove("hidden");
  } else {
    text.classList.add("hidden");
    nombre.style.border = "none";
  }

  if (regexpNombre.test(apellido.value) === true || !apellido.value) {
    apellido.style.border = "3px solid red";
    textSurname.classList.remove("hidden");
  } else {
    textSurname.classList.add("hidden");
    apellido.style.border = "none";
  }

  if (regexpPhone.test(telefono.value) === false) {
    telefono.style.border = "3px solid red";
    textTelefono.classList.remove("hidden");
  } else {
    textTelefono.classList.add("hidden");
    telefono.style.border = "none";
  }
  if (regexpDni.test(dni.value) === false) {
    dni.style.border = "3px solid red";
    textDni.classList.remove("hidden");
  } else {
    textDni.classList.add("hidden");
    dni.style.border = "none";
  }
  if (regexpNacimiento.test(fechaNacimiento.value) === false) {
    fechaNacimiento.style.border = "3px solid red";
    textNacimiento.classList.remove("hidden");
  } else {
    textNacimiento.classList.add("hidden");
    fechaNacimiento.style.border = "none";
  }
  if (regexpFechaHora.test(fechaHora.value) === false) {
    fechaHora.style.border = "3px solid red";
    textFechaHora.classList.remove("hidden");
  } else {
    textFechaHora.classList.add("hidden");
    fechaHora.style.border = "none";
  }
  if (observaciones.value.length < 15) {
    observaciones.style.border = "3px solid red";
    textObservaciones.classList.remove("hidden");
  } else {
    textObservaciones.classList.add("hidden");
    observaciones.style.border = "none";
  }
}
pressErase();
function pressErase() {
  inputs = document.getElementsByClassName("tabla");
  erase.addEventListener("click", function () {
    console.log("pulso erase button");
    console.log(typeof inputs[0]);
    inputs = document.getElementsByClassName("tabla");
    for (let i = 0; i < inputs.length; i++) {
      console.log(inputs[i].classList.contains("fechaNacimiento"));
      if (inputs[i].classList.contains("fechaNacimiento") === true) {
        inputs[i].value = "yyyy-MM-dd";
      } else if (inputs[i].classList.contains("fecha-hora") === true) {
        inputs[i].value = "yyyy-MM-ddThh:mm";
      } else {
        console.log(`valor antes de modificar ${inputs[i].value}`);
        inputs[i].value = "";
        console.log(`valor tras modificar ${inputs[i].value}`);
      }

      var changeEvent = new Event("change", { bubbles: true });
      inputs[i].dispatchEvent(changeEvent);
    }
  });
}

// nombre = document.querySelector(".nombre");
// apellido = document.querySelector(".apellidos");
// telefono = document.querySelector(".telefono");
// dni = document.querySelector(".dni");
// fechaNacimiento = document.querySelector(".fechaNacimiento");
// fechaHora = document.querySelector(".fecha-hora");
// observaciones = document.querySelector(".observaciones");
// formulario = document.querySelector(".formulario");
// campoVacio = document.querySelector(".campoVacio");

//!NUEVA PARTE: ENVIO DE DATOS A TABLA

//ADDDATA ALMACENA LOS DATOS EN EL OBJETO DATOS, SUMA 1 A ORDEN.
//!tiene dos funciones anidadas:emptyTable//addtotable
function addData() {
  if (
    textObservaciones.classList.contains("hidden") &
    text.classList.contains("hidden") &
    textSurname.classList.contains("hidden") &
    textTelefono.classList.contains("hidden") &
    textDni.classList.contains("hidden") &
    textNacimiento.classList.contains("hidden") &
    textFechaHora.classList.contains("hidden")
  ) {
    instante = new Date();
    idUnico = instante.getTime();
    datos[idUnico] = {
      nombre: nombre.value,
      apellido: apellido.value,
      nif: dni.value,
      telefono: telefono.value,
      fechacumplee: fechaNacimiento.value,
      fechacita: fechaHora.value,
      observacion: observaciones.value,
    };

    console.log("entra en addData() y muestro lo generado en addData");
    console.log(JSON.stringify(idUnico));
    console.log(datos[idUnico]);

    localStorage.setItem(`${idUnico}`, JSON.stringify(datos[idUnico]));

    addToTable();
  } else {
    console.log("aun hay errores en el formulario");
  }
}

function addToTable() {
  //CREA LOS <TD> Y <TR>
  orden++;
  tr = document.createElement("tr");
  tr.setAttribute("contenteditable", "true");
  tr.className = `${nombre.value} fila`;
  tr.id = `${idUnico}`;

  tdN = document.createElement("td");
  tdN.textContent = datos[idUnico].nombre;
  tdN.id = "nombreT";

  tdA = document.createElement("td");
  tdA.textContent = datos[idUnico].apellido;

  tdNif = document.createElement("td");
  tdNif.textContent = datos[idUnico].nif;

  tdTlf = document.createElement("td");
  tdTlf.textContent = datos[idUnico].telefono;

  tdCumple = document.createElement("td");
  tdCumple.textContent = datos[idUnico].fechacumplee;

  tdFechaHora = document.createElement("td");
  tdFechaHora.textContent = datos[idUnico].fechacita;

  tdObservaciones = document.createElement("td");
  tdObservaciones.textContent = datos[idUnico].observacion;

  tdOrden = document.createElement("td");
  tdOrden.textContent = `${orden}`;
  tdOrden.className = "orden";
  numerofilas++;
  console.log(
    `el valor de fila tras añadir elemento a tabla es ${numerofilas}`
  );

  //CREA LOS BOTONES PARA LA FILA DE LA TABLA
  tdButtonDelete = document.createElement("button");
  tdButtonDelete.setAttribute("type", "reset");
  tdButtonDelete.textContent = "borrar";
  tdButtonDelete.className = `delete`;
  tdButtonDelete.id = `${nombre.value}`;

  tdButtonModify = document.createElement("button");
  tdButtonModify.setAttribute("type", "button");
  tdButtonModify.textContent = "modificar";
  tdButtonModify.className = "modify";

  //UNIMOS LO CREADO
  tbody.appendChild(tr);

  tr.appendChild(tdN);
  tr.appendChild(tdA);
  tr.appendChild(tdNif);
  tr.appendChild(tdTlf);
  tr.appendChild(tdCumple);
  tr.appendChild(tdFechaHora);
  tr.appendChild(tdObservaciones);
  tr.appendChild(tdOrden);
  tr.appendChild(tdButtonDelete);
  tr.appendChild(tdButtonModify);

  console.log("entra en addToTable()");
  emptyTable();
  deleteBtn();
  modifyButton();
  setOrden();
}

function deleteBtn() {
  console.log("entra en deletebtn()");
  Array.from(classDelete).forEach(function (boton) {
    boton.addEventListener("click", function () {
      classDelete = document.getElementsByClassName("delete");
      var fila = boton.closest("tr");
      fila.remove();
      numerofilas -= 1;
      orden--;
      console.log(
        `se pulso el boton borrar, muestro el valor de orden antes de ejecutar setOrden() ${orden}`
      );
      console.log(
        `el valor de fila tras pulsar boton delete es ${numerofilas}`
      );
      //fila.parentNode.removeChild(fila); // Remove the row after updating values
      setOrden();
      //var padre = fila.parentNode;
      console.log(numerofilas);

      console.log(fila);
      emptyTable();
    });
  });
}

/* 
? en modify button. 

? 1º Hemos establecido una clase comun a todos los botones y los recorremos con un forEach(previa conversion del elemento obtenido en un array (el elemento (que apunta a un html) contiene un conjunto de etiquetas que son hijas de el. Se coge cada unos de los elementos que recorre el foreach(osea cada boton) y se declara a su padre(es toda la fila <tr>), luego obtenemos el id de la fila (este id coincide con el nombre establecido como titulo al volcar los valores del formulario en el JSON y en localStorage). obtenemos el archivo almacenado en localStorage, y lo transformamos en un JSON (este objeto permite acceder a las etiquetas hijas,como si fuesen propiedades del elemento (notacion "." o corchetes e indicando su id)(realmente es que se han convertido en propiedades al ponerlo en formato JSON)). se accede indicando el nombre a traves del id del elemento tr.

 */
function modifyButton() {
  classModify = document.getElementsByClassName("modify");
  Array.from(classModify).forEach(function (boton) {
    boton.addEventListener("click", function () {
      //actualizacion de VALORES
      classModify = document.getElementsByClassName("modify");

      //estas variables apuntan a formulario
      nombre = document.querySelector(".nombre");
      apellido = document.querySelector(".apellidos");
      telefono = document.querySelector(".telefono");
      dni = document.querySelector(".dni");
      fechaNacimiento = document.querySelector(".fechaNacimiento");
      fechaHora = document.querySelector(".fecha-hora");
      observaciones = document.querySelector(".observaciones");

      var fila = boton.parentNode;
      var idFila = fila.id;
      var datosFila = JSON.parse(localStorage.getItem(`${idFila}`));
      console.log(typeof datosFila);
      console.log(datosFila);
      console.log(JSON.stringify(datosFila));

      //vinculacion del input del formulario con el dato almacenado en el JSON
      nombre.value = datosFila.nombre;
      apellido.value = datosFila["apellido"];
      dni.value = datosFila["nif"];
      telefono.value = datosFila["telefono"];
      fechaNacimiento.value = datosFila["fechacumplee"];
      fechaHora.value = datosFila["fechacita"];
      observaciones.value = datosFila["observacion"];
    });
  });
}

/* 
? establecer un bucle que recorra todos los elementos orden (para ello, indicar una clase para todos los elementos orden que se creen.) en el bucle, i<el valor de orden. para cada orden recorrido establecer textContent=i; ejecutarlo cada vez que se agregue un elemento y cada vez que se elimine. solucionado, el problema era que la nodeList es un objeto estatioc por lo que era necesario actualizarlo previo a la ejecucion de su metodo.
*/

function setOrden() {
  claseOrden = document.querySelectorAll("td.orden"); // Update the NodeList
  for (let i = 0; i < claseOrden.length; i++) {
    claseOrden[i].textContent = `${i + 1}`; // Start from 1 instead of 0
    console.log(
      `muestra el valor de cada elemento en clase orden (recorre nodelist) ${claseOrden[i].textContent}`
    );
  }
  emptyTable();
}

//!FIN
