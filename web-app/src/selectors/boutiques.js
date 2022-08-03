import { createSelector } from "@reduxjs/toolkit";
import haversine from "haversine-distance";

import { boutiquesApi } from "../services/boutiques";
import { coordinates } from "./geolocation";

const DEFAULT_LIMIT = 5;
const DEFAULT_RADIUS = 50000;

export const allBoutiques = createSelector(
  boutiquesApi.endpoints.getAllBoutiques.select({}),
  ({ data = [] }) => data
);

export const nearbyBoutiques = createSelector(
  allBoutiques,
  coordinates,
  (boutiques, coordinates) =>
    boutiques
      .filter(
        ({ location }) => haversine(location, coordinates) <= DEFAULT_RADIUS
      )
      .slice(0, DEFAULT_LIMIT)
);
