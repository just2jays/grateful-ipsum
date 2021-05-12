import dictionary from '../../config/dictionary';

export default (req, res) => {
  const paragraphsRequest = req.query.numParagraphs || 3;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchRandomWord = () => {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
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
