import express, {Request} from "express";
import im from 'imagemagick'

type TGetMapTile = Request<{x: string, y: string, z: string}>
export const MapRoute = () =>{
    const router = express.Router();
    router.get('/:x/:y/:z', (req: TGetMapTile, res) =>{
        res.set({'Content-Type': 'image/png'});
        const z = Number(req.params.z);
        const x = Math.round(Number(req.params.x)/(1));
        const y = Math.round(Number(req.params.y)/(1));
        console.log(`x:${req.params.x} | y:${req.params.y} | z:${req.params.z}`)
        // const file = `World_${x<10?'0'+x:x}_${y<10?'0'+y:y}.png`
        const file = `${x}.jpg`
        res.download(`./assets/images/map/xxx/${z}/${y}/${file}`, file)
    })
    return router
}