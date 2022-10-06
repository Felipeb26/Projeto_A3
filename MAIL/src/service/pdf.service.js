const time = new Date();
const date = time.toLocaleDateString();
const timer = time.toLocaleTimeString();
const today = date + " " + timer;

const pdfOptions = {
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
            default: '<span style="float: right;"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></span>', // fallback value
            last: "",
        },
    },
};

    ;

module.exports = {
    html: `<header style="font-weight: bold;text-transform: uppercase;display: flex;justify-items: center;">
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
            <footer style="display: flex;position: fixed;bottom: 0;margin-bottom: 1rem;"><p>São Paulo ${today}<br>©projetoA3</p></footer>`,
    pdfOptions,
};