import { useCallback, useMemo } from "react";
import BoutiquesList from "../BoutiquesList/BoutiquesList";
import Spinner from "../ui/Spinner/Spinner";

import "./NearbyBoutiques.scss";

const block = "nearby-boutiques";

function NearbyBoutiques({
  boutiques,
  isFetching,
  isLocating,
  coordinates,
  radiusOptions = [],
  radius,
  onRadiusChange,
}) {
  const { latitude, longitude } = coordinates;

  const handleRadiusChange = useCallback(
    (event) => {
      if (onRadiusChange) {
        const number = Number.parseInt(event.target.value);
        onRadiusChange(number);
      }
    },
    [onRadiusChange]
  );

  return (
    <div className={block}>
      <Spinner show={isFetching}>Getting nearby boutiques</Spinner>
      <Spinner show={isLocating}>Getting your location</Spinner>

      {!isLocating && (
        <header className={`${block}__header`}>
          <span className={`${block}__location`}>
            Latitude: {latitude} Longitude: {longitude}{" "}
          </span>
          <div className={`${block}__radius-container`}>
            <label htmlFor="radius">Distance: </label>
            <select
              name="radius"
              id="radius"
              value={`${radius}`}
              onChange={handleRadiusChange}
            >
              {radiusOptions.map((value) => (
                <option key={value} value={`${value}`}>
                  {value} km
                </option>
              ))}
            </select>
          </div>
        </header>
      )}
      {!isFetching && <BoutiquesList boutiques={boutiques} />}
    </div>
  );
}

export default NearbyBoutiques;
