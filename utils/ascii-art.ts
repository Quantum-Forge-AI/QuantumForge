export const generateArt = (text: string): string => {
  // This is a simple ASCII art generator. For a more complex one, you might want to use a library.
  const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.']
  
  const art = text.split('').map(char => {
    const index = char.charCodeAt(0) % asciiChars.length
    return asciiChars[index]
  }).join('')

  return art
}

