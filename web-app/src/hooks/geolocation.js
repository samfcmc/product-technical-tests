import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as geolocationActions } from "../slices/geolocation";
import { geolocation as geolocationSelectors } from "../selectors";

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
    window.navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [onSuccess, onError]);

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
