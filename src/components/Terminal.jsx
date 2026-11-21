import { useCallback, useEffect, useRef, useState } from 'react'
import { portfolio } from '../data/portfolio'

const PROMPT = 'rishabh@portfolio:~$'

const WELCOME = [
  { type: 'system', text: 'CYBER // RISHABH — interactive shell v1.0' },
  { type: 'muted', text: 'session: guest · access: read-only' },
  { type: 'muted', text: 'commands: help · history: ↑ ↓' },
]

const HELP_LINES = [
  'help      Show this list of commands',
  'about     Who Rishabh is and what he studies',
  'skills    Skills grouped by category',
  'projects  Current project and visibility',
  'labs      Learning-lab status overview',
  'contact   Configured contact channels',
  'clear     Clear the terminal output',
]

function line(type, text) {
  return { type, text }
}

/**
 * A deliberately closed command registry: user input is matched against a
 * fixed list of functions. No shell, no eval, no arbitrary JavaScript.
 */
const COMMANDS = {
  help: () => [
    line('system', 'Available commands:'),
    ...HELP_LINES.map((text) => line('output', `  ${text}`)),
  ],
  about: () => [
    line('system', '// operator.profile'),
    line('output', `name       ${portfolio.identity.name}`),
    line('output', `role       ${portfolio.identity.primaryRole}`),
    line('output', `education  ${portfolio.education.degree}`),
    line('output', `institute  ${portfolio.education.institution}`),
    line('output', `status     ${portfolio.education.status}`),
  ],
  skills: () => [
    line('system', '// skills --all'),
    ...portfolio.skills.flatMap((group) => [
      line('accent', `[${group.title}]`),
      ...group.items.map((item) => line('output', `  ${item.name} — ${item.level}`)),
    ]),
  ],
  projects: () => [
    line('system', '// projects'),
    line('accent', `${portfolio.projects.featured.name} — ${portfolio.projects.featured.category}`),
    line('output', `  status: ${portfolio.projects.featured.visibility}`),
    line('output', `  stack: ${portfolio.projects.featured.technologies.join(', ')}`),
    line('muted', `  ${portfolio.projects.future.length} future project slots are intentionally empty.`),
  ],
  labs: () => [
    line('system', '// security-labs --status'),
    ...portfolio.labs.entries.map((lab) =>
      line('output', `  [${lab.status}] ${lab.name}`),
    ),
    line('muted', '  No lab is marked completed yet.'),
  ],
  contact: () => {
    const channels = [
      portfolio.contact.email && `email     ${portfolio.contact.email}`,
      portfolio.contact.github && `github    ${portfolio.contact.github}`,
      portfolio.contact.linkedin && `linkedin  ${portfolio.contact.linkedin}`,
    ].filter(Boolean)

    if (channels.length === 0) {
      return [
        line('system', '// contact'),
        line('output', 'No public contact channels are configured yet.'),
        line('muted', 'The contact form reports honestly when no backend is connected.'),
      ]
    }

    return [
      line('system', '// contact'),
      ...channels.map((channel) => line('output', channel)),
    ]
  },
}

const LINE_STYLES = {
  system: 'text-neon',
  accent: 'text-[#8fffc1]',
  input: 'text-bright',
  output: 'text-muted',
  muted: 'text-[#6f7f76]',
  error: 'text-red-400',
}

const MAX_LINES = 180

export default function Terminal({ className = '' }) {
  const [lines, setLines] = useState(WELCOME)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const inputRef = useRef(null)
  const outputRef = useRef(null)

  useEffect(() => {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const runCommand = useCallback((raw) => {
    const trimmed = raw.trim().slice(0, 80)
    const [command] = trimmed.toLowerCase().split(/\s+/)

    if (!trimmed) return
    setHistory((prev) => [...prev.slice(-30), trimmed])
    setHistoryIndex(-1)

    if (command === 'clear') {
      setLines(WELCOME)
      return
    }

    const echo = line('input', `${PROMPT} ${trimmed}`)
    const handler = Object.prototype.hasOwnProperty.call(COMMANDS, command)
      ? COMMANDS[command]
      : null

    const response = handler
      ? handler()
      : [
          line('error', `command not found: ${command}`),
          line('muted', 'Type "help" for the supported commands.'),
        ]

    setLines((prev) => [...prev, echo, ...response].slice(-MAX_LINES))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    runCommand(value)
    setValue('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const nextIndex =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setValue(history[nextIndex] ?? '')
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(-1)
        setValue('')
      } else {
        setHistoryIndex(nextIndex)
        setValue(history[nextIndex] ?? '')
      }
    }
  }

  return (
    <div
      className={`overflow-hidden bg-[#0a120e] ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-line bg-[#0f1a14] px-3.5 py-2.5">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            <span className="ml-2 min-w-0 truncate font-mono text-[10px] text-muted sm:text-[11px]">
          {PROMPT.replace('$', '')} — bash
        </span>
        <span className="ml-auto hidden shrink-0 font-mono text-[10px] text-[#5d6e64] sm:inline">
          safe shell
        </span>
      </div>

      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="h-[246px] overflow-y-auto px-3.5 py-3 font-mono text-[11.5px] leading-[1.7] sm:h-[272px] sm:text-xs"
      >
        {lines.map((entry, index) => (
          <div
            key={`${index}-${entry.text}`}
            className={`whitespace-pre-wrap [overflow-wrap:anywhere] ${LINE_STYLES[entry.type] ?? 'text-muted'}`}
          >
            {entry.text}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-2">
          <label htmlFor="terminal-command" className="sr-only">
            Terminal command
          </label>
          <span aria-hidden="true" className="shrink-0 text-neon">
            {PROMPT}
          </span>
          <input
            ref={inputRef}
            id="terminal-command"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value.slice(0, 80))}
            onKeyDown={handleKeyDown}
            className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-xs text-bright caret-neon placeholder:text-[#4d5d54] focus:outline-none"
            placeholder="type help"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            maxLength={80}
            aria-describedby="terminal-hint"
          />
        </form>

        <p id="terminal-hint" className="sr-only">
          Supported commands are help, about, skills, projects, labs, contact, and clear. Use the up
          and down arrow keys to browse previous commands.
        </p>
      </div>
    </div>
  )
}
