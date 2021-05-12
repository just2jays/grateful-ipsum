// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const wordArray = [
  'Bobby',
  'Jerry',
  'Phil',
  'Mickey',
  'Bill',
  'Billy',
  'Lesh',
  'Garcia',
  'Weir',
  'Hart',
  'Kreutzmann',
  'Grateful Dead',
  'wall of sound',
  'sugaree',
  'sugar magnolia',
  'red whiskey',
  'Bertha',
  'dancing',
  'terrapin station',
  'inspiration',
  'smile',
  'Barton hall',
  'on the bus',
  'acid test',
  'pigpen',
  'Ron',
  'McKernan',
  'alligator',
  'wolf',
  'dire wolf',
  'tiger',
  'rosebud',
  'lazy lightning',
  'bolt',
  'stealie',
];

export default (req, res) => {
  const paragraphsRequest = req.query.numParagraphs || 3;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchRandomWord = () => {
    return wordArray[Math.floor(Math.random() * wordArray.length)];
  }

  const buildSentence = () => {
    const maxSentenceCharacterCount = 100;
    let currentCharacterCount = 0;
    let sentenceWordArray = [];
    while (currentCharacterCount < maxSentenceCharacterCount) {
      const currentWord = fetchRandomWord();
      sentenceWordArray.push(currentWord)
      currentCharacterCount += currentWord.length;
    }
    const firstWord = sentenceWordArray.shift();
    return `${capitalizeFirstLetter(firstWord)} ${sentenceWordArray.join (' ')}. `;
  }

  const buildParagraph = (asString = false) => {
    let paragraphSentenceArray = [];
    const numSentencesInParagraph = 4;
    for (let index = 0; index < numSentencesInParagraph; index++) {
      paragraphSentenceArray.push(buildSentence());
    }
    if(asString){
      return paragraphSentenceArray.join(' ');
    }
    return paragraphSentenceArray;
  }

  let finalResponse = [];
  for (let index = 0; index < paragraphsRequest; index++) {
    finalResponse.push(buildParagraph());
  }

  res.status(200).json({ stuff: finalResponse })
}
