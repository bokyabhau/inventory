import { createReducer, on } from '@ngrx/store';
import { RecordState, recordInitialState } from './record.config';
import * as RecordActions from './record.actions';

const reducer = createReducer(
  recordInitialState,
  on(RecordActions.AddRecordActionStart, (state) => ({
    ...state,
    loading: true,
    records: [],
  })),
  on(RecordActions.AddRecordActionSuccess, (state, { newRecord }) => ({
    ...state,
    loading: false,
    records: [...state.records, newRecord],
  })),
  on(RecordActions.AddRecordActionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(RecordActions.DeleteRecordActionStart, (state, { record }) => ({
    ...state,
    deleteLoading: true,
  })),
  on(RecordActions.DeleteRecordActionSuccess, (state, { deletedRecord }) => ({
    ...state,
    deleteLoading: false,
    records: state.records.filter((record) => record._id !== deletedRecord._id),
  })),
  on(RecordActions.DeleteRecordActionFailure, (state, { error }) => ({
    ...state,
    deleteLoading: false,
    error,
  })),
  on(RecordActions.EditRecordActionStart, (state, { record }) => ({
    ...state,
    editLoading: true,
  })),
  on(RecordActions.EditRecordActionSuccess, (state, { updatedRecord }) => ({
    ...state,
    editLoading: false,
    records: state.records.map((record) =>
      record._id === updatedRecord._id ? updatedRecord : record
    ),
  })),
  on(RecordActions.EditRecordActionFailure, (state, { error }) => ({
    ...state,
    editLoading: false,
    error,
  })),
  on(RecordActions.GetRecordsActionStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(RecordActions.GetRecordsActionSuccess, (state, { records }) => ({
    ...state,
    loading: false,
    records,
  })),
  on(RecordActions.GetRecordsActionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function RecordReducer(state: any, action: any) {
  return reducer(state, action);
}
