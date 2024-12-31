export interface CommandResult {
  output: string
  error?: boolean
  isAI?: boolean
}

export const executeCommand = (command: string): CommandResult => {
  const parts = command.split(' ')
  const cmd = parts[0].toLowerCase()
  const args = parts.slice(1)

  const handlers: { [key: string]: (args: string[]) => CommandResult } = {
    help: () => ({
      output: `
Available commands:
  help              - Show this help message
  clear             - Clear the terminal
  echo <message>    - Display a message
  time              - Show current time
  date              - Show current date
  ls                - List files and directories
  cat <file>        - Display file contents
  pwd               - Print working directory
  mkdir <dir>       - Create a new directory
  hack <target>     - Simulate a hacking attempt
  ascii-art <text>  - Generate ASCII art
  analyze <text>    - Perform sentiment analysis
  quantum-compute   - Simulate quantum computation
  nanobot <system>  - Deploy nanobots
  ai-assist         - Start AI Assistant chat mode
`.trim()
    }),
    clear: () => ({ output: '' }),
    echo: (args) => ({ output: args.join(' ') }),
    time: () => ({ output: new Date().toLocaleTimeString() }),
    date: () => ({ output: new Date().toLocaleDateString() }),
    ls: () => ({
      output: `
documents/
downloads/
projects/
system/
`.trim()
    }),
    cat: (args) => {
      if (args.length === 0) {
        return { output: 'Usage: cat <filename>', error: true }
      }
      const files: { [key: string]: string } = {
        'readme.txt': 'Welcome to CyberForge Terminal\nA next-generation command interface with AI assistance.',
        'help.txt': 'Type "help" for a list of available commands or "ai-assist" to chat with the AI.'
      }
      return files[args[0]]
        ? { output: files[args[0]] }
        : { output: `File not found: ${args[0]}`, error: true }
    },
    pwd: () => ({ output: '/home/guest' }),
    mkdir: (args) => {
      if (args.length === 0) {
        return { output: 'Usage: mkdir <directory>', error: true }
      }
      return { output: `Directory created: ${args[0]}` }
    }
  }

  if (handlers[cmd]) {
    return handlers[cmd](args)
  }

  return {
    output: `Command not found: ${cmd}. Type 'help' for available commands or 'ai-assist' to chat with the AI.`,
    error: true
  }
}

