import { lazy } from 'react'
import WordCounter from './tools/WordCounter'
import TextDiff from './tools/TextDiff'
import JsonFormatter from './tools/JsonFormatter'
import ColorConverter from './tools/ColorConverter'
import UuidGenerator from './tools/UuidGenerator'
import SqlFormatter from './tools/SqlFormatter'
import TicTacToe from './tools/TicTacToe'
import TimeZonePicker from './tools/TimeZonePicker'
import FlightPath from './tools/FlightPath'
import CompCalculator from './tools/CompCalculator'
import InflationCalculator from './tools/InflationCalculator'
import UnitConverter from './tools/UnitConverter'
import CurrencyConverter from './tools/CurrencyConverter'
import SizeConverter from './tools/SizeConverter'
import SavingsGrowth from './tools/SavingsGrowth'

// Lazy so the Anthropic SDK only downloads when someone opens an AI toy.
const ClaudeChat = lazy(() => import('./tools/ClaudeChat'))
const ClaudeAgent = lazy(() => import('./tools/ClaudeAgent'))
const ClaudeTeam = lazy(() => import('./tools/ClaudeTeam'))
const ClaudeVision = lazy(() => import('./tools/ClaudeVision'))

/* The toy registry. Adding a toy is a single entry here:
   - `Component` toys render inside the shared ToyLayout at /apps/:slug
   - `path` toys (e.g. the Zodiac) own their full page and route
   - `narrow` toys keep the reading-width column on desktop instead of the full page */
export const toys = [
  {
    slug: 'claude-chat',
    name: 'Claude Chat',
    blurb: 'A streaming chat playground for experimenting with Claude — pick a model, set a system prompt, bring your own key.',
    category: 'AI',
    icon: 'fas fa-comment-dots',
    accent: 'text-clay',
    Component: ClaudeChat,
  },
  {
    slug: 'research-agent',
    name: 'Research Agent',
    blurb: 'Give Claude a question and watch it run live web searches, then answer with cited sources — an agent using tools, not just a chat.',
    category: 'AI',
    icon: 'fas fa-robot',
    accent: 'text-clay',
    Component: ClaudeAgent,
  },
  {
    slug: 'agent-team',
    name: 'Agent Team',
    blurb: 'One lead agent delegates to specialist subagents — a researcher, a writer, a critic — then synthesizes their work, live in your browser.',
    category: 'AI',
    icon: 'fas fa-sitemap',
    accent: 'text-clay',
    Component: ClaudeTeam,
  },
  {
    slug: 'claude-vision',
    name: 'Claude Vision',
    blurb: 'Drop in any image and ask Claude about it — describe a scene, pull text out of a screenshot, read a chart, write alt text.',
    category: 'AI',
    icon: 'fas fa-eye',
    accent: 'text-clay',
    Component: ClaudeVision,
  },
  {
    slug: 'word-counter',
    name: 'Word & Character Counter',
    blurb: 'Live word, character, sentence, and reading-time counts.',
    category: 'Text',
    icon: 'fas fa-pen-nib',
    accent: 'text-clay',
    Component: WordCounter,
  },
  {
    slug: 'text-diff',
    name: 'Text Diff / Compare',
    blurb: 'Paste two versions and see exactly what changed, line by line.',
    category: 'Text',
    icon: 'fas fa-not-equal',
    accent: 'text-clay',
    Component: TextDiff,
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    blurb: 'Pretty-print, validate, and minify JSON with error positions.',
    category: 'Developer',
    icon: 'fas fa-code',
    accent: 'text-ocean',
    Component: JsonFormatter,
  },
  {
    slug: 'sql-formatter',
    name: 'SQL Formatter',
    blurb: 'Format messy queries across Postgres, MySQL, BigQuery, and Spark dialects.',
    category: 'Developer',
    icon: 'fas fa-database',
    accent: 'text-ocean',
    Component: SqlFormatter,
  },
  {
    slug: 'uuid',
    name: 'UUID Generator',
    blurb: 'Generate cryptographically random UUID v4s in bulk.',
    category: 'Developer',
    icon: 'fas fa-fingerprint',
    accent: 'text-ocean',
    narrow: true,
    Component: UuidGenerator,
  },
  {
    slug: 'color',
    name: 'Color Converter',
    blurb: 'Pick and convert colors across hex, RGB, and HSL, with tints and shades.',
    category: 'Developer',
    icon: 'fas fa-palette',
    accent: 'text-ocean',
    Component: ColorConverter,
  },
  {
    slug: 'timezones',
    name: 'Time Zone Picker',
    blurb: 'Line up cities across time zones at a glance, the way you actually schedule.',
    category: 'Time zones',
    icon: 'fas fa-globe',
    accent: 'text-sage',
    Component: TimeZonePicker,
  },
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    blurb: 'Convert between 30 world currencies at live European Central Bank rates.',
    category: 'Money',
    icon: 'fas fa-coins',
    accent: 'text-gold',
    Component: CurrencyConverter,
  },
  {
    slug: 'comp',
    name: 'Comp Calculator',
    blurb: 'Convert any salary across hourly, weekly, and monthly — then see your estimated take-home pay by state.',
    category: 'Money',
    icon: 'fas fa-wallet',
    accent: 'text-gold',
    Component: CompCalculator,
  },
  {
    slug: 'inflation',
    name: 'Inflation Time Machine',
    blurb: 'See what a dollar from any year is worth today — buying power across a century of CPI.',
    category: 'Money',
    icon: 'fas fa-hand-holding-usd',
    accent: 'text-gold',
    Component: InflationCalculator,
  },
  {
    slug: 'savings-growth',
    name: 'Savings Growth',
    blurb: 'See how regular saving compounds — set a rate and watch the balance outgrow what you put in.',
    category: 'Money',
    icon: 'fas fa-piggy-bank',
    accent: 'text-gold',
    Component: SavingsGrowth,
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    blurb: 'Convert across length, mass, temperature, volume, data, energy, and more — sixteen kinds of unit in one place.',
    category: 'Convert',
    icon: 'fas fa-exchange-alt',
    accent: 'text-ocean',
    Component: UnitConverter,
  },
  {
    slug: 'size-converter',
    name: 'Clothing & Shoe Sizes',
    blurb: 'Convert clothing and shoe sizes across US, UK, and EU — for men and women.',
    category: 'Convert',
    icon: 'fas fa-tshirt',
    accent: 'text-ocean',
    Component: SizeConverter,
  },
  {
    slug: 'flight-path',
    name: 'Flight Path',
    blurb: 'Pick a route and departure time — watch it arc across the map and land in local time.',
    category: 'Time zones',
    icon: 'fas fa-plane',
    accent: 'text-sage',
    Component: FlightPath,
  },
  {
    slug: 'tic-tac-toe',
    name: 'Time Travel Tic Tac Toe',
    blurb: 'Play the computer or a friend — and rewind any move to rewrite history.',
    category: 'Fun',
    icon: 'fas fa-history',
    accent: 'text-plum',
    narrow: true,
    Component: TicTacToe,
  },
  {
    slug: 'zodiac',
    name: 'Chinese Zodiac',
    blurb: 'Look up any year’s animal and element, and what they mean.',
    category: 'Fun',
    icon: 'fas fa-dragon',
    accent: 'text-plum',
    path: '/apps/zodiac',
  },
]

const CATEGORY_ORDER = ['Time zones', 'Convert', 'Money', 'Text', 'AI', 'Fun', 'Developer']

export function toysByCategory() {
  return CATEGORY_ORDER.filter((c) => toys.some((t) => t.category === c)).map((category) => ({
    category,
    items: toys.filter((t) => t.category === category),
  }))
}

export function getToy(slug) {
  return toys.find((t) => t.slug === slug)
}
