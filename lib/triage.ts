import { ApplicationRecord, TriageResult } from "@/types/application"

export function evaluateApplication(app: ApplicationRecord): TriageResult {

  const flags: string[] = []

  if (app.amountRequested > 1000) {
    flags.push("AMOUNT_OVER_LIMIT")
  }

  const dob = new Date(app.dateOfBirth)

  const age =
    (Date.now() - dob.getTime()) /
    (365.25 * 24 * 60 * 60 * 1000)

  if (age < 18) {
    flags.push("UNDERAGE_APPLICANT")
  }

  const ssn = app.ssn.replace(/-/g, "")

  if (ssn.length !== 9) {
    flags.push("SUSPICIOUS_SSN_PATTERN")
  }

  return {
    reviewTier: flags.length ? "manual_review" : "standard",
    riskFlags: flags
  }
}