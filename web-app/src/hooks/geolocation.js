import { useCallback, useEffect, useState } from "react";

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState();
  const [error, setError] = useState();
  const [locating, setLocating] = useState(true);

  const hasPosition = coordinates != null;

  const onSuccess = useCallback((position) => {
    const { coords } = position;
    setCoordinates(coords);
    setLocating(false);
    setError(null);
  }, []);

  const onError = useCallback((error) => {
    setError(error);
    setLocating(false);
  }, []);

  const getPosition = useCallback(() => {
    setLocating(true);
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
