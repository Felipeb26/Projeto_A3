const NodeCache = require("node-cache");

const cache = new NodeCache({
    deleteOnExpire:true,
    checkperiod:6000,
    });

module.exports = duration => (err, req, res, next) =>{

    if(req.method !== "Get"){
        console.log("Cannot cache get methods");
        return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if(cachedResponse){
        console.log(`Cached ${key}`);
        res.send(cachedResponse)
    }else{
        console.log(`Cahe missed ${key}`);
        res.originalSend = res.send;
        res.send = body =>{
            res.originalSend(body);
            cache.set(key, body, duration);
        };
        next();
    }

}