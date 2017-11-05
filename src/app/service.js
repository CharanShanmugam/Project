import 'whatwg-fetch';
import { polyfill } from 'es6-promise';

polyfill();
const FIXER_API_URL = 'https://api.fixer.io/';
/* global fetch:true; */
export default async function getLatest(baseCurrency) {
  let fixerLatestRates = `${FIXER_API_URL}latest`;
  if (baseCurrency) {
    fixerLatestRates += `?base=${baseCurrency}`;
  }
  try {
    const response = await fetch(fixerLatestRates);
    return response.json();
  } catch (err) {
    return err;
  }
}
