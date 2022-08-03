import NearbyBoutiques from "./NearbyBoutiques";
import { useGetAllBoutiquesQuery } from "../../services/boutiques";
import { useGeolocation } from "../../hooks/geolocation";
import { boutiques as boutiqueSelectors } from "../../selectors";
import { useSelector } from "react-redux";

export default function NearbyBoutiquesContainer() {
  const { hasPosition, locating } = useGeolocation();

  const { isFetching } = useGetAllBoutiquesQuery({}, { skip: !hasPosition });

  const boutiques = useSelector(boutiqueSelectors.nearbyBoutiques);

  return (
    <NearbyBoutiques
      boutiques={boutiques}
      isFetching={isFetching}
      isLocating={locating}
    />
  );
}
