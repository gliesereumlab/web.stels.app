import useAppStore from "./useAppStore";
import { TypeConfig, TypePhrase } from "../types";

type ConvertedObject = { [key:string]: string };

/**
 * Represents a mapping from a language key to its value.
 * @typedef {Object} ConvertedObject
 * @property {string} [key] - The language key.
 */

/**
 * Converts an array of TypePhrase into an object representation.
 * @function
 * @param {TypePhrase[]} array - An array of language packs.
 * @param {'usKey'} key - The key to use as the object's key (always 'usKey' in this context).
 * @returns {ConvertedObject} An object where each key corresponds to a `usKey` from the TypePhrase and its value.
 */
const convertArrayToObject = (array: TypePhrase[], key: 'usKey'): ConvertedObject => {
  const initialValue: ConvertedObject = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item.usValue
    };
  }, initialValue);
};

/**
 * Custom React hook to get the language mapping from the store.
 * @function
 * @returns {ConvertedObject} An object that maps language keys to their corresponding values.
 */
const useLang = (langKey: string): ConvertedObject => {
  const { usLanguage } = useAppStore('root') as TypeConfig;
  
  // Find the language pack for the provided langKey
  const langPack = usLanguage.usPacks.find(pack => pack.usKey === langKey);
  
  // If no language pack is found for the provided key, return an empty object or handle the case accordingly
  if (!langPack) return {};
  
  return convertArrayToObject(langPack.usPhrases, 'usKey');
}

export default useLang;
