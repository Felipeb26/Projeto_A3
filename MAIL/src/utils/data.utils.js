const time = new Date();
const date = time.toLocaleDateString("pt-br");
const timer = time.toLocaleTimeString("pt-br", { hour12: false });
const today = `${date} ${timer}`;

module.exports ={
    today
}