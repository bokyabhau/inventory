import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RejectionState } from './rejection.config';

export const selectRejectionState =
  createFeatureSelector<RejectionState>('rejectionState');

export const selectRejectionStateRejections = createSelector(
  selectRejectionState,
  (state: RejectionState) => state.rejections
);

export const selectRejectionStateLoading = createSelector(
  selectRejectionState,
  (state: RejectionState) => state.loading
);

export const selectAddRejectionLoading = createSelector(
  selectRejectionState,
  (state: RejectionState) => state.addLoading
);

export const selectEditRejectionLoading = createSelector(
  selectRejectionState,
  (state: RejectionState) => state.editLoading
);

export const selectDeleteRejectionLoading = createSelector(
  selectRejectionState,
  (state: RejectionState) => state.deleteLoading
);

export const selectFilteredRejections = createSelector(
  selectRejectionState,
  (state: RejectionState) =>
    state.rejections.filter((rejection) => rejection.name.includes(state.query))
);
