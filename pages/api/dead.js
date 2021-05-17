import {
  deadDictionary,
  deadAndCoDictionary
 } from '../../config/dictionary';

export default (req, res) => {
  const paragraphsRequest = req.query.numParagraphs || 3;
  const withDeadAndCo = req.query.withDeadAndCo || false;
  const jerryMode = req.query.jerryMode || false;

  let useDictionary = [...deadDictionary];
  if(withDeadAndCo === 'true') useDictionary.push(...deadAndCoDictionary);
  if(jerryMode === 'true') useDictionary = ['smile'];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchRandomWord = () => {
    return useDictionary[Math.floor(Math.random() * useDictionary.length)];
  }

  function totallyRandomIntFromInterval(min, max) { // min and max included 
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNum % 2 ? Math.abs(randomNum) : -Math.abs(randomNum);
  }

  const buildSentence = () => {
    const sentenceLengthModifier = totallyRandomIntFromInterval(10, 30);
    const maxSentenceCharacterCount = 100 + sentenceLengthModifier;
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
