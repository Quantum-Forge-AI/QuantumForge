import { generateMockResponse } from './mock-ai'

export async function getAIResponse(input: string): Promise<string> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500))
    
    return generateMockResponse(input)
  } catch (error) {
    console.error('Error generating AI response:', error)
    return "I apologize, but I'm experiencing a temporary malfunction. Please try again later."
  }
}

