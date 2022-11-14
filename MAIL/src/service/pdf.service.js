var Module = require("module");
var fs = require("fs");

Module._extensions[".ico"] = function (module, fn) {
	var base64 = fs.readFileSync(fn).toString("base64");
	module._compile(
		'module.exports="data:image/jpg;base64,' + base64 + '"',
		fn
	);
};

const logo = require("../assets/favicon.ico");
const options = {
	childProcessOptions: {
		env: {
			OPENSSL_CONF: "/dev/null",
		},
	},
	type: "pdf",
	height: "10.5in",
	width: "8in",
	renderDelay: 1000,
	border: {
		top: "0.5in",
		left: "0.5in",
		right: "0.5in",
		bottom: "0.1in",
	},
	directory: "/tmp",
	paginationOffset: 1,
	footer: {
		height: "28mm",
		contents: {
			first: "",
			2: "",
			default:
				'<span style="float: right;"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></span>', // fallback value
			last: "",
		},
	},
};

const atestado = (data) => {
	return `<header style="font-weight: bold;text-transform: uppercase;display: flex;justify-items: center;">
                <h1>atestado medico</h1>
            </header>
            <div style="display: flex;align-items: center;margin: 2rem 0 5rem 0;">
                <h3 style="margin-right: 10px;text-transform: uppercase;">horario: </h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam vitae dignissimos porro aspernatur, necessitatibus doloribus voluptatem sit? Eligendi saepe a, tenetur, commodi ad amet quasi provident eum, quaerat doloribus incidunt.</p>
            </div>
            <div style="display: flex;align-items: center;margin: 2rem 0 5rem 0;">
                <h3 style="margin-right: 10px;text-transform: uppercase;">médico: </h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam vitae dignissimos porro aspernatur, necessitatibus doloribus voluptatem sit? Eligendi saepe a, tenetur, commodi ad amet quasi provident eum, quaerat doloribus incidunt.</p>
            </div>
            <footer style="display: flex;position: fixed;bottom: 0;margin-bottom: 1rem;">
                <p>São Paulo ${data}</p>
                <br><span style="float:right;">©projetoA3</span>
            </footer>`;
};

const medicamento = (data) => {
	return `<header style="font-weight: bold;text-transform: uppercase;display: flex;justify-items: center;">
                <h1>medicamento</h1>
            </header>
            <div style="display: flex;align-items: center;margin: 2rem 0 5rem 0;">
                <h3 style="margin-right: 10px;text-transform: uppercase;">horario: </h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam vitae dignissimos porro aspernatur, necessitatibus doloribus voluptatem sit? Eligendi saepe a, tenetur, commodi ad amet quasi provident eum, quaerat doloribus incidunt.</p>
            </div>
            <div style="display: flex;align-items: center;margin: 2rem 0 5rem 0;">
                <h3 style="margin-right: 10px;text-transform: uppercase;">médico: </h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam vitae dignissimos porro aspernatur, necessitatibus doloribus voluptatem sit? Eligendi saepe a, tenetur, commodi ad amet quasi provident eum, quaerat doloribus incidunt.</p>
            </div>
            <footer style="display: flex;position: fixed;bottom: 0;margin-bottom: 1rem;">
                <p>São Paulo ${data}</p>
                <br><span style="float:right;">©projetoA3</span>
            </footer>`;
};

const boasVindas = (data) => {
	return `<header style="display: flex;flex-direction: column;align-items: center;">
    <img class="logotipo" src="${logo}" width="250px">
	</header>
	<div style="display: flex;flex-direction: column;justify-content: center;align-items:center ;">
    <h1>Olá Seja Bem vindo paciente!</h1>
    <div>
		<p>Olá, (nome do paciente), Seja bem-vindo(a) a Origami Saúde.</p>
		<p>Para nós é um prazer recebe-lo(a) aqui.</p>
    </div>
    <p>A sua consulta foi agendada para o dia<br> ${data}.</p>
    <p>Havendo alguma dúvida, reclamação ou sugestão fale conosco através do nosso <a
        href="mailto:felipeb2silva@gmail.com" target="_blank">canal de
        contato.</a></p>
    <div style="margin-left: 8rem;">
		<p>Um abraço</p>
		<p style="margin-left: 1rem;"> Origami Saúde</p>
		</div>
	</div>`;
};

module.exports = {
	medicamento,
	atestado,
	boasVindas,
	options,
};
