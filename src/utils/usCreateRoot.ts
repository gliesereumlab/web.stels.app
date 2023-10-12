import {Root, createRoot} from "react-dom/client";

/**
 * Creates and initializes a new React Root on the document body.
 *
 * This function creates a new DOM element, appends it to the document body,
 * and then initializes a new React concurrent Root with it.
 *
 * @returns {Root} A new React concurrent Root.
 *
 * @throws {Error} Throws an error if the creation of the React Root fails.
 *
 * @example
 * const reactRoot = usCreateRoot();
 */
export default function usCreateRoot(): Root {
  try {
    const root = document.createElement('div');
    document.body.appendChild(root);
    return createRoot(root);
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create React Root");
  }
}
