import { useGeolocation } from "../hooks/geolocation";

function NearbyBoutiques() {
  const { coordinates, getPosition, error, locating, hasPosition } =
    useGeolocation();

  const { latitude, longitude } = hasPosition ? coordinates : {};

  return (
    <div>
      <button onClick={getPosition}>See nearby boutiques</button>
      <span>{error && error.code}</span>
      <span>{locating && <>Locating</>}</span>
      {hasPosition && (
        <span>
          Latitude: {latitude} Longitude: {longitude}
        </span>
      )}
      <ul></ul>
    </div>
  );
}

export default NearbyBoutiques;
