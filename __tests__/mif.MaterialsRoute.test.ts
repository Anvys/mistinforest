import axios from "axios";
import {StatusCodes} from "../utils/statusCodes";
import {TRequestBody, TResponseBody} from "../utils/types";
import {TMaterial} from "../schemas/MaterialSchema";

const baseURL = 'http://127.0.0.1'
const port = 3333;
const instance = axios.create({
    baseURL: `${baseURL}:${port}/api/materials`,
});
const testName = 'testName';
let newDataId: string;

//Change THIS vars
type TEntity = TMaterial
const testNameForEntity = 'Materials'
const reqBody: TRequestBody<TEntity> = {
    type: 'Material',
    data: {
        name: testName,
        type: "Bone",
        durability: 123,
        craftDifficulty: 55,
        gatherDifficulty: 55,
        tier: 2,
        attributes: {
            Absorbity: 0,
            Density: 23,
            Flexibility: 0,
            Hardness: 0,
            Lightness: 0,
            Purity: 54,
            Radiance: 0,
            Rigidity: 0,
        },
        goldCost: 15,
        encumbrance: 20,
        translate: {En: testName, Fr: '', Ru: ''},
        notes: [],
    }
}

type axRes = TResponseBody<TEntity & { _id: string }>;
describe(`/${testNameForEntity} routes test POST`, () => {
    it(`should success add `,
        async function () {
            const data = await instance.post<axRes>('/one', reqBody).then(res => res.data)
            expect(data.status).toBe(StatusCodes.Ok);
            expect(data.data.length).toBe(1);
            expect(data.data[0].name).toBe(testName);
            expect(data.data[0]._id).not.toBeNull();
            newDataId = data.data[0]._id;
            console.log(`newid: ${newDataId}`)
        });
    it(`should reject add coz duplicate`,
        async function () {
            const data = await instance.post<axRes>('/one', reqBody).then(res => res.data)
            expect(data.status).toBe(StatusCodes.duplicateFound);
            expect(data.data.length).toBe(0);
        });
})
describe(`/${testNameForEntity} routes test GET`, () => {
    it(`should return status ${StatusCodes.notFound} for not found elem`,
        async function () {
            const data = await instance.get<axRes>(`/one/777777777777777777777777`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.notFound)
        });
    it(`should return status ${StatusCodes.badId} for invalid id`,
        async function () {
            const data = await instance.get<axRes>(`/one/532523`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.badId)
        });
    it(`should return status ${StatusCodes.Ok} for found elem`,
        async function () {
            const data = await instance.get<axRes>(`/one/${newDataId}`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.Ok)
            expect(data.data.length).toBe(1);
            expect(data.data[0].name).toBe(testName);
        });
})
describe(`/${testNameForEntity} routes test UPDATE`, () => {
    const uName = 'UpdatedName'
    it(`should success update name`, async () => {
        const data = await instance.put<axRes>(`/one/${newDataId}`, {
            ...reqBody,
            data: {...reqBody.data, name: uName}
        }).then(data => data.data)
        expect(data.status).toBe(StatusCodes.Ok)
        expect(data.data[0].name).toBe(uName)
        expect(data.data[0]._id).toBe(newDataId)
    })
    it(`should success found updated element`,
        async function () {
            const data = await instance.get<axRes>(`/one/${newDataId}`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.Ok)
            expect(data.data.length).toBe(1);
            expect(data.data[0].name).toBe(uName);
        });
    it(`should success update back`, async () => {
        const data = await instance.put<axRes>(`/one/${newDataId}`, {
            ...reqBody,
            data: {...reqBody.data, name: testName}
        }).then(data => data.data)
        expect(data.status).toBe(StatusCodes.Ok)
        expect(data.data[0].name).toBe(testName)
        expect(data.data[0]._id).toBe(newDataId)
    })
})
describe(`/${testNameForEntity} routes test DELETE`, () => {
    it(`should reject delete coz badID`,
        async function () {
            const data = await instance.delete<axRes>(`/one/asd${newDataId}asd`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.badId);
            expect(data.data.length).toBe(0);
        });
    it(`should success delete`,
        async function () {
            const data = await instance.delete<axRes>(`/one/${newDataId}`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.Ok);
            expect(data.data.length).toBe(1);
            expect(data.data[0].name).toBe(testName)
            expect(data.data[0]._id).toBe(newDataId)
        });
    it(`should reject delete coz not found`,
        async function () {
            const data = await instance.delete<axRes>(`/one/asd${newDataId}asd`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.badId);
            expect(data.data.length).toBe(0);
        });
})