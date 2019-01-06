'use strict'

const request = require('request-promise')

const AIRPORTS_ADDRESS = 'http://airports.api.jazbelt.net'
const METAR_ADDRESS = 'http://metar.api.jazbelt.net'

const buildOpt = uri => ({
  uri: uri,
  json: true
})

const getLetter = (language, phonLetter) => {
  const dictFile = `../dictionaries/${language}.json`
  const dictionary = require(dictFile)
  return dictionary[phonLetter]
}

const getAirport = async icao => {
  const uri = AIRPORTS_ADDRESS + '/airport/' + icao
  const opt = buildOpt(uri)

  const airport = await request(opt)
  return airport[0].name
}

const getMetar = async icao => {
  const uri = METAR_ADDRESS + '/metar/' + icao
  const opt = buildOpt(uri)

  const metar = await request(opt)
  return metar
}

const parseMetar = metar =>
  metar.split('').join(' ')

module.exports = {getLetter, getAirport, getMetar, parseMetar}