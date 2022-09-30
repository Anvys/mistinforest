"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapRoute = void 0;
const express_1 = __importDefault(require("express"));
const MapRoute = () => {
    const router = express_1.default.Router();
    router.get('/:x/:y/:z', (req, res) => {
        res.set({ 'Content-Type': 'image/png' });
        const z = Number(req.params.z);
        const x = Math.round(Number(req.params.x) / (1));
        const y = Math.round(Number(req.params.y) / (1));
        console.log(`x:${req.params.x} | y:${req.params.y} | z:${req.params.z}`);
        // const file = `World_${x<10?'0'+x:x}_${y<10?'0'+y:y}.png`
        const file = `${x}.jpg`;
        res.download(`./assets/images/map/xxx/${z}/${y}/${file}`, file);
    });
    return router;
};
exports.MapRoute = MapRoute;
