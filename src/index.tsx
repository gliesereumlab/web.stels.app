import './style/index.css'
import React from 'react';
import {Provider} from 'react-redux';
import App from './App';
import Error from './Error';
import store from "./app/store";
import usCreateRoot from "./utils/usCreateRoot";
import usGetConfig from "./utils/usGetConfig";
import {set} from "./app/configSlice";

(async (window) => {
  
  /**
   * Checks if the User-Agent string corresponds to an iPad, iPhone, or iPod.
   * If yes, it adds an event handler for 'wheel' events to prevent default actions when scaling.
   */
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    /**
     * Event handler for the 'wheel' event to prevent default actions when scaling.
     * @param {WheelEvent} e - The 'wheel' event.
     */
    window.document.addEventListener('wheel', (e: WheelEvent) => {
      // Checks if the delta mode is not equal to 1, prevents the action
      if (e.deltaMode !== 1) {
        e.preventDefault();
      }
    }, { passive: false });
  }
  
  /**
   * Event handler for the 'wheel' event to prevent default actions when scaling.
   * @param {WheelEvent} event - The 'wheel' event.
   */
  document.addEventListener('wheel', (event: WheelEvent) => {
    // Checks if the delta mode is greater than 1, prevents the action
    if (event.deltaMode > 1) {
      event.preventDefault();
    }
  }, false);
  
  
  const root = usCreateRoot();
  
  try {
    const config = await usGetConfig();
    store.dispatch(set(config));
    root.render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
  } catch (e) {
    root.render(
      <Error
        msg={"Error Application"}
        code={500}
      />
    );
  }
})(window);
