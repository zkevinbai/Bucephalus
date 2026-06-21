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

// Lazy so the Anthropic SDK only downloads when someone opens an AI toy.
const ClaudeChat = lazy(() => import('./tools/ClaudeChat'))
const ClaudeAgent = lazy(() => import('./tools/ClaudeAgent'))
const ClaudeTeam = lazy(() => import('./tools/ClaudeTeam'))

/* The toy registry. Adding a toy is a single entry here:
   - `Component` toys render inside the shared ToyLayout at /toys/:slug
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
    path: '/toys/zodiac',
  },
]

const CATEGORY_ORDER = ['Time zones', 'Text', 'Developer', 'AI', 'Fun']

export function toysByCategory() {
  return CATEGORY_ORDER.filter((c) => toys.some((t) => t.category === c)).map((category) => ({
    category,
    items: toys.filter((t) => t.category === category),
  }))
}

export function getToy(slug) {
  return toys.find((t) => t.slug === slug)
}
