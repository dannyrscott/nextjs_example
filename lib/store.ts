import { ApplicationRecord } from "@/types/application"
import { cleanPII } from "./pii"

const applications: Map<string, ApplicationRecord> = new Map()
const handoffs: Map<string, any> = new Map()

export const store = {
  saveApplication(app: ApplicationRecord) {
    applications.set(app.applicationId, cleanPII(app))
  },

  saveHandoff(id: string, record: any) {
    handoffs.set(id, record)
  },

  getApplication(id: string) {
    return applications.get(id)
  }
}