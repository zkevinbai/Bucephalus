/* 2025 U.S. tax data for the Comp Calculator.

   Estimates only — federal brackets + FICA are exact for 2025; state tax is a
   close approximation. It does NOT model:
     - state credits, itemized deductions, or every state's own standard deduction
     - local / city income taxes (NYC, Yonkers, most of Ohio, Maryland counties, …)
     - pre-tax 401(k)/HSA, capital gains, AMT, the QBI deduction, or NIIT

   For graduated states, married-filing-jointly is approximated by doubling the
   single thresholds. That's exact for some states (CA, NY use ~2x) and a slight
   approximation for others; the dollar effect is small at the low brackets where
   it differs. The UI says all of this out loud.

   Bracket shape: each entry { upTo, rate } means "rate applies up to upTo of
   taxable income"; the final entry uses upTo: Infinity. Rates are percent. */

// ── Federal income tax, tax year 2025 ────────────────────────────────────────
export const FEDERAL = {
  single: {
    standardDeduction: 15000,
    brackets: [
      { upTo: 11925, rate: 10 },
      { upTo: 48475, rate: 12 },
      { upTo: 103350, rate: 22 },
      { upTo: 197300, rate: 24 },
      { upTo: 250525, rate: 32 },
      { upTo: 626350, rate: 35 },
      { upTo: Infinity, rate: 37 },
    ],
  },
  married: {
    standardDeduction: 30000,
    brackets: [
      { upTo: 23850, rate: 10 },
      { upTo: 96950, rate: 12 },
      { upTo: 206700, rate: 22 },
      { upTo: 394600, rate: 24 },
      { upTo: 501050, rate: 32 },
      { upTo: 751600, rate: 35 },
      { upTo: Infinity, rate: 37 },
    ],
  },
}

// ── FICA, 2025 ───────────────────────────────────────────────────────────────
export const FICA = {
  socialSecurityRate: 6.2,
  socialSecurityWageBase: 176100,
  medicareRate: 1.45,
  additionalMedicareRate: 0.9, // on wages above the threshold
  additionalMedicareThreshold: { single: 200000, married: 250000 },
}

// ── State income tax, 2025 ───────────────────────────────────────────────────
// type: 'none' | 'flat' | 'graduated'
//   flat:       { rate }
//   graduated:  { brackets: [{ upTo, rate }] }  (single thresholds; MFJ doubled)
const g = (brackets) => ({ type: 'graduated', brackets })
const flat = (rate) => ({ type: 'flat', rate })
const none = { type: 'none' }

export const STATES = {
  AL: { name: 'Alabama', ...g([{ upTo: 500, rate: 2 }, { upTo: 3000, rate: 4 }, { upTo: Infinity, rate: 5 }]) },
  AK: { name: 'Alaska', ...none },
  AZ: { name: 'Arizona', ...flat(2.5) },
  AR: { name: 'Arkansas', ...g([{ upTo: 4400, rate: 0 }, { upTo: 8800, rate: 2 }, { upTo: Infinity, rate: 3.9 }]) },
  CA: {
    name: 'California',
    ...g([
      { upTo: 10756, rate: 1 },
      { upTo: 25499, rate: 2 },
      { upTo: 40245, rate: 4 },
      { upTo: 55866, rate: 6 },
      { upTo: 70606, rate: 8 },
      { upTo: 360659, rate: 9.3 },
      { upTo: 432787, rate: 10.3 },
      { upTo: 721314, rate: 11.3 },
      { upTo: 1000000, rate: 12.3 },
      { upTo: Infinity, rate: 13.3 }, // +1% mental-health surtax over $1M
    ]),
  },
  CO: { name: 'Colorado', ...flat(4.4) },
  CT: {
    name: 'Connecticut',
    ...g([
      { upTo: 10000, rate: 2 },
      { upTo: 50000, rate: 4.5 },
      { upTo: 100000, rate: 5.5 },
      { upTo: 200000, rate: 6 },
      { upTo: 250000, rate: 6.5 },
      { upTo: 500000, rate: 6.9 },
      { upTo: Infinity, rate: 6.99 },
    ]),
  },
  DE: {
    name: 'Delaware',
    ...g([
      { upTo: 2000, rate: 0 },
      { upTo: 5000, rate: 2.2 },
      { upTo: 10000, rate: 3.9 },
      { upTo: 20000, rate: 4.8 },
      { upTo: 25000, rate: 5.2 },
      { upTo: 60000, rate: 5.55 },
      { upTo: Infinity, rate: 6.6 },
    ]),
  },
  FL: { name: 'Florida', ...none },
  GA: { name: 'Georgia', ...flat(5.39) },
  HI: {
    name: 'Hawaii',
    ...g([
      { upTo: 2400, rate: 1.4 },
      { upTo: 4800, rate: 3.2 },
      { upTo: 9600, rate: 5.5 },
      { upTo: 14400, rate: 6.4 },
      { upTo: 19200, rate: 6.8 },
      { upTo: 24000, rate: 7.2 },
      { upTo: 36000, rate: 7.6 },
      { upTo: 48000, rate: 7.9 },
      { upTo: 150000, rate: 8.25 },
      { upTo: 175000, rate: 9 },
      { upTo: 200000, rate: 10 },
      { upTo: Infinity, rate: 11 },
    ]),
  },
  ID: { name: 'Idaho', ...flat(5.695) },
  IL: { name: 'Illinois', ...flat(4.95) },
  IN: { name: 'Indiana', ...flat(3.0) },
  IA: { name: 'Iowa', ...flat(3.8) },
  KS: { name: 'Kansas', ...g([{ upTo: 23000, rate: 5.2 }, { upTo: Infinity, rate: 5.58 }]) },
  KY: { name: 'Kentucky', ...flat(4.0) },
  LA: { name: 'Louisiana', ...flat(3.0) },
  ME: { name: 'Maine', ...g([{ upTo: 26050, rate: 5.8 }, { upTo: 61600, rate: 6.75 }, { upTo: Infinity, rate: 7.15 }]) },
  MD: {
    name: 'Maryland',
    ...g([
      { upTo: 1000, rate: 2 },
      { upTo: 2000, rate: 3 },
      { upTo: 3000, rate: 4 },
      { upTo: 100000, rate: 4.75 },
      { upTo: 125000, rate: 5 },
      { upTo: 150000, rate: 5.25 },
      { upTo: 250000, rate: 5.5 },
      { upTo: Infinity, rate: 5.75 },
    ]),
  },
  MA: { name: 'Massachusetts', ...g([{ upTo: 1000000, rate: 5 }, { upTo: Infinity, rate: 9 }]) }, // 5% + 4% millionaire surtax
  MI: { name: 'Michigan', ...flat(4.25) },
  MN: {
    name: 'Minnesota',
    ...g([
      { upTo: 32570, rate: 5.35 },
      { upTo: 106990, rate: 6.8 },
      { upTo: 198630, rate: 7.85 },
      { upTo: Infinity, rate: 9.85 },
    ]),
  },
  MS: { name: 'Mississippi', ...flat(4.4) },
  MO: {
    name: 'Missouri',
    ...g([
      { upTo: 1273, rate: 0 },
      { upTo: 2546, rate: 2 },
      { upTo: 3819, rate: 2.5 },
      { upTo: 5092, rate: 3 },
      { upTo: 6365, rate: 3.5 },
      { upTo: 7638, rate: 4 },
      { upTo: 8911, rate: 4.5 },
      { upTo: Infinity, rate: 4.7 },
    ]),
  },
  MT: { name: 'Montana', ...g([{ upTo: 20500, rate: 4.7 }, { upTo: Infinity, rate: 5.9 }]) },
  NE: {
    name: 'Nebraska',
    ...g([{ upTo: 3700, rate: 2.46 }, { upTo: 22170, rate: 3.51 }, { upTo: 35730, rate: 5.01 }, { upTo: Infinity, rate: 5.2 }]),
  },
  NV: { name: 'Nevada', ...none },
  NH: { name: 'New Hampshire', ...none }, // no tax on wages
  NJ: {
    name: 'New Jersey',
    ...g([
      { upTo: 20000, rate: 1.4 },
      { upTo: 35000, rate: 1.75 },
      { upTo: 40000, rate: 3.5 },
      { upTo: 75000, rate: 5.525 },
      { upTo: 500000, rate: 6.37 },
      { upTo: 1000000, rate: 8.97 },
      { upTo: Infinity, rate: 10.75 },
    ]),
  },
  NM: {
    name: 'New Mexico',
    ...g([
      { upTo: 5500, rate: 1.5 },
      { upTo: 16500, rate: 3.2 },
      { upTo: 33500, rate: 4.3 },
      { upTo: 66500, rate: 4.7 },
      { upTo: 210000, rate: 4.9 },
      { upTo: Infinity, rate: 5.9 },
    ]),
  },
  NY: {
    name: 'New York',
    ...g([
      { upTo: 8500, rate: 4 },
      { upTo: 11700, rate: 4.5 },
      { upTo: 13900, rate: 5.25 },
      { upTo: 80650, rate: 5.5 },
      { upTo: 215400, rate: 6 },
      { upTo: 1077550, rate: 6.85 },
      { upTo: 5000000, rate: 9.65 },
      { upTo: 25000000, rate: 10.3 },
      { upTo: Infinity, rate: 10.9 },
    ]),
  },
  NC: { name: 'North Carolina', ...flat(4.25) },
  ND: { name: 'North Dakota', ...g([{ upTo: 47150, rate: 0 }, { upTo: 238200, rate: 1.95 }, { upTo: Infinity, rate: 2.5 }]) },
  OH: { name: 'Ohio', ...g([{ upTo: 26050, rate: 0 }, { upTo: 100000, rate: 2.75 }, { upTo: Infinity, rate: 3.5 }]) },
  OK: {
    name: 'Oklahoma',
    ...g([
      { upTo: 1000, rate: 0.25 },
      { upTo: 2500, rate: 0.75 },
      { upTo: 3750, rate: 1.75 },
      { upTo: 4900, rate: 2.75 },
      { upTo: 7200, rate: 3.75 },
      { upTo: Infinity, rate: 4.75 },
    ]),
  },
  OR: {
    name: 'Oregon',
    ...g([{ upTo: 4300, rate: 4.75 }, { upTo: 10750, rate: 6.75 }, { upTo: 125000, rate: 8.75 }, { upTo: Infinity, rate: 9.9 }]),
  },
  PA: { name: 'Pennsylvania', ...flat(3.07) },
  RI: { name: 'Rhode Island', ...g([{ upTo: 77450, rate: 3.75 }, { upTo: 176050, rate: 4.75 }, { upTo: Infinity, rate: 5.99 }]) },
  SC: { name: 'South Carolina', ...g([{ upTo: 3460, rate: 0 }, { upTo: 17330, rate: 3 }, { upTo: Infinity, rate: 6.2 }]) },
  SD: { name: 'South Dakota', ...none },
  TN: { name: 'Tennessee', ...none },
  TX: { name: 'Texas', ...none },
  UT: { name: 'Utah', ...flat(4.55) },
  VT: {
    name: 'Vermont',
    ...g([{ upTo: 45400, rate: 3.35 }, { upTo: 110050, rate: 6.6 }, { upTo: 229550, rate: 7.6 }, { upTo: Infinity, rate: 8.75 }]),
  },
  VA: { name: 'Virginia', ...g([{ upTo: 3000, rate: 2 }, { upTo: 5000, rate: 3 }, { upTo: 17000, rate: 5 }, { upTo: Infinity, rate: 5.75 }]) },
  WA: { name: 'Washington', ...none }, // no wage income tax
  WV: {
    name: 'West Virginia',
    ...g([
      { upTo: 10000, rate: 2.36 },
      { upTo: 25000, rate: 3.15 },
      { upTo: 40000, rate: 3.54 },
      { upTo: 60000, rate: 4.72 },
      { upTo: Infinity, rate: 5.12 },
    ]),
  },
  WI: {
    name: 'Wisconsin',
    ...g([{ upTo: 14680, rate: 3.5 }, { upTo: 29370, rate: 4.4 }, { upTo: 323290, rate: 5.3 }, { upTo: Infinity, rate: 7.65 }]),
  },
  WY: { name: 'Wyoming', ...none },
  DC: {
    name: 'Washington, D.C.',
    ...g([
      { upTo: 10000, rate: 4 },
      { upTo: 40000, rate: 6 },
      { upTo: 60000, rate: 6.5 },
      { upTo: 250000, rate: 8.5 },
      { upTo: 500000, rate: 9.25 },
      { upTo: 1000000, rate: 9.75 },
      { upTo: Infinity, rate: 10.75 },
    ]),
  },
}

// State codes sorted by full state name, for the dropdown.
export const STATE_CODES = Object.keys(STATES).sort((a, b) =>
  STATES[a].name.localeCompare(STATES[b].name)
)

// ── Math ─────────────────────────────────────────────────────────────────────

/** Progressive tax on `income` given bracket entries { upTo, rate(percent) }. */
export function taxFromBrackets(income, brackets) {
  if (income <= 0) return 0
  let tax = 0
  let lower = 0
  for (const { upTo, rate } of brackets) {
    if (income <= lower) break
    const slice = Math.min(income, upTo) - lower
    tax += (slice * rate) / 100
    lower = upTo
  }
  return tax
}

/** Federal income tax on gross wages for a filing status. */
export function federalTax(gross, status) {
  const f = FEDERAL[status]
  const taxable = Math.max(0, gross - f.standardDeduction)
  return taxFromBrackets(taxable, f.brackets)
}

/** Employee-side FICA (Social Security + Medicare + additional Medicare). */
export function ficaTax(gross, status) {
  const ss = Math.min(gross, FICA.socialSecurityWageBase) * (FICA.socialSecurityRate / 100)
  const medicare = gross * (FICA.medicareRate / 100)
  const addlBase = Math.max(0, gross - FICA.additionalMedicareThreshold[status])
  const addl = addlBase * (FICA.additionalMedicareRate / 100)
  return { socialSecurity: ss, medicare: medicare + addl }
}

/** State income tax. MFJ doubles graduated thresholds (see file header). */
export function stateTax(gross, status, code) {
  const s = STATES[code]
  if (!s || s.type === 'none') return 0
  if (s.type === 'flat') return gross * (s.rate / 100)
  const brackets =
    status === 'married'
      ? s.brackets.map((b) => ({ upTo: b.upTo === Infinity ? Infinity : b.upTo * 2, rate: b.rate }))
      : s.brackets
  return taxFromBrackets(gross, brackets)
}

/** Full breakdown for an annual gross salary. All values are annual dollars. */
export function computeTakeHome(gross, status, code) {
  const federal = federalTax(gross, status)
  const { socialSecurity, medicare } = ficaTax(gross, status)
  const state = stateTax(gross, status, code)
  const totalTax = federal + socialSecurity + medicare + state
  const net = Math.max(0, gross - totalTax)
  return {
    gross,
    federal,
    socialSecurity,
    medicare,
    state,
    totalTax,
    net,
    effectiveRate: gross > 0 ? (totalTax / gross) * 100 : 0,
  }
}
