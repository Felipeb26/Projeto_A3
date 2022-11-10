const date = new Date();
const day = date.getDay();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();



export const loggs = (tokens:any,req:any, res:any) =>{
    return [
        `Method: ${tokens.method(req, res)};`,
        `Url: ${tokens.url(req, res)}; `,
        `Status-code: ${tokens.status(req, res)}; `,
        `Content-Length: ${tokens.res(req, res, "content-length")}; `,
        `Response-Time: ${tokens["response-time"](req, res)}ms; `,
        `\nDate ${day}/${month}/${year} ${hour}:${minutes}:${seconds}`,
        "\n------------------------------------------------------------------------------------------------------\n",
    ].join("\t");
}