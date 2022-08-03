import NearbyBoutiques from "./NearbyBoutiques";
import { useGetAllBoutiquesQuery } from "../../services/boutiques";
import { useGeolocation } from "../../hooks/geolocation";
import { boutiques as boutiqueSelectors } from "../../selectors";
import { useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";

const RADIUS_OPTIONS_KM = [20, 50, 100, 150, 200];

export default function NearbyBoutiquesContainer() {
  const {
    hasPosition,
    locating,
    coordinates = {},
    error: positionError,
    getPosition,
  } = useGeolocation();
  const [radius, setRadius] = useState(RADIUS_OPTIONS_KM[0]);

  const {
    isFetching,
    refetch,
    error: fetchingError,
  } = useGetAllBoutiquesQuery({}, { skip: !hasPosition });

  const getNearbyBoutiques = useSelector(boutiqueSelectors.getNearbyBoutiques);

  const onRadiusChange = useCallback((radius) => {
    setRadius(radius);
  }, []);

  const boutiques = useMemo(
    () => getNearbyBoutiques(radius * 1000),
    [radius, getNearbyBoutiques]
  );

  const onTryLocationAgain = useCallback(() => {
    getPosition();
  }, [getPosition]);

  const onTryFetchBoutiquesAgain = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <NearbyBoutiques
      boutiques={boutiques}
      isFetching={isFetching}
      isLocating={locating}
      coordinates={coordinates}
      radiusOptions={RADIUS_OPTIONS_KM}
      radius={radius}
      onRadiusChange={onRadiusChange}
      positionError={positionError}
      fetchingError={fetchingError}
      onTryLocationAgain={onTryLocationAgain}
      onTryFetchBoutiquesAgain={onTryFetchBoutiquesAgain}
    />
  );
}
