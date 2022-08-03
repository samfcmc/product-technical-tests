import { createSelector } from "@reduxjs/toolkit";
import haversine from "haversine-distance";

import { boutiquesApi } from "../services/boutiques";
import { coordinates } from "./geolocation";

const DEFAULT_LIMIT = 5;

export const allBoutiques = createSelector(
  boutiquesApi.endpoints.getAllBoutiques.select({}),
  ({ data = [] }) => data
);

/**
 * TODO: Do this distance filtering on server-side
 */
export const getNearbyBoutiques = createSelector(
  allBoutiques,
  coordinates,
  (boutiques, coordinates) => (radius) =>
    boutiques
      .map((boutique) => ({
        ...boutique,
        distance: haversine(boutique.location, coordinates),
      }))
      .filter(({ distance }) => distance <= radius)
      .slice(0, DEFAULT_LIMIT)
);
