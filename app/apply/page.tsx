"use client"

import { useState } from "react"

export default function ApplyPage() {
  const [form, setForm] = useState<any>({})
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submit = async (e:any) => {
    e.preventDefault()
setError(null)
    setResponse(null)

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "dev-key"
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Submission failed")
        return
      }

      setResponse(data)

    } catch (err) {
      setError("Network error")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
    <form onSubmit={submit}>
      <h2>Applicant</h2>

      <label>First Name</label>&nbsp;
      <input name="firstName" placeholder="First Name" onChange={handleChange}/><br/>
      <label>Last Name</label>&nbsp;
      <input name="lastName" placeholder="Last Name" onChange={handleChange}/><br/>
      <label>Email</label>&nbsp;
      <input name="email" placeholder="Email" onChange={handleChange}/><br/>
      <label>Phone</label>&nbsp;
      <input name="phone" placeholder="Phone" onChange={handleChange}/><br/>
      <label>DOB</label>&nbsp;
      <input name="dateOfBirth" type="date" onChange={handleChange}/><br/>
      <label>SSN</label>&nbsp;
      <input name="ssn" type="password" placeholder="SSN" onChange={handleChange}/><br/>
      <label>Address 1</label>&nbsp;
     <input name="address1" placeholder="Addresss 1" onChange={handleChange}/>  <br/>
     <label>Address 2</label>&nbsp;
     <input name="address2" placeholder="Addresss 2" onChange={handleChange}/>  <br/>
     <label>City</label>&nbsp;
     <input name="city" placeholder="City" onChange={handleChange}/>  <br/>
     <label>State</label>&nbsp;
      <input name="state" placeholder="State" maxLength={2} onChange={handleChange}/>  <br/>
      <label>Zipcode</label>&nbsp;
      <input name="zip" placeholder="Zipcode" maxLength={5} onChange={handleChange}/>  <br/>
      <h2>Program</h2>

      <label>Program Name</label>&nbsp;
      <input name="programName" placeholder="Program" onChange={handleChange}/><br/>
      <label>Amount Requested</label>&nbsp;
      <input name="amountRequested" type="number"  placeholder="0" onChange={handleChange}/><br/>

      <label>
        Agree
        <input name="agreement" type="checkbox" value={1} onChange={handleChange}/>
      </label>
      <br/>
      <button type="submit">Submit</button>
    </form>
    {error && (
        <div style={{ marginTop: 20, color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    {response && (
        <div style={{ marginTop: 20 }}>
          <h3>Application Submitted</h3>

          <p><strong>Application ID:</strong> {response.applicationId}</p>
          <p><strong>Review Tier:</strong> {response.reviewTier}</p>

          {response.riskFlags?.length > 0 && (
            <>
              <p><strong>Risk Flags:</strong></p>
              <ul>
                {response.riskFlags.map((flag: string) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}