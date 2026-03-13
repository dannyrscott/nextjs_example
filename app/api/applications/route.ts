import { NextRequest, NextResponse } from "next/server"
import { submitApplication } from "@/lib/applicationService"

const API_KEY = "dev-key"

export async function POST(req: NextRequest) {

  const key = req.headers.get("x-api-key")

  if (!key || key !== API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  try {

    const result = submitApplication(body)

    return NextResponse.json(result)

  } catch (err:any) {
    console.log(err)
    return NextResponse.json(
      { error: "Invalid application data" },
      { status: 400 }
    )
  }
}