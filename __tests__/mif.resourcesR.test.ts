import axios from "axios";
import {StatusCodes} from "../utils/statusCodes";
import {TRequestBody, TResponseBody} from "../routes/resourcesR";

const baseURL = 'http://127.0.0.1'
const port = 3333;
const instance = axios.create({
    baseURL: `${baseURL}:${port}/`,
});

const testResName = 'testres';
const testResType = 'Material';
const resToAddBody: TRequestBody = {
    type: 'Component', resource: {
        name: 'testres',
        type: "Bone",
        durability: 123,
        difficulty: 55,
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
        }
    }
}

describe('/resourceR routes test GET', () => {
    it(`should return status ${StatusCodes.notFound} for not found elem`,
        async function () {
            const data = await instance.get<TResponseBody>(`/get?name=${testResName}&type=${testResType}`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.notFound)
        });
})
describe('/resourceR routes test POST', () => {

    it(`should success add `,
        async function () {
            const data = await instance.post<TResponseBody>('/material', resToAddBody).then(data => data.data)
            expect(data.status).toBe(StatusCodes.Ok);
            expect(data.data.length).toBe(1);
            expect(data.data[0].name).toBe(testResName);
        });
})
describe('/resourceR routes test UPDATE', () => {
    it(`should success found`, async () => {
        const data = await instance.get<TResponseBody>(`/get?name=${testResName}&type=${testResType}`).then(data => data.data)
        expect(data.status).toBe(StatusCodes.Ok)
        expect(data.data[0].name).toBe(testResName)
    })
    it(`should success update name`, async () => {
        const data = await instance.put<TResponseBody>(`/put?name=${testResName}&type=${testResType}`, {
            ...resToAddBody,
            resource: {...resToAddBody.resource, name: 'UpdatedName'}
        }).then(data => data.data)
        expect(data.status).toBe(StatusCodes.Ok)
        expect(data.data[0].name).toBe('UpdatedName')
    })
    it(`should success found updated element`, async () => {
        const data = await instance.get<TResponseBody>(`/get?name=UpdatedName&type=${testResType}`).then(data => data.data)
        expect(data.status).toBe(StatusCodes.Ok)
        expect(data.data[0].name).toBe('UpdatedName')
    })
    it(`should success update back`, async () => {
        const data = await instance.put<TResponseBody>(`/put?name=UpdatedName&type=${testResType}`, resToAddBody).then(data => data.data)
        expect(data.status).toBe(StatusCodes.Ok)
        expect(data.data[0].name).toBe(testResName)
    })

})
describe('/resourceR routes test DELETE', () => {
    it(`should reject delete coz not found`,
        async function () {
            const data = await instance.delete<TResponseBody>(`/del?name=${testResName}wrongname&type=${testResType}`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.notFound);
            expect(data.data.length).toBe(0);
        });
    it(`should success delete`,
        async function () {
            const data = await instance.delete<TResponseBody>(`/del?name=${testResName}&type=${testResType}`).then(data => data.data)
            expect(data.status).toBe(StatusCodes.Ok);
            expect(data.data.length).toBe(1);
            expect(data.data[0].name).toBe(testResName);
        });
})