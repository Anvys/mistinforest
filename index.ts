import express from "express";
import {dbconnect} from "./db/dbconnect";
import {StatusCodes} from "./utils/statusCodes";
import {componentModel, TComponents} from "./schemas/components";
import {materialModel, TMaterials} from "./schemas/materials";
import {MapRoute} from "./routes/mapRoute";
import {GenRoute} from "./routes/TestCRUDRoute";
import {NpcModel, TNpc} from "./schemas/NpcSchema";

const port = 3333;
const allowPort = 3000;


export const app = express()
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `*`);
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${allowPort}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use((req, res, next) => {
    // console.log('2' + req.body?.type==='Component' || req.body?.type==='Material')
    if (req.body?.type === 'Component' || req.body?.type === 'Material') {
        const ress = req.body.data
        // console.log(`In middleware. Reject? - ${!ress.name || !ress.type || isNaN(ress.tier) || !ress.attributes || isNaN(ress.difficulty) || isNaN(ress.durability)}`)
        if (!ress.name || !ress.type || isNaN(ress.tier) || !ress.attributes || isNaN(ress.difficulty) || isNaN(ress.durability))
            res.json({status: StatusCodes.badRequest, msg: [`missing attributes`], data: []})
    }
    // if(req.body.type === 'npc'){
    //     console.log(`here mw | ${req.params.id} => ${req.params.id && (req.params.id.length !==24) }`)
    //     if(req.params.id && req.params.id.length !==24 )res.json(getResObj([], StatusCodes.badId, [`must be string of 24 hex characters`]))
    // // }
    next()
})
// app.use('/api', resourcesR);
// app.use('/api/materials', resourcesRoute<TMaterials,'Material'>(materialModel));
// app.use('/api/components', resourcesRoute<TComponents,'Component'>(componentModel));
app.use('/api/map', MapRoute());
app.use('/api/npc', GenRoute<TNpc>(NpcModel));
app.use('/api/materials', GenRoute<TMaterials>(materialModel));
app.use('/api/components', GenRoute<TComponents>(componentModel));

app.listen(port, () => {
    console.log(`Running on port ${port}`)
    dbconnect().then((data) => console.log(`connected to ${data.connection?.db.namespace}`)).catch(err => console.log(`server layer => ${err}`))
});