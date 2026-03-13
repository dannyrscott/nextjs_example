import { z } from "zod"

export const applicationSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string().length(2),
    zip: z.string().length(5),
    programName: z.string(),
    amountRequested: z.coerce.number(),
    agreement: z.coerce.boolean()
})