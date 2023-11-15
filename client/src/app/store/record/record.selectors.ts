import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RecordState } from './record.config';

export const selectRecordState = createFeatureSelector<RecordState>('recordState');

export const selectRecordStateRecords = createSelector(
  selectRecordState,
  (state: RecordState) => state.records
);

export const selectRecordStateLoading = createSelector(
  selectRecordState,
  (state: RecordState) => state.loading
);

export const selectAddRecordLoading = createSelector(
  selectRecordState,
  (state: RecordState) => state.addLoading
);

export const selectEditRecordLoading = createSelector(
  selectRecordState,
  (state: RecordState) => state.editLoading
);

export const selectDeleteRecordLoading = createSelector(
  selectRecordState,
  (state: RecordState) => state.deleteLoading
);
