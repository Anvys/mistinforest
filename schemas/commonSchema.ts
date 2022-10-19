import {translateLang, TTranslateData, TTranslateLang} from "../utils/types";

export type TCommonFields = {
    name: string
    translate: TTranslateData
    notes: Array<string>
    link: string
}
export const commonSchemaFields = {
    translate: Object.fromEntries(translateLang.map((v: TTranslateLang)=>[v,{type: String, default: ''}])),
    notes: [{type: String}],
    link: {type: String, default: ''},
}