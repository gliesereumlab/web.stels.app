import { useSelector } from "react-redux";
import get from "lodash/get";
import {RootState} from "../app/rootReducer";

/**
 * Custom React hook to select a value from the Redux store by a given key.
 *
 * @template T - The type of the value to select from the store.
 *
 * @param {string} key - The key (or path) to retrieve the value from the store.
 *
 * @returns {T | undefined} The value from the store corresponding to the provided key or `undefined` if not found.
 *
 * @throws {Error} Throws an error if no key is provided.
 *
 * @example
 * const username = useAppStore<string>("user.name");
 */

const useAppStore = <T = unknown>(key: string): T | undefined => {
  if (!key) {
    throw new Error("A key is required to use useAppStore.");
  }
  return useSelector<RootState, T | undefined>(state => get(state, key, undefined));
}


export default useAppStore;
