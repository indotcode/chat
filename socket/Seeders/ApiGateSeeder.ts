import ApiGate from "../Models/ApiGate";
import config from "../config";

export default async () => {
    config.apiGate.map(async (item: any) => {
        const apiGate = await ApiGate.exists({domain: item.domain})
        if(!apiGate){
            await ApiGate.create({domain: item.domain, code: item.code})
        } else {
            await ApiGate.updateOne({domain: item.domain}, {code: item.code})
        }
    })
    console.info('Seeder ApiGate успешно отработан.')
    return process.exit(0);
}