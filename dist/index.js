"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dbconnect_1 = require("./db/dbconnect");
const statusCodes_1 = require("./utils/statusCodes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mapRoute_1 = require("./routes/mapRoute");
const TestCRUDRoute_1 = require("./routes/TestCRUDRoute");
const ComponentSchema_1 = require("./schemas/ComponentSchema");
const MaterialSchema_1 = require("./schemas/MaterialSchema");
const NpcSchema_1 = require("./schemas/NpcSchema");
const LocationSchema_1 = require("./schemas/LocationSchema");
const RegionSchema_1 = require("./schemas/RegionSchema");
const GatherPointSchema_1 = require("./schemas/GatherPointSchema");
const LootSchema_1 = require("./schemas/LootSchema");
const ElixirSchema_1 = require("./schemas/ElixirSchema");
const EventSchema_1 = require("./schemas/EventSchema");
const MapObjectsSchema_1 = require("./schemas/MapObjectsSchema");
const RecipeSchema_1 = require("./schemas/RecipeSchema");
const QuestSchema_1 = require("./schemas/QuestSchema");
const MonsterSchema_1 = require("./schemas/MonsterSchema");
const AbilitySchema_1 = require("./schemas/AbilitySchema");
const CompanionSchema_1 = require("./schemas/CompanionSchema");
const authRoute_1 = require("./routes/authRoute");
const errorHandlerMW_1 = require("./middleware/errorHandlerMW");
const QuestItemSchema_1 = require("./schemas/QuestItemSchema");
const QuestItemSourceSchema_1 = require("./schemas/QuestItemSourceSchema");
const ShopSchema_1 = require("./schemas/ShopSchema");
const TrainerSchema_1 = require("./schemas/TrainerSchema");
const port = Number(process.env.SERVER_PORT) || 3333;
// const allowPort = process.env.SERVER_PORT || 3000;
const serverHost = process.env.SERVER_HOST || `localhost`;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `*`);
    // res.setHeader('Access-Control-Allow-Origin', `http://localhost:${allowPort}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
exports.app.use((req, res, next) => {
    var _a, _b;
    // console.log('2' + req.body?.type==='Component' || req.body?.type==='Material')
    if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.type) === 'Component' || ((_b = req.body) === null || _b === void 0 ? void 0 : _b.type) === 'Material') {
        const ress = req.body.data;
        // console.log(`In middleware. Reject? - ${!ress.name || !ress.type || isNaN(ress.tier) || !ress.attributes || isNaN(ress.difficulty) || isNaN(ress.durability)}`)
        if (!ress.name || !ress.type || isNaN(ress.tier) || !ress.attributes || isNaN(ress.craftDifficulty) || isNaN(ress.gatherDifficulty) || isNaN(ress.durability))
            res.json({ status: statusCodes_1.StatusCodes.badRequest, msg: [`missing attributes`], data: [] });
        else {
            next();
        }
    }
    else {
        next();
    }
    // if(req.body.type === 'npc'){
    //     console.log(`here mw | ${req.params.id} => ${req.params.id && (req.params.id.length !==24) }`)
    //     if(req.params.id && req.params.id.length !==24 )res.json(getResObj([], StatusCodes.badId, [`must be string of 24 hex characters`]))
    // // }
});
// app.use('/api', resourcesR);
// app.use('/api/materials', resourcesRoute<TMaterials,'Material'>(materialModel));
// app.use('/api/components', resourcesRoute<TComponents,'Component'>(componentModel));
exports.app.use('/api/map', (0, mapRoute_1.MapRoute)());
exports.app.use('/api/materials', (0, TestCRUDRoute_1.GenRoute)(MaterialSchema_1.MaterialModel));
exports.app.use('/api/components', (0, TestCRUDRoute_1.GenRoute)(ComponentSchema_1.ComponentModel));
exports.app.use('/api/npc', (0, TestCRUDRoute_1.GenRoute)(NpcSchema_1.NpcModel));
exports.app.use('/api/location', (0, TestCRUDRoute_1.GenRoute)(LocationSchema_1.LocationModel));
exports.app.use('/api/region', (0, TestCRUDRoute_1.GenRoute)(RegionSchema_1.RegionModel));
exports.app.use('/api/gatherpoint', (0, TestCRUDRoute_1.GenRoute)(GatherPointSchema_1.GatherPointModel));
exports.app.use('/api/loot', (0, TestCRUDRoute_1.GenRoute)(LootSchema_1.LootModel));
exports.app.use('/api/staminaelixir', (0, TestCRUDRoute_1.GenRoute)(ElixirSchema_1.StaminaElixirModel));
exports.app.use('/api/event', (0, TestCRUDRoute_1.GenRoute)(EventSchema_1.EventModel));
exports.app.use('/api/mapobject', (0, TestCRUDRoute_1.GenRoute)(MapObjectsSchema_1.MapObjectModel));
exports.app.use('/api/quest', (0, TestCRUDRoute_1.GenRoute)(QuestSchema_1.QuestModel));
exports.app.use('/api/recipe', (0, TestCRUDRoute_1.GenRoute)(RecipeSchema_1.RecipeModel));
exports.app.use('/api/monster', (0, TestCRUDRoute_1.GenRoute)(MonsterSchema_1.MonsterModel));
exports.app.use('/api/ability', (0, TestCRUDRoute_1.GenRoute)(AbilitySchema_1.AbilityModel));
exports.app.use('/api/companion', (0, TestCRUDRoute_1.GenRoute)(CompanionSchema_1.CompanionModel));
exports.app.use('/api/questitem', (0, TestCRUDRoute_1.GenRoute)(QuestItemSchema_1.QuestItemModel));
exports.app.use('/api/questitemsource', (0, TestCRUDRoute_1.GenRoute)(QuestItemSourceSchema_1.QuestItemSourceModel));
exports.app.use('/api/shop', (0, TestCRUDRoute_1.GenRoute)(ShopSchema_1.ShopModel));
exports.app.use('/api/trainer', (0, TestCRUDRoute_1.GenRoute)(TrainerSchema_1.TrainerModel));
exports.app.use('/api/auth', (0, authRoute_1.authRoute)());
exports.app.use(errorHandlerMW_1.errorHandler);
exports.app.listen(port, () => {
    console.log(`Running on port ${port}`);
    (0, dbconnect_1.dbconnect)().then((data) => { var _a; return console.log(`connected to ${(_a = data.connection) === null || _a === void 0 ? void 0 : _a.db.namespace}`); }).catch(err => console.log(`server layer => ${err}`));
});
