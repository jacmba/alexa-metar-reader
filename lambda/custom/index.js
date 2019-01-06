/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk')
const metar = require('./src/metar')

const MetarHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'MetarIntent')
  },
  async handle(handlerInput) {
    const lang = 'es'

    const f = x => y => metar.getLetter(x, y)
    const fLetter = f(lang)

    const slots = handlerInput.requestEnvelope.request.intent.slots
    const aSlot = slots.a.value
    const bSlot = slots.b.value
    const cSlot = slots.c.value
    const dSlot = slots.d.value
    const a = fLetter(aSlot)
    const b = fLetter(bSlot)
    const c = fLetter(cSlot)
    const d = fLetter(dSlot)
    const icao = a + b + c + d
    const airport = await metar.getAirport(icao)
    const info = await metar.getMetar(icao)
    const speechOutput = `Métar del aeropuerto ${airport}: ${metar.parseMetar(info)}`

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, info)
      .getResponse()
  },
}

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Hay un error to gordo.')
      .reprompt('Hay un error to gordo.')
      .getResponse();
  },
};

const SKILL_NAME = 'Lector Metar';
const HELP_MESSAGE = 'Te cuento algo o me largo?';
const HELP_REPROMPT = 'El cómo te puedo ayudar?';
const STOP_MESSAGE = 'Venga nos vemos, tanta gloria lleves como descanso dejas';

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    MetarHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();