export const simulateHack = async (target: string): Promise<{ output: string }> => {
  const steps = [
    'Initializing cyber-attack vectors...',
    'Bypassing firewalls...',
    'Cracking encryption...',
    'Injecting payload...',
    'Extracting data...',
    'Covering tracks...'
  ]

  let output = `Commencing hack on target: ${target}\n\n`

  for (const step of steps) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    output += step + '\n'
  }

  output += '\nHack completed successfully. Target compromised.'

  return { output }
}

