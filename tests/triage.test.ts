import { ApplicationInput, ApplicationRecord } from "@/types/application"
import { evaluateApplication } from "../lib/triage"

describe("triage rules", () => {

  it("flags large requests", () => {

    const app: ApplicationRecord = {
        createdAt: new Date().toISOString(),
        applicationId: "1",
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.net',
      phone: '1231231233',
      "address1": "123 Main St",
      city: "city",
      state: 'fl',
      zip: '12334',
      programName: 'Program',
      agreement: true,
      dateOfBirth: "1990-01-01", ssn: "123-45-6789", amountRequested: 2000 
    }

    const result = evaluateApplication(app)    
    expect(result.reviewTier).toBe("manual_review")
    expect(result.riskFlags.includes("AMOUNT_OVER_LIMIT")).toBe(true)
  })

  it("Does not flag correct", () => {

    const app: ApplicationRecord = {
        createdAt: new Date().toISOString(),
        applicationId: "1",
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.net',
      phone: '1231231233',
      "address1": "123 Main St",
      city: "city",
      state: 'fl',
      zip: '12334',
      programName: 'Program',
      agreement: true,
      dateOfBirth: "1990-01-01", ssn: "123-45-6789", amountRequested: 200 
    }

    const result = evaluateApplication(app) 
    console.log(result)   
    expect(result.reviewTier).toBe("standard")
    expect(result.riskFlags.length).toBe(0)
  })

})