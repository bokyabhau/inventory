import { Action, createReducer, on } from '@ngrx/store';
import { partInitialState } from './part.config';
import * as PartActions from './part.actions';

const reducer = createReducer(
  partInitialState,
  on(PartActions.GetAllPartsActionStart, (state) => ({
    ...state,
    loading: true,
    parts: [],
  })),
  on(PartActions.GetAllPartsActionSuccess, (state, { parts }) => ({
    ...state,
    parts,
    loading: false,
    error: null,
  })),
  on(PartActions.GetAllPartsActionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    parts: [],
  })),
  on(PartActions.UpdatePartActionStart, (state, { part }) => ({
    ...state,
    editLoading: true,
  })),
  on(PartActions.UpdatePartActionSuccess, (state, { updatedPart }) => ({
    ...state,
    parts: state.parts.map((part) =>
      part._id === updatedPart._id ? updatedPart : part
    ),
    editLoading: false,
    error: null,
  })),
  on(PartActions.UpdatePartActionFailure, (state, { error }) => ({
    ...state,
    editLoading: false,
    error,
  })),
  on(PartActions.SetPartsStateQuery, (state, { query }) => ({
    ...state,
    query,
  })),
  on(PartActions.DeletePartActionStart, (state, { part }) => ({
    ...state,
    deleteLoading: true,
  })),
  on(PartActions.DeletePartActionSuccess, (state, { deletedPart }) => ({
    ...state,
    deleteLoading: false,
    parts: state.parts.filter((part) => part._id !== deletedPart._id),
    error: null,
  })),
  on(PartActions.DeletePartActionFailure, (state, { error }) => ({
    ...state,
    deleteLoading: false,
    error,
  })),
  on(PartActions.AddPartActionStart, (state, { part }) => ({
    ...state,
    addLoading: true,
    error: null,
  })),
  on(PartActions.AddPartActionSuccess, (state, { part }) => ({
    ...state,
    addLoading: false,
    parts: [...state.parts, part],
    error: null,
  })),
  on(PartActions.AddPartActionFailure, (state, { error }) => ({
    ...state,
    addLoading: false,
    error,
  }))
);

export function ProductReducer(state: any, action: Action) {
  return reducer(state, action);
}
