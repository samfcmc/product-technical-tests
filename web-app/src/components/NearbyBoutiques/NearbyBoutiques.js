import { useCallback, useMemo } from "react";
import BoutiquesList from "../BoutiquesList/BoutiquesList";
import Button from "../ui/Button/Button";
import Error from "../ui/Error/Error";
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
  positionError,
  fetchingError,
  onRadiusChange,
  onTryLocationAgain,
  onTryFetchBoutiquesAgain,
}) {
  const { latitude, longitude } = coordinates;
  const hasPosition = !isLocating && latitude != null && longitude != null;

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
      <Spinner show={isLocating}>Getting your location...</Spinner>

      {!isLocating && (
        <header className={`${block}__header`}>
          <span className={`${block}__location`}>
            {hasPosition ? (
              <>
                Latitude: {latitude} Longitude: {longitude}{" "}
              </>
            ) : (
              <>No location available</>
            )}
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
      {!isFetching && !positionError && !fetchingError && !isLocating && (
        <BoutiquesList boutiques={boutiques} />
      )}
      {positionError && (
        <Error cta={<Button onClick={onTryLocationAgain}>Try again</Button>}>
          It was not possible to get your location. Change your browser settings
          and try again
        </Error>
      )}
      {fetchingError && (
        <Error
          cta={<Button onClick={onTryFetchBoutiquesAgain}>Try again</Button>}
        >
          There was an error fetching nearby boutiques. Try again
        </Error>
      )}
    </div>
  );
}

export default NearbyBoutiques;
