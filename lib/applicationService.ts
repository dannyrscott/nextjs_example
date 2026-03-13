import { randomUUID } from "crypto"
import { applicationSchema } from "@/lib/validation"
import { evaluateApplication } from "@/lib/triage"
import { buildHandoff } from "@/lib/handoff"
import { store } from "./store"

export function submitApplication(input: any) {    
  const validated = applicationSchema.parse(input)

  const application = {
    ...validated,
    applicationId: randomUUID(),
    createdAt: new Date().toISOString()
  }
  
  store.saveApplication(application)

  const triage = evaluateApplication(application)

  const handoff = buildHandoff(application, triage)

  store.saveHandoff(application.applicationId, handoff)

  return {
    applicationId: application.applicationId,
    reviewTier: triage.reviewTier,
    riskFlags: triage.riskFlags
  }
}