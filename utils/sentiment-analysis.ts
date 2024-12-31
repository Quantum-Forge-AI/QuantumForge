export const analyzeSentiment = (text: string): string => {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic']
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'poor', 'disappointing']

  const words = text.toLowerCase().split(' ')
  let positiveCount = 0
  let negativeCount = 0

  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
  })

  let sentiment: string
  if (positiveCount > negativeCount) {
    sentiment = 'positive'
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative'
  } else {
    sentiment = 'neutral'
  }

  return `Sentiment analysis complete.\nPositive words: ${positiveCount}\nNegative words: ${negativeCount}\nOverall sentiment: ${sentiment}`
}

