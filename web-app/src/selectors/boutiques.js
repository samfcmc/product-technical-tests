import { createSelector } from "@reduxjs/toolkit";
import haversine from "haversine-distance";

import { boutiquesApi } from "../services/boutiques";
import { coordinates } from "./geolocation";

const DEFAULT_LIMIT = 5;

export const allBoutiques = createSelector(
  boutiquesApi.endpoints.getAllBoutiques.select({}),
  ({ data = [] }) => data
);

export const getNearbyBoutiques = createSelector(
  allBoutiques,
  coordinates,
  (boutiques, coordinates) => (radius) =>
    boutiques
      .filter(({ location }) => haversine(location, coordinates) <= radius)
      .slice(0, DEFAULT_LIMIT)
);
