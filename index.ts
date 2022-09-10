import express from "express";
import {dbconnect} from "./db/dbconnect";
import {StatusCodes} from "./utils/statusCodes";
import dotenv from 'dotenv'
dotenv.config()
import {MapRoute} from "./routes/mapRoute";
import {GenRoute} from "./routes/TestCRUDRoute";

import {ComponentModel, TComponent} from "./schemas/ComponentSchema";
import {MaterialModel, TMaterial} from "./schemas/MaterialSchema";
import {NpcModel, TNpc} from "./schemas/NpcSchema";
import {LocationModel, TLocation} from "./schemas/LocationSchema";
import {RegionModel, TRegion} from "./schemas/RegionSchema";
import {GatherPointModel, TGatherPoint} from "./schemas/GatherPointSchema";
import {LootModel, TLoot} from "./schemas/LootSchema";
import {StaminaElixirModel, TStaminaElixir} from "./schemas/ElixirSchema";
import {EventModel, TEvent} from "./schemas/EventSchema";
import {MapObjectModel, TMapObject} from "./schemas/MapObjectsSchema";
import {RecipeModel, TRecipe} from "./schemas/RecipeSchema";
import {QuestModel, TQuest} from "./schemas/QuestSchema";
import {MonsterModel, TMonster} from "./schemas/MonsterSchema";
import {AbilityModel, TAbility} from "./schemas/AbilitySchema";
import {CompanionModel, TCompanion} from "./schemas/CompanionSchema";
import {authRoute} from "./routes/authRoute";
import {errorHandler} from "./middleware/errorHandlerMW";
import {QuestItemModel, TQuestItem} from "./schemas/QuestItemSchema";



const port = 3333;
const allowPort = 3000;




export const app = express()
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `*`);
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${allowPort}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use((req, res, next) => {
    // console.log('2' + req.body?.type==='Component' || req.body?.type==='Material')
    if (req.body?.type === 'Component' || req.body?.type === 'Material') {
        const ress = req.body.data
        // console.log(`In middleware. Reject? - ${!ress.name || !ress.type || isNaN(ress.tier) || !ress.attributes || isNaN(ress.difficulty) || isNaN(ress.durability)}`)
        if (!ress.name || !ress.type || isNaN(ress.tier) || !ress.attributes || isNaN(ress.craftDifficulty) || isNaN(ress.gatherDifficulty) || isNaN(ress.durability))
            res.json({status: StatusCodes.badRequest, msg: [`missing attributes`], data: []})
        else {
            next()
        }
    }else{
        next()
    }
    // if(req.body.type === 'npc'){
    //     console.log(`here mw | ${req.params.id} => ${req.params.id && (req.params.id.length !==24) }`)
    //     if(req.params.id && req.params.id.length !==24 )res.json(getResObj([], StatusCodes.badId, [`must be string of 24 hex characters`]))
    // // }

})
// app.use('/api', resourcesR);
// app.use('/api/materials', resourcesRoute<TMaterials,'Material'>(materialModel));
// app.use('/api/components', resourcesRoute<TComponents,'Component'>(componentModel));
app.use('/api/map', MapRoute());

app.use('/api/materials', GenRoute<TMaterial>(MaterialModel));
app.use('/api/components', GenRoute<TComponent>(ComponentModel));
app.use('/api/npc', GenRoute<TNpc>(NpcModel));
app.use('/api/location', GenRoute<TLocation>(LocationModel));
app.use('/api/region', GenRoute<TRegion>(RegionModel));
app.use('/api/gatherpoint', GenRoute<TGatherPoint>(GatherPointModel));
app.use('/api/loot', GenRoute<TLoot>(LootModel));
app.use('/api/staminaelixir', GenRoute<TStaminaElixir>(StaminaElixirModel));
app.use('/api/event', GenRoute<TEvent>(EventModel));
app.use('/api/mapobject', GenRoute<TMapObject>(MapObjectModel));
app.use('/api/quest', GenRoute<TQuest>(QuestModel));
app.use('/api/recipe', GenRoute<TRecipe>(RecipeModel));
app.use('/api/monster', GenRoute<TMonster>(MonsterModel));
app.use('/api/ability', GenRoute<TAbility>(AbilityModel));
app.use('/api/companion', GenRoute<TCompanion>(CompanionModel));
app.use('/api/questitem', GenRoute<TQuestItem>(QuestItemModel));

app.use('/api/auth', authRoute());

app.use(errorHandler)
app.listen(port, () => {
    console.log(`Running on port ${port}`)
    dbconnect().then((data) => console.log(`connected to ${data.connection?.db.namespace}`)).catch(err => console.log(`server layer => ${err}`))
});