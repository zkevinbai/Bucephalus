import { useEffect, useRef, useState } from 'react'
import { Btn, SegmentedControl } from '../toykit'
import { trackToyUse } from '../../../utils/analytics'

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
]

function getWinner(board) {
  for (const line of LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line }
    }
  }
  return null
}

/* Heuristic AI: win if possible, block a loss, take center, then a corner,
   then whatever's left. Beatable but not a pushover. */
function aiMove(board) {
  const empties = board.map((v, i) => (v ? null : i)).filter((i) => i !== null)
  const tryFind = (player) =>
    empties.find((i) => {
      const next = [...board]
      next[i] = player
      return getWinner(next)
    })
  const win = tryFind('O')
  if (win !== undefined) return win
  const block = tryFind('X')
  if (block !== undefined) return block
  if (board[4] === null) return 4
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null)
  if (corners.length) return corners[Math.floor(empties.length % corners.length)]
  return empties[0]
}

const emptyBoard = () => Array(9).fill(null)

export default function TicTacToe() {
  const [mode, setMode] = useState('ai') // 'ai' | 'pvp'
  const [history, setHistory] = useState([emptyBoard()])
  const [step, setStep] = useState(0)
  const [latestFirst, setLatestFirst] = useState(false)
  const reportedEnd = useRef(false)

  const board = history[step]
  const xIsNext = step % 2 === 0
  const winner = getWinner(board)
  const isDraw = !winner && board.every(Boolean)
  const atTip = step === history.length - 1
  const aiTurn = mode === 'ai' && !xIsNext && !winner && !isDraw

  const reset = (nextMode = mode) => {
    setHistory([emptyBoard()])
    setStep(0)
    setMode(nextMode)
    reportedEnd.current = false
  }

  const play = (i) => {
    if (board[i] || winner) return
    if (mode === 'ai' && !xIsNext) return // humans only place X vs the AI
    const next = [...board]
    next[i] = xIsNext ? 'X' : 'O'
    const newHistory = [...history.slice(0, step + 1), next]
    setHistory(newHistory)
    setStep(newHistory.length - 1)
  }

  // AI answers at the tip of history after a beat, so time-travel reviews stay quiet.
  useEffect(() => {
    if (!aiTurn || !atTip) return
    const id = setTimeout(() => {
      const move = aiMove(board)
      const next = [...board]
      next[move] = 'O'
      setHistory((h) => [...h.slice(0, step + 1), next])
      setStep(step + 1)
    }, 380)
    return () => clearTimeout(id)
  }, [aiTurn, atTip, board, step])

  // Report each finished game once.
  useEffect(() => {
    if ((winner || isDraw) && !reportedEnd.current) {
      reportedEnd.current = true
      trackToyUse('tic-tac-toe', 'game_over', {
        ttt_mode: mode,
        ttt_result: winner ? `${winner.player}_wins` : 'draw',
        ttt_moves: step,
      })
    }
    if (!winner && !isDraw) reportedEnd.current = false
  }, [winner, isDraw, mode, step])

  const status = winner
    ? `${winner.player} wins!`
    : isDraw
      ? 'Draw.'
      : aiTurn
        ? 'Claude-at-home is thinking…'
        : `${xIsNext ? 'X' : 'O'} to play${mode === 'ai' ? ' — that’s you' : ''}`

  // "Move #3 — X at r1c2": who moved and where, derived by diffing snapshots.
  const describeMove = (i) => {
    if (i === 0) return 'Game start'
    const idx = history[i].findIndex((v, j) => v !== history[i - 1][j])
    return `Move #${i} — ${history[i][idx]} at r${Math.floor(idx / 3) + 1}c${(idx % 3) + 1}`
  }

  const moveIndices = history.map((_, i) => i)
  if (latestFirst) moveIndices.reverse()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl
          options={[
            { value: 'ai', label: 'vs Computer' },
            { value: 'pvp', label: 'Two players' },
          ]}
          value={mode}
          onChange={(m) => reset(m)}
        />
        <Btn variant="ghost" onClick={() => reset()} className="ml-auto">
          <i className="fas fa-redo" aria-hidden /> New game
        </Btn>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,340px)_1fr]">
        {/* Board */}
        <div className="flex flex-col gap-3">
          <p
            className={`font-serif text-lg font-semibold ${
              winner ? 'text-clay-deep' : 'text-ink'
            }`}
            aria-live="polite"
          >
            {status}
          </p>
          <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-2">
            {board.map((cell, i) => {
              const inWin = winner?.line.includes(i)
              return (
                <button
                  key={i}
                  onClick={() => play(i)}
                  disabled={!!cell || !!winner || aiTurn}
                  aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ', empty'}`}
                  className={`flex items-center justify-center rounded-xl border font-serif text-5xl font-semibold transition-all duration-150 ${
                    inWin
                      ? 'border-clay bg-clay/15'
                      : 'border-line bg-white/60 hover:enabled:border-clay/60 hover:enabled:bg-white'
                  } ${cell === 'X' ? 'text-clay-deep' : 'text-ocean'} disabled:cursor-default`}
                >
                  {cell}
                </button>
              )
            })}
          </div>
        </div>

        {/* Time travel */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Time travel</p>
            <button
              onClick={() => setLatestFirst(!latestFirst)}
              className="text-xs font-medium text-clay-deep transition-colors hover:text-clay"
            >
              {latestFirst ? 'Latest first ↓' : 'Oldest first ↑'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Btn
              variant="ghost"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              aria-label="Back one move"
            >
              ←
            </Btn>
            <Btn
              variant="ghost"
              disabled={atTip}
              onClick={() => setStep(step + 1)}
              aria-label="Forward one move"
            >
              →
            </Btn>
            <span className="text-sm text-muted">
              Move {step} of {history.length - 1}
            </span>
          </div>
          <ol className="flex max-h-72 flex-col gap-1.5 overflow-y-auto pr-1">
            {moveIndices.map((i) =>
              i === step ? (
                <li
                  key={i}
                  className="rounded-lg bg-clay px-3 py-2 text-sm font-semibold text-white"
                  aria-current="step"
                >
                  You are here — {describeMove(i).toLowerCase()}
                </li>
              ) : (
                <li key={i}>
                  <button
                    onClick={() => setStep(i)}
                    className="w-full rounded-lg border border-line bg-white/60 px-3 py-2 text-left text-sm font-medium text-ink-soft transition-colors hover:border-clay/60 hover:text-clay-deep"
                  >
                    Go to {describeMove(i).toLowerCase()}
                  </button>
                </li>
              )
            )}
          </ol>
          <p className="text-sm leading-relaxed text-muted">
            Step back to any move and play a different line — the future re-writes from there.
            {mode === 'ai' && ' The computer picks up wherever you land.'}
          </p>
        </div>
      </div>
    </div>
  )
}
