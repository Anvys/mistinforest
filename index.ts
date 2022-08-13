import express from "express";
import {dbconnect} from "./db/dbconnect";
import {StatusCodes} from "./utils/statusCodes";
import resourcesR from "./routes/resourcesR";
const port = 3333;
const allowPort = 3000;


export const app = express()
app.use(express.json())
app.use(function (req, res, next) {
    console.log('1')
    res.setHeader('Access-Control-Allow-Origin', `*`);
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${allowPort}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use((req,res,next) =>{
    console.log('2' + req.body?.type==='Component' || req.body?.type==='Material')
    if(req.body?.type==='Component' || req.body?.type==='Material'){
        const ress = req.body.resource
        if(!ress.name || !ress.type || !ress.tier || !ress.attributes || !ress.difficulty || !ress.durability)
            res.json({status: StatusCodes.badRequest, msg:[`missing attributes`], data: []})
    }
    next()
})
app.use('/', resourcesR);

app.listen(port, () => {
    console.log(`Running on port ${port}`)
    dbconnect().then((data) => console.log(`connected to ${data.connection?.db.namespace}`)).catch(err => console.log(`server layer => ${err}`))
});