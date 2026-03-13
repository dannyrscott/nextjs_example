import { ApplicationRecord, TriageResult } from "@/types/application"

export function buildHandoff(
  app: ApplicationRecord,
  triage: TriageResult
) {

  return {
    applicationId: app.applicationId,
    programName: app.programName,
    amountRequested: app.amountRequested,
    reviewTier: triage.reviewTier,
    createdAt: app.createdAt
  }
}