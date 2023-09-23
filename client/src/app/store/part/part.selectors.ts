import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PartState } from './part.config';

export const selectPartState = createFeatureSelector<PartState>('partState');

export const selectPartStateLoading = createSelector(
  selectPartState,
  (state: PartState) => state.loading
);

export const selectPartStateParts = createSelector(
  selectPartState,
  (state: PartState) => state.parts
);

export const selectPartStateError = createSelector(
  selectPartState,
  (state: PartState) => state.error
);

export const selectEditPartLoading = createSelector(
  selectPartState,
  (state: PartState) => state.editLoading
);

export const selectPartStateFilteredParts = createSelector(
  selectPartState,
  (state: PartState) =>
    state.parts.filter((part) => part.name.includes(state.query))
);

export const selectPartDeletionLoading = createSelector(
  selectPartState,
  (state: PartState) => state.deleteLoading
);

export const selectAddPartLoading = createSelector(
  selectPartState,
  (state: PartState) => state.addLoading
);
