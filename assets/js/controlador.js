//Obteniendo el texto en el elemento con id="input"
const input = document.getElementById("input");
//Obteniendo el texto en el elemento con id="output"
const output = document.getElementById("output");

//Comprobar sin hay un localStorage llamado "escrito"
if (localStorage.getItem("escrito")) {
	if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
		localStorage.removeItem("escrito");
	}
}

let titleOpction = false;

const reescribir = () => {
	tipografiaAleatoria();
};

//Arreglo con las fuentes que se aplicarán aleatoriamente
const fuentes = ["F1", "F2", "F3", "F4", "F5"];

const getConfig = () => {
	if (localStorage.getItem("config")) {
		let config = JSON.parse(localStorage.getItem("config"));
		titleOpction = config.titleOpction;
	}
};

//Función que se ejecuta al hacer click en el botón "Aleatorio"
function tipografiaAleatoria() {
	getConfig();
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
	let config = {
		formato: "Carta",
		fuentes: ["F1", "F2", "F3", "F4", "F5"],
		titleOpction: false,
	};
	localStorage.setItem("config", JSON.stringify(config));
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
