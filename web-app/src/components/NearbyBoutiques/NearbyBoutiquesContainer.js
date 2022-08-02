import NearbyBoutiques from "./NearbyBoutiques";
import { useGetNearbyBoutiquesQuery } from "../../services/boutiques";
import { useGeolocation } from "../../hooks/geolocation";

const BOUTIQUES_LIMIT = 5;
export default function NearbyBoutiquesContainer() {
  const { coordinates, hasPosition, locating } = useGeolocation();
  const { latitude, longitude } = hasPosition ? coordinates : {};

  const { data = {}, isFetching } = useGetNearbyBoutiquesQuery(
    {
      latitude,
      longitude,
      limit: BOUTIQUES_LIMIT,
    },
    { skip: !hasPosition }
  );
  const { boutiques = [] } = data || {};
  const limitedBoutiques = boutiques.slice(0, 5);
  return (
    <NearbyBoutiques
      boutiques={limitedBoutiques}
      isFetching={isFetching}
      isLocating={locating}
    />
  );
}
