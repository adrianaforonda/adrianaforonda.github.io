const baseUrl = "https://spreadsheets.google.com/feeds/list/";
const sheetId = "1qvm_NTbNqe2SiUXnHrUmHCzMBfvhNEsaMpTdKyo_jXs";

const element = function makeElement(tag, properties = '') {
  const el = document.createElement(tag);
  if (properties) {
    Object.keys(properties).forEach((prop) => {
      if (typeof properties[prop] === 'object') {
        Object.keys(properties[prop]).forEach((p) => {
          el[prop][p] = properties[prop][p];
        });
      } else {
        el[prop] = properties[prop];
      }
    });
  }
  return el;
};

const sheets = [1, 2, 3, 4, 5, 6, 7, 8];
let secciones = {};
const body = document.getElementById('article');
let loaded = [];

const makeDom = function() {
  sheets.forEach((sheet) => {
    body.appendChild(secciones[sheet]);
  })
};

const makeSection = function(seccionTitulo, data){

  // Create section
  let seccion = element('div', {className: 'seccion'});
  let titulo;

  switch (seccionTitulo) {

  case "Contact":

    /*
     * Un contacto tiene nombre y detalles de contacto
     * El nombre es el título principal del documento
     */
    
    data.forEach((fila) => {
      let portrait = element('div', {className: 'portrait'});
      portrait.appendChild(element('img', {src: "img/adriana.png"}));
      let nombre = element('h1', {textContent: fila["gsx$nombre"]["$t"]});
      let contacto = element('table', {className: 'contact'});
      let detalles = ['mobile', 'email', 'address', 'city'];

      /*
       * Cada detalle de contacto tiene nombre y contenido
       * El nombre empieza en mayúscula
       */
      
      detalles.forEach((d) => {
	detalle = fila["gsx$"+d]["$t"];
	if (detalle != "") { // existe este detalle?
	  let detalleNodo = element('tr', {className: 'detalle'});
	  let detalleNombre = element('td', {className: 'detalleNombre', textContent: d[0].toUpperCase() + d.substr(1)});
	  let detalleContenido = element('td', {className: 'detalleContenido', textContent: detalle});
	  detalleNodo.appendChild(detalleNombre);
	  detalleNodo.appendChild(detalleContenido);
	  contacto.appendChild(detalleNodo);
	}
      });

      seccion.append(portrait);
      seccion.appendChild(nombre);
      seccion.appendChild(contacto)
      seccion.classList.add('contact')
      	
    });

    return seccion;
    break;

  case "Education":

    titulo = element('h3', {textContent: seccionTitulo});
    seccion.appendChild(titulo);
    data.forEach((fila) => {
      let item = element('div', {className: 'card education'});
      let itemTitulo = element('div', {className: 'cardTitle', textContent: fila["gsx$title"]["$t"]});
      let itemInst = element('div', {className: 'cardContent cardInst'});
      itemInst.appendChild(element('span', {textContent: fila["gsx$institution"]["$t"]}));
      itemInst.appendChild(element('a', {textContent: '⦿', href: fila["gsx$link"]["$t"]}));
      let itemTime = element('div', {className: 'cardContent cardTime', textContent: fila["gsx$time"]["$t"]});
      item.appendChild(itemTitulo);
      item.appendChild(itemInst);
      item.appendChild(itemTime);
      seccion.appendChild(item);
    });

    return seccion;
    break;

  case "Courses":

    titulo = element('h3', {textContent: seccionTitulo});
    seccion.appendChild(titulo);
    data.forEach((fila) => {
      let item = element('div', {className: 'card courses'});
      let itemTitulo = element('div', {className: 'cardTitle', textContent: fila["gsx$course"]["$t"]});
      let itemInst = element('div', {className: 'cardContent cardInst'});
      itemInst.appendChild(element('span', {textContent: fila["gsx$institution"]["$t"]}));
      itemInst.appendChild(element('a', {textContent: '⦿', href: fila["gsx$link"]["$t"]}));
      let itemTime = element('div', {className: 'cardContent cardTime', textContent: fila["gsx$time"]["$t"]});
      item.appendChild(itemTitulo);
      item.appendChild(itemInst);
      item.appendChild(itemTime);
      seccion.appendChild(item);
    });

    return seccion;
    break;

  case "Work Experience":

    titulo = element('h3', {textContent: seccionTitulo});
    seccion.appendChild(titulo);
    data.forEach((fila) => {
      let item = element('div', {className: 'card workexperience'});
      let itemTitulo = element('div', {className: 'cardTitle', textContent: fila["gsx$job"]["$t"]});
      let itemInst = element('div', {className: 'cardContent cardEmployer', textContent: fila["gsx$employer"]["$t"]});
      let itemContext = element('div', {className: 'cardContent cardContext'});
      itemContext.appendChild(element('span', {className: 'cardCity', textContent: fila["gsx$city"]["$t"]}));
      itemContext.appendChild(element('span', {className: 'cardTime', textContent: fila["gsx$time"]["$t"]}));
      let tasks = ['task1', 'task2', 'task3', 'task4', 'task5'];
      let itemTasks = element('div', {className: 'cardContent cardTasks'});
      let taskValue;
      tasks.forEach((task) => {
	taskValue = fila["gsx$"+task]["$t"];
	if (taskValue != "") {
	  itemTask = element('div', {className: 'cardTask', textContent: taskValue});
	  itemTasks.appendChild(itemTask);
	}
      });
      item.appendChild(itemTitulo);
      item.appendChild(itemInst);
      item.appendChild(itemContext);
      item.appendChild(itemTasks);
      seccion.appendChild(item);
      
    });

    return seccion;
    break;

  case "Language Skills":

    titulo = element('h3', {textContent: seccionTitulo});
    seccion.appendChild(titulo);
    let languages = element('table', {className: 'languages'});
    data.forEach((fila) => {
      language = element('tr', {className: 'language'});
      language.appendChild(element('td', {className: 'languageName', textContent: fila["gsx$language"]["$t"]}));
      language.appendChild(element('td', {className: 'languageLevel', textContent: fila["gsx$level"]["$t"]}));
      languages.appendChild(language);
    });

    seccion.appendChild(languages);
    return seccion;
    break;

  case "Computer Skills":

    titulo = element('h3', {textContent: seccionTitulo});
    seccion.appendChild(titulo);
    let computer = element('div', {className: 'computer'});
    data.forEach((fila) => {
      skill = element('div', {className: 'skill', textContent: fila["gsx$skill"]["$t"]});
      computer.appendChild(skill);
    });

    seccion.appendChild(computer);
    return seccion;
    break;

  case "Events":

    titulo = element('h3', {textContent: seccionTitulo});
    seccion.appendChild(titulo);
    data.forEach((fila) => {
      let item = element('div', {className: 'card events'});
      let itemTitulo = element('div', {className: 'cardTitle', textContent: fila["gsx$event"]["$t"]});
      let itemInst = element('div', {className: 'cardContent cardInst', textContent: fila["gsx$organizer"]["$t"]});
      let itemContext = element('div', {className: 'cardContent cardContext'});
      itemContext.appendChild(element('span', {className: 'cardCity', textContent: fila["gsx$city"]["$t"]}))
      itemContext.appendChild(element('span', {className: 'cardTime', textContent: fila["gsx$time"]["$t"]}))
      item.appendChild(itemTitulo);
      item.appendChild(itemInst);
      item.appendChild(itemContext);
      seccion.appendChild(item);
    });

    return seccion;
    break;

  case "Publications":

    titulo = element('h3', {textContent: seccionTitulo});
    seccion.appendChild(titulo);
    data.forEach((fila) => {
      let item = element('div', {className: 'card pub'});
      let itemTitulo = element('div', {className: 'cardTitle', textContent: fila["gsx$title"]["$t"]});
      let itemInst = element('div', {className: 'cardContent cardInst', textContent: fila["gsx$publisher"]["$t"]});
      let itemContext = element('div', {className: 'cardContent cardContext'});
      itemContext.appendChild(element('span', {className: 'cardCity', textContent: fila["gsx$city"]["$t"]}))
      itemContext.appendChild(element('span', {className: 'cardTime', textContent: fila["gsx$time"]["$t"]}))
      item.appendChild(itemTitulo);
      item.appendChild(itemInst);
      item.appendChild(itemContext);
      seccion.appendChild(item);
    });

    return seccion;
    break;
    
  }};

const init = function() {

  /*
   * Descargar datos de cada hoja
   * Construir la sección correspondiente
   * Mostrar las secciones en orden una vez que se hayan construido
   */
  
  sheets.forEach((sheet) => {
    fetch(baseUrl + sheetId + '/' + sheet + '/public/full?alt=json')
      .then(resp => resp.json())
      .then((data) => {

	seccion = makeSection(
	  data.feed.title["$t"],
	  data.feed.entry);
	
	secciones[sheet] = seccion;
	if (Object.keys(secciones).length == sheets.length){
	  makeDom()
	};
	
      })
  })
};

init();
