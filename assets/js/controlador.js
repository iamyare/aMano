//Obteniendo el texto en el elemento con id="input"
const input = document.getElementById("input");
//Obteniendo el texto en el elemento con id="output"
const output = document.getElementById("output");

let unidadMedida = "cm";

//Comprobar sin hay un localStorage llamado "escrito"
if (localStorage.getItem("escrito")) {
	if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
		localStorage.removeItem("escrito");
	}
}

if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
	//comprobamos si hay configuracion en el localStorage
	if (!localStorage.getItem("config")) {
		//Si no hay configuracion, la creamos
		let config = {
			fuentes: ["F1", "F2", "F3", "F4", "F5"],
			sizeFont: 40,
			saltoLinea: 30,
			sizePage: "carta",
			margenArriba: 1,
			margenAbajo: 1,
			margenIzq: 1,
			margenDer: 1,
		};
		//Guardamos la configuracion en el localStorage
		localStorage.setItem("config", JSON.stringify(config));
	}

	//Cargar la configuracion
	let inputSizeFont = document.getElementById("inputSizeFont");
	let inputSaltoLinea = document.getElementById("inputSaltoLinea");
	let inputTamanoPAge = document.getElementById("inputTamanoPAge");
	let inputMargenArriba = document.getElementById("inputMargenArriba");
	let inputMargenAbajo = document.getElementById("inputMargenAbajo");
	let inputMargenIzq = document.getElementById("inputMargenIzq");
	let inputMargenDer = document.getElementById("inputMargenDer");

	//Obtener la configuracion del localStorage
	let config = JSON.parse(localStorage.getItem("config"));
	inputSizeFont.value = config.sizeFont;
	inputSaltoLinea.value = config.saltoLinea;
	inputMargenArriba.value = config.margenArriba;
	inputMargenAbajo.value = config.margenAbajo;
	inputMargenIzq.value = config.margenIzq;
	inputMargenDer.value = config.margenDer;
	//Seleccionar el tamaño de la pagina en el select segun el value
	inputTamanoPAge.value = config.sizePage;
}

let titleOpction = true;

const reescribir = () => {
	tipografiaAleatoria();
};

//Arreglo con las fuentes que se aplicarán aleatoriamente
const fuentes = ["F1", "F2", "F3", "F4", "F5"];

const getConfig = () => {
	let config = JSON.parse(localStorage.getItem("config"));
	return config;
};

//Función que se ejecuta al hacer click en el botón "Aleatorio"
function tipografiaAleatoria() {
	cargarConfig();
	let texto = input.value;

	let lineas = texto.split("\n");

	let parrafoNuevo = "";
	let dentroDeTitulo = false;

	//Verificar si titleOpction es true, y si ejecutar normal
	//si no lo es solo ejecutara formatearParrafo

	lineas.forEach((linea) => {
		let lineaNueva = "";
		if (titleOpction) {
			if (linea.startsWith("###")) {
				dentroDeTitulo = true;
				linea = linea.replace("### ", "");
				lineaNueva = formatearTitulo(linea);
			} else {
				lineaNueva = formatearParrafo(linea);
			}
		} else {
			lineaNueva = formatearParrafo(linea);
		}
		parrafoNuevo += lineaNueva + "<br>";
	});

	output.innerHTML = parrafoNuevo;
	//Guardar en localStorage
	localStorage.setItem("escrito", parrafoNuevo);

	const printModal = new bootstrap.Modal(document.getElementById("print"));
	printModal.show();
}

function formatearTitulo(linea) {
	let lineaNueva = "";
	linea.split("").map((letra) => {
		let letraNueva = `<span class="${
			fuentes[Math.floor(Math.random() * fuentes.length)]
		}">${letra}</span>`;
		lineaNueva += letraNueva;
	});
	lineaNueva = `<span class="titulo">${lineaNueva}</span>`;
	return lineaNueva;
}

function formatearParrafo(linea) {
	let lineaNueva = "";
	linea.split("").map((letra) => {
		let letraNueva = `<span class="${
			fuentes[Math.floor(Math.random() * fuentes.length)]
		}">${letra}</span>`;
		lineaNueva += letraNueva;
	});
	return lineaNueva;
}

//Configuracion
const setConfig = () => {
	//Obtener el valor de los inputs
	let inputFuentes = document.getElementById("inputFuentes").value;
	let inputSizeFont = document.getElementById("inputSizeFont").value;
	let inputSaltoLinea = document.getElementById("inputSaltoLinea").value;
	let inputTamanoPAge = document.getElementById("inputTamanoPAge").value;
	let inputMargenArriba = document.getElementById("inputMargenArriba").value;
	let inputMargenAbajo = document.getElementById("inputMargenAbajo").value;
	let inputMargenIzq = document.getElementById("inputMargenIzq").value;
	let inputMargenDer = document.getElementById("inputMargenDer").value;

	//Comprobar que los valores no esten vacios
	if (
		inputSizeFont == "" ||
		inputSaltoLinea == "" ||
		inputTamanoPAge == "" ||
		inputMargenArriba == "" ||
		inputMargenAbajo == "" ||
		inputMargenIzq == "" ||
		inputMargenDer == ""
	) {
		alert("No puedes dejar los campos vacios");
		return;
	}

	let config = {
		fuentes: ["F1", "F2", "F3", "F4", "F5"],
		sizeFont: inputSizeFont,
		saltoLinea: inputSaltoLinea,
		sizePage: inputTamanoPAge,
		margenArriba: inputMargenArriba,
		margenAbajo: inputMargenAbajo,
		margenIzq: inputMargenIzq,
		margenDer: inputMargenDer,
		unidadMedida: unidadMedida,
		titleOpction: false,
	};

	localStorage.setItem("config", JSON.stringify(config));
	//Ocultar el modal
	const modalConfig = new bootstrap.Modal(document.getElementById("modalConfig"));
	modalConfig.hide();
};

//Agregar fondo a #output
const addBackground = () => {
	//A;adir la clase fondo al elemento con id="output"
	//output.classList.add("fondo");
	window.location.href = "/limpio.html";
};

//Si precionamos las teclas Control + i se ejecuta redireccionara a la pagina de inicio
document.addEventListener("keydown", (e) => {
	if (e.ctrlKey && e.key == "i") {
		//obtener #output
		let output = document.getElementById("output");
		window.location.href = "index.html";
	}
});

if (window.location.pathname == "/limpio.html") {
	//cargar el texto guardado en localStorage
	output.innerHTML = localStorage.getItem("escrito");
	window.onload = () => {
		window.print();
		window.location.href = "index.html";
	};
}

const onChangeUnit = (unidad) => {
	console.log(`Unidad a cambiar: ${unidad}`);
	//Cambiar el texto de la unidad a los elementos con clase "unidadExp"
	let unidades = document.getElementsByClassName("unidadExp");
	for (let i = 0; i < unidades.length; i++) {
		unidades[i].innerHTML = unidad;
	}

	unidadMedida = unidad;
	let dropdownMenuButtonUnidadMedida = document.getElementById("dropdownMenuButtonUnidadMedida");
	dropdownMenuButtonUnidadMedida.innerHTML = unidad;
};

const directorioFuentes = (directorio) => {
	//Cuantos elementos hay en el directorio
	let cantidad = directorio.length;
	console.log(`Cantidad de elementos: ${cantidad}`);

	let inputFuentes = document.getElementById("inputFuentes");
	console.log(inputFuentes.value);
};

//Funcion que carga la configuracion guardada en localStorage
const cargarConfig = () => {
	let config = getConfig();
	output.style.fontSize = `${config.sizeFont}px`;
	output.style.lineHeight = `${config.saltoLinea}px`;
	output.style.width = `${config.sizePage}${config.unidadMedida}`;
	output.style.paddingTop = `${config.margenArriba}${config.unidadMedida}`;
	output.style.paddingBottom = `${config.margenAbajo}${config.unidadMedida}`;
	output.style.paddingLeft = `${config.margenIzq}${config.unidadMedida}`;
	output.style.paddingRight = `${config.margenDer}${config.unidadMedida}`;
	console.log("Configuracion cargada");
};
