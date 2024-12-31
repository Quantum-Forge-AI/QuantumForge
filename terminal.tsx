'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Minus, Square } from 'lucide-react'
import { cn } from '@/lib/utils'
import { executeCommand, CommandResult } from './utils/commands'
import { simulateHack } from './utils/hacking'
import { generateArt } from './utils/ascii-art'
import { analyzeSentiment } from './utils/sentiment-analysis'
import { getAIResponse } from './utils/ai-assistant'

interface Command {
  input: string
  output: string
  error?: boolean
  isAI?: boolean
}

export default function Terminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Command[]>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const [isHacking, setIsHacking] = useState(false)
  const [isAIMode, setIsAIMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const handleCommand = async (cmd: string): Promise<CommandResult> => {
    if (isAIMode) {
      const aiResponse = await getAIResponse(cmd)
      return { output: aiResponse, isAI: true }
    }

    const parts = cmd.split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    switch (command) {
      case 'hack':
        setIsHacking(true)
        const result = await simulateHack(args[0] || 'random')
        setIsHacking(false)
        return result
      case 'ascii-art':
        return { output: generateArt(args.join(' ')) }
      case 'analyze':
        return { output: analyzeSentiment(args.join(' ')) }
      case 'quantum-compute':
        return { output: 'Simulating quantum computation...\nResult: Superposition achieved!' }
      case 'nanobot':
        return { output: `Deploying nanobots to ${args[0] || 'system'}...\nTask completed successfully.` }
      case 'ai-assist':
        setIsAIMode(true)
        return { output: 'CyberForge AI Agent activated. How may I assist you in our digital realm? (Type "exit" to end this interaction)' }
      default:
        return executeCommand(cmd)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const { output, error, isAI } = await handleCommand(input)
    setHistory([...history, { input, output, error, isAI }])
    setInput('')

    if (isAIMode && input.toLowerCase() === 'exit') {
      setIsAIMode(false)
      setHistory(prev => [...prev, { input: 'System', output: 'Exiting AI Assistant mode.', isAI: true }])
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className={cn(
        "w-full max-w-3xl bg-[#0a0a0a] rounded-lg overflow-hidden shadow-2xl",
        "border border-red-900/50 shadow-red-500/20",
        isMinimized ? "h-12" : "h-[80vh]"
      )}>
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 h-12 bg-[#1a1a1a] border-b border-red-900/30">
          <div className="text-red-500 font-mono">CyberForge@terminal:~</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-red-500/10 rounded-md text-red-500"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1.5 hover:bg-red-500/10 rounded-md text-red-500"
            >
              <Square className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.close()}
              className="p-1.5 hover:bg-red-500/10 rounded-md text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        {!isMinimized && (
          <div className="p-4 h-[calc(80vh-3rem)] overflow-auto" ref={terminalRef}>
            <div className="font-mono text-red-500 space-y-2">
              <div className="mb-4">
                Welcome to CyberForge Terminal v3.0.0
                <br />
                Type 'help' for available commands or 'ai-assist' to chat with the AI.
              </div>

              {/* Command History */}
              {history.map((cmd, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-red-700">{cmd.isAI ? 'AI>' : '$'}</span>
                    <span>{cmd.input}</span>
                  </div>
                  {cmd.output && (
                    <div className={cn(
                      "pl-6 whitespace-pre-wrap",
                      cmd.error ? "text-yellow-500" : cmd.isAI ? "text-green-400" : "text-red-400 opacity-90"
                    )}>
                      {cmd.output}
                    </div>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-red-700">{isAIMode ? 'AI>' : '$'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-red-500 font-mono"
                  autoFocus
                  disabled={isHacking}
                  placeholder={isAIMode ? "Engage with CyberForge AI (type 'exit' to disconnect)" : "Enter command..."}
                />
              </form>

              {/* Hacking Animation */}
              {isHacking && (
                <div className="text-green-500 animate-pulse">
                  Hacking in progress...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

