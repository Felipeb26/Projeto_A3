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
	`<head><meta charset="utf-8"><style>*{margin: 0;padding: 0;}h1{color: blue;text-align:center;}body{font-family: arial, sans-serif;}main{width:90%;margin:auto;font-size: 25px;}p{padding-top: 30px;}header{background-color: whitesmoke;padding: 20px;margin-bottom: 20px;text-align: center;}</style></head><body><header><img class="logotipo" src="imagem/Origami.png" width="250px"></header><main><h1>Olá, paciente!</h1><p>Olá, (nome do paciente), Seja bem-vindo(a) a Origami Saúde.<br>Para nós é um prazer recebe-lo(a) aqui.</p><br><p>A sua consulta foi agendada para o dia ${data}<br>Havendo alguma dúvida, reclamação ou sugestão fale conosco através do nosso <a href="contato.html">canal de contato.</a></p><br><p>Um abraço,<br>Equipe Origami Saúde</p></main></body></html>`;
};

module.exports = {
	medicamento,
	atestado,
    boasVindas,
	options,
};
