import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import {reset, set, update} from "../app/configSlice"

/**
 * An object containing Redux action creators.
 *
 * Currently, this object is empty, but action creators can be added here.
 */
const actions = {
   reset, set, update
}

console.log(actions)

/**
 * Type definition for the actions bound to the dispatch function.
 *
 * @template BoundActions - Maps the keys of the 'actions' object to their dispatch-bound function signatures.
 */
type BoundActions = {
  [K in keyof typeof actions]: (...args: any[]) => void;
};

/**
 * Custom React hook to bind action creators to the dispatch function.
 *
 * This hook returns the 'actions' object, but with every action creator wrapped
 * to dispatch its action when called.
 *
 * @returns {BoundActions} The 'actions' object with each action creator bound to the dispatch function.
 *
 * @example
 * const { someAction } = useActions();
 * someAction(arg1, arg2);
 */
const useActions = (): BoundActions => {
  const dispatch: Dispatch = useDispatch();
  
  return useMemo(() =>
      bindActionCreators(actions, dispatch) as BoundActions,
    [dispatch]
  );
}

export default useActions;
