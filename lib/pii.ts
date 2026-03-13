import { ApplicationRecord } from "@/types/application";
import { hash } from "crypto";

export function cleanPII(app: ApplicationRecord): ApplicationRecord {
    const cleaned = JSON.parse(JSON.stringify(app))
    cleaned.ssn_last_four = app.ssn.slice(-4)
    cleaned.ssn = hash('md5', app.ssn) //Better/more robust encrypting needed here but just to show that it needs to be encrypted

    return cleaned;
}