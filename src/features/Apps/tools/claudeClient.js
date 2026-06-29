import Anthropic from '@anthropic-ai/sdk'

/* Key resolution for the in-browser Claude playground.
   Two sources, in priority order:
     1. A key the visitor pasted in, kept in localStorage (works anywhere, incl. prod).
     2. VITE_ANTHROPIC_API_KEY from .env.local — only present during local `npm run dev`.
        It is NOT bundled into the GitHub Pages production build (.env.local is gitignored
        and absent from CI), so the deployed site always falls back to bring-your-own-key.

   The key never leaves the browser except in the direct call to api.anthropic.com. */

const STORAGE_KEY = 'anthropic_api_key'

const envKey = import.meta.env.VITE_ANTHROPIC_API_KEY || ''

export function getStoredKey() {
  try {
    return localStorage.getItem(STORAGE_KEY) || ''
  } catch {
    return ''
  }
}

export function setStoredKey(key) {
  try {
    if (key) localStorage.setItem(STORAGE_KEY, key)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* storage unavailable — no-op */
  }
}

/** The key we'll actually use: a pasted/stored key wins, else the local dev env key. */
export function resolveKey() {
  return getStoredKey() || envKey
}

/** True when a usable key came from .env.local rather than the visitor pasting one. */
export function hasEnvKey() {
  return Boolean(envKey)
}

export function makeClient(key) {
  // dangerouslyAllowBrowser is required for a backend-less static site. It makes the
  // SDK call the API directly from the page (and set the direct-browser-access header).
  // Acceptable here because the key is the user's own, lives only in their browser.
  return new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true })
}

/* Models offered in the picker. Pricing is $ per 1M tokens (input / output),
   used only for the local cost estimate. `accent` is a palette token used to
   color-code each model's responses. */
export const MODELS = [
  { id: 'claude-opus-4-8', label: 'Opus 4.8', blurb: 'Most capable', accent: 'clay', inPrice: 5, outPrice: 25 },
  { id: 'claude-sonnet-4-6', label: 'Sonnet 4.6', blurb: 'Balanced', accent: 'ocean', inPrice: 3, outPrice: 15 },
  { id: 'claude-haiku-4-5', label: 'Haiku 4.5', blurb: 'Fastest', accent: 'sage', inPrice: 1, outPrice: 5 },
]

export function modelFor(modelId) {
  return MODELS.find((m) => m.id === modelId) || MODELS[0]
}

// Back-compat alias — pricing helper.
export const priceFor = modelFor
