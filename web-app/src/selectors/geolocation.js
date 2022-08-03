import { createSelector } from "@reduxjs/toolkit";
import { name } from "../slices/geolocation";

export const geolocation = (state) => state[name];

export const coordinates = createSelector(
  geolocation,
  ({ coordinates }) => coordinates
);

export const error = createSelector(geolocation, ({ error }) => error);

export const locating = createSelector(geolocation, ({ locating }) => locating);

export const hasPosition = createSelector(
  geolocation,
  ({ coordinates }) =>
    coordinates.latitude != null && coordinates.longitude != null
);
