import "isomorphic-fetch";
import { TypeConfig, TypeFetchError } from "../types";

/** @typedef {TypeConfig} ConfigType */

/**
 * Fetches the application configuration.
 * First, it tries to fetch the configuration from an endpoint.
 * If the fetching is successful, it will attempt to retrieve the configuration from local storage.
 * If the configuration is not found in local storage, it will store the fetched configuration and return it.
 *
 * @function
 * @async
 * @returns {Promise<ConfigType>} The configuration object.
 * @throws {Error} Throws an error if the fetching fails.
 */

export default async function usGetConfig(): Promise<TypeConfig> {
  try {
    const response = await fetch(process.env.REACT_APP_CONFIG!);
    
    if (!response.ok) {
      /** @type {TypeFetchError} */
      const error = {
        message: `HTTP error! Status: ${response.status}`,
        status: response.status,
        type: 'FETCH_ERROR'
      };
      throw error;
    }
    
    /** @type {ConfigType} */
    const result = await response.json();
    
    const localStorageKey = result.usDataStorage.usKeys.usAppConfig;
    
    const storedConfig = localStorage.getItem(localStorageKey);
    
    if (storedConfig) {
      localStorage.setItem(localStorageKey, JSON.stringify(result));
      return JSON.parse(storedConfig);
    }
    
    localStorage.setItem(localStorageKey, JSON.stringify(result));
    
    return result;
    
  } catch (e) {
    throw new Error("Error while fetching config");
  }
}
