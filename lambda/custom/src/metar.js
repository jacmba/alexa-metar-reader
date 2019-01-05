'use strict'

const getLetter = (language, phonLetter) => {
  const dictFile = `../dictionaries/${language}.json`
  const dictionary = require(dictFile)
  return dictionary[phonLetter]
}

const getMetar = icao => {
  return 'Metar ' + icao
}

module.exports = {getLetter, getMetar}