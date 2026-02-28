"use client"

import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"

interface CalculationResult {
  profit: number
  percentageGain: number
  units: number
}

export function ProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState("")
  const [sellPrice, setSellPrice] = useState("")
  const [investment, setInvestment] = useState("")
  const [fees, setFees] = useState("")
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isCalculated, setIsCalculated] = useState(false)

  const calculateProfit = () => {
    const buy = parseFloat(buyPrice)
    const sell = parseFloat(sellPrice)
    const invest = parseFloat(investment)
    const fee = parseFloat(fees) || 0

    if (isNaN(buy) || isNaN(sell) || isNaN(invest) || buy <= 0) {
      return
    }

    const units = invest / buy
    const profit = (sell - buy) * units - fee
    const percentageGain = ((sell - buy) / buy) * 100

    setResult({
      profit,
      percentageGain,
      units,
    })
    setIsCalculated(true)
  }

  const resetCalculator = () => {
    setBuyPrice("")
    setSellPrice("")
    setInvestment("")
    setFees("")
    setResult(null)
    setIsCalculated(false)
  }

  const isFormValid = buyPrice && sellPrice && investment && parseFloat(buyPrice) > 0

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6 flex flex-col">
      {/* Header with Theme Toggle */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 111 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent"
            >
              <path
                d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H0C2.35281 87.8625 26.0432 110.034 54.921 110.034Z"
                fill="currentColor"
              />
            </svg>
            <h1 className="text-2xl font-semibold tracking-tight">
              Crypto Profit Calculator
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">Calculate your crypto gains</p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Calculator Card */}
      <div className="flex-1 max-w-md mx-auto w-full">
        <div className="bg-card border border-border rounded-xl p-5 space-y-5">
          {/* Buy Price */}
          <div className="space-y-2">
            <label
              htmlFor="buyPrice"
              className="block text-sm text-muted-foreground font-medium"
            >
              Buy Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="buyPrice"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg py-3 pl-8 pr-4 text-foreground text-lg font-medium placeholder:text-muted transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Sell Price */}
          <div className="space-y-2">
            <label
              htmlFor="sellPrice"
              className="block text-sm text-muted-foreground font-medium"
            >
              Sell Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="sellPrice"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg py-3 pl-8 pr-4 text-foreground text-lg font-medium placeholder:text-muted transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Investment */}
          <div className="space-y-2">
            <label
              htmlFor="investment"
              className="block text-sm text-muted-foreground font-medium"
            >
              Investment Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="investment"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg py-3 pl-8 pr-4 text-foreground text-lg font-medium placeholder:text-muted transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Fees (Optional) */}
          <div className="space-y-2">
            <label
              htmlFor="fees"
              className="block text-sm text-muted-foreground font-medium"
            >
              Fees{" "}
              <span className="text-muted text-xs font-normal">
                (Optional)
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="fees"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg py-3 pl-8 pr-4 text-foreground text-lg font-medium placeholder:text-muted transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateProfit}
            disabled={!isFormValid}
            className="w-full bg-accent hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground text-accent-foreground font-semibold py-3.5 rounded-lg transition-colors mt-2 disabled:cursor-not-allowed"
          >
            Calculate
          </button>
        </div>

        {/* Result Section */}
        {isCalculated && result && (
          <div
            className={`mt-5 border rounded-xl p-5 ${
              result.profit >= 0
                ? "bg-success/10 border-success/30"
                : "bg-destructive/10 border-destructive/30"
            }`}
          >
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                {result.profit >= 0 ? "Estimated Profit" : "Estimated Loss"}
              </p>
              <p
                className={`text-4xl font-bold tracking-tight ${
                  result.profit >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {result.profit >= 0 ? "+" : ""}$
                {Math.abs(result.profit).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="text-center">
                  <p className="text-xs text-muted mb-0.5">Return</p>
                  <p
                    className={`text-sm font-semibold ${
                      result.percentageGain >= 0
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {result.percentageGain >= 0 ? "+" : ""}
                    {result.percentageGain.toFixed(2)}%
                  </p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-xs text-muted mb-0.5">Units</p>
                  <p className="text-sm font-semibold text-foreground">
                    {result.units.toLocaleString("en-US", {
                      maximumFractionDigits: 6,
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetCalculator}
              className="w-full mt-4 py-2.5 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-muted rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="text-xs text-muted">
          Built on Base • For educational purposes only
        </p>
      </footer>
    </div>
  )
}
