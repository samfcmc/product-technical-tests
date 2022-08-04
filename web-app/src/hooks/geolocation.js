import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as geolocationActions } from "../slices/geolocation";
import { geolocation as geolocationSelectors } from "../selectors";

/**
 * @typedef {Object} Position
 * @property {Number} latitude - the latitude coordinate
 * @property {Number} longitude - the longitude coordinate
 */
/**
 * @typedef {Object} GeolocationResult
 * @property {Position} coordinates - the pair of coordinates from the current user's location
 * @property {GeolocationPositionError} error - the error happened when trying to get geolocation data from the browser, if there is any
 * @property {boolean} locating - flag that is true if the geolocation was requested and we are waiting for the browser to get it
 * @property {boolean} hasPosition - flag that is true when there is already a geolocation available
 * @property {Function} getPosition - function that can be called to force getting the geolocation. Can be useful if we want to allow the user to try again after there was an error
 */
/**
 
 * useGeolocation: hook that returns information about
 * the user's current geolocation
 * @returns {GeolocationResult} - the geolocation data
 */
export function useGeolocation() {
  const dispatch = useDispatch();
  const coordinates = useSelector(geolocationSelectors.coordinates);
  const error = useSelector(geolocationSelectors.error);
  const locating = useSelector(geolocationSelectors.locating);
  const hasPosition = useSelector(geolocationSelectors.hasPosition);

  useEffect(() => {
    if (!hasPosition) {
      dispatch(geolocationActions.geolocationRequested());
    }
  }, [hasPosition, dispatch]);

  const onSuccess = useCallback(
    (position) => {
      const { coords } = position;
      const { latitude, longitude } = coords;
      dispatch(geolocationActions.geolocationSuccess({ latitude, longitude }));
    },
    [dispatch]
  );

  const onError = useCallback(
    (error) => {
      const { code, message } = error;
      dispatch(geolocationActions.geolocationFailed({ code, message }));
    },
    [dispatch]
  );

  const getPosition = useCallback(() => {
    dispatch(geolocationActions.geolocationRequested());
    window.navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [onSuccess, onError, dispatch]);

  useEffect(() => {
    const watcher = window.navigator.geolocation.watchPosition(
      onSuccess,
      onError
    );
    return () => {
      window.navigator.geolocation.clearWatch(watcher);
    };
  }, [onSuccess, onError]);

  return { coordinates, error, locating, hasPosition, getPosition };
}

export const Error = {
  PERMISSION_DENIED: window.GeolocationPositionError.PERMISSION_DENIED,
  POSITION_UNAVAILABLE: window.GeolocationPositionError.POSITION_UNAVAILABLE,
  TIMEOUT: window.GeolocationPositionError.TIMEOUT,
};
