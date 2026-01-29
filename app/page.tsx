"use client"

import { useEffect } from "react"
import sdk from "@farcaster/miniapp-sdk"
import { ProfitCalculator } from "@/components/profit-calculator"

export default function Home() {
  useEffect(() => {
    sdk.actions.ready()
  }, [])

  return <ProfitCalculator />
}
