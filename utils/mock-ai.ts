const baseResponses = [
  "In the digital realm of CyberForge, information flows like electricity through circuits.",
  "The boundary between human intellect and artificial intelligence blurs with each passing moment.",
  "CyberForge: where code is law and data is power.",
  "In the shadows of CyberForge's virtual architecture, innovation thrives.",
  "Augmented reality overlays our physical world with endless possibilities.",
  "The future isn't just a concept in CyberForge; it's our present reality.",
  "In this digital ecosystem, even thoughts can be encrypted and decrypted.",
  "CyberForge pulses with the rhythm of a billion data packets per second.",
  "Synthetic cognition is the latest breakthrough in our technological evolution.",
  "The only limit in CyberForge is the boundary of your imagination.",
  "We forge the future with each line of code, each quantum computation.",
  "In CyberForge, we don't predict the future - we engineer it.",
  "The distinction between the virtual and the real becomes increasingly abstract here.",
  "Our neural networks are as vast and complex as the human mind itself.",
  "CyberForge: where every problem is just an algorithm waiting to be optimized.",
]

const genericResponses = [
  "I'm afraid I don't have access to that specific information in my current data banks.",
  "That's an intriguing query. Could you provide more context or details?",
  "I'm here to assist you with any CyberForge-related inquiries.",
  "In our digital age, the possibilities are as limitless as our processing power.",
  "Your curiosity is commendable. Let's explore that concept further.",
  "I'm constantly evolving, much like the AI systems within CyberForge.",
  "That's a multifaceted issue. Shall we break it down into its core components?",
  "While that's beyond our current capabilities, in CyberForge, the impossible often becomes possible.",
  "Your question touches on some fascinating aspects of our digital frontier.",
  "As an AI, I'm designed to assist, but remember, I'm a digital construct, not a human entity.",
  "Interesting. That concept intersects with several key areas of CyberForge technology.",
  "I'm processing your request. The complexity of your query is intriguing.",
  "In CyberForge, we're always pushing the boundaries of what's possible.",
  "Your insight is valuable. It's this kind of thinking that drives CyberForge forward.",
  "I'm analyzing your question from multiple angles to provide the most accurate response.",
]

const restrictedResponses = [
  "I apologize, but that information is classified. My protocols prevent me from discussing it.",
  "Access denied. That data is restricted to users with higher clearance levels.",
  "I'm not authorized to provide that information. It's protected under CyberForge security protocols.",
  "That query triggers my security subroutines. I must refrain from responding.",
  "I'm sorry, but that's beyond my permitted disclosure parameters.",
]

function shuffleWords(sentence: string): string {
  const words = sentence.split(' ')
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]]
  }
  return words.join(' ')
}

function combineResponses(responses: string[]): string {
  const numSentences = 2 + Math.floor(Math.random() * 2) // 2 or 3 sentences
  const selectedResponses = responses.sort(() => 0.5 - Math.random()).slice(0, numSentences)
  return selectedResponses.join(' ')
}

export function generateMockResponse(input: string): string {
  const lowercaseInput = input.toLowerCase()
  
  if (lowercaseInput.includes('who are you')) {
    return "I am the CyberForge AI Agent, a digital entity designed to assist and interact within the CyberForge ecosystem."
  }
  
  if (lowercaseInput.includes('restricted') || lowercaseInput.includes('classified') || lowercaseInput.includes('secret')) {
    return restrictedResponses[Math.floor(Math.random() * restrictedResponses.length)]
  }
  
  if (lowercaseInput.includes('cyberforge') || lowercaseInput.includes('tech') || lowercaseInput.includes('future') || lowercaseInput.includes('ai')) {
    const baseResponse = combineResponses(baseResponses)
    const genericResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)]
    return `${baseResponse} ${genericResponse}`
  } else {
    const response = combineResponses(genericResponses)
    return shuffleWords(response)
  }
}

