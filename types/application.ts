export type ApplicationInput = {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    ssn: string
    address1: string
    address2?: string
    city: string
    state: string
    zip: string
    programName: string
    amountRequested: number
    agreement: boolean
  }
      
  export type ApplicationRecord = ApplicationInput & {
    applicationId: string
    createdAt: string
  }
  
  export type TriageResult = {
    reviewTier: "standard" | "manual_review"
    riskFlags: string[]
  }