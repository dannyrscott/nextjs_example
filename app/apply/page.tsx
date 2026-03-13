"use client"

import { useState } from "react"

export default function ApplyPage() {
  const [form, setForm] = useState<any>({})

  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submit = async (e:any) => {
    e.preventDefault()

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "dev-key"
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()

    alert(`Application ID: ${data.applicationId}`)
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
    </div>
  )
}