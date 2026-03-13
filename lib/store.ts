import { ApplicationRecord } from "@/types/application"

const applications: Map<string, ApplicationRecord> = new Map()
const handoffs: Map<string, any> = new Map()

export const store = {
  saveApplication(app: ApplicationRecord) {
    applications.set(app.applicationId, app)
  },

  saveHandoff(id: string, record: any) {
    handoffs.set(id, record)
  },

  getApplication(id: string) {
    return applications.get(id)
  }
}