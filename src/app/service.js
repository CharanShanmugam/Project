import 'whatwg-fetch';
import { polyfill } from 'es6-promise'; polyfill();

const FIXER_API_URL = 'https://api.fixer.io/';

export async function getLatest(baseCurrency?: string) {
  let fixerLatestRates = FIXER_API_URL + 'latest';
  
  if (baseCurrency) {
    fixerLatestRates += '?base=' + baseCurrency;
  }
  try {
    let response = await fetch(fixerLatestRates);
    return response.json();
  } catch (err) {
    return err;
  }
};