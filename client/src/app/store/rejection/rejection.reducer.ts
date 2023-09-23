import { Action, createReducer, on } from '@ngrx/store';
import { rejectionInitialState } from './rejection.config';
import * as RejectionActions from './rejection.actions';

const reducer = createReducer(
  rejectionInitialState,
  on(RejectionActions.GetRejectionsActionStart, (state) => ({
    ...state,
    loading: true,
    rejections: [],
    error: null,
  })),
  on(RejectionActions.GetRejectionsActionSuccess, (state, { rejections }) => ({
    ...state,
    rejections,
    loading: false,
    error: null,
  })),
  on(RejectionActions.GetRejectionsActionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    rejections: [],
  })),
  on(RejectionActions.AddRejectionActionStart, (state, rejection) => ({
    ...state,
    addLoading: true,
  })),
  on(RejectionActions.AddRejectionActionSuccess, (state, { rejection }) => ({
    ...state,
    rejections: [...state.rejections, rejection],
    addLoading: false,
    error: null,
  })),
  on(RejectionActions.AddRejectionActionFailure, (state, { error }) => ({
    ...state,
    addLoading: false,
    error,
  })),
  on(RejectionActions.EditRejectionActionStart, (state, { rejection }) => ({
    ...state,
    editLoading: true,
  })),
  on(
    RejectionActions.EditRejectionActionSuccess,
    (state, { editedRejection }) => ({
      ...state,
      editLoading: false,
      rejections: state.rejections.map((rejection) =>
        rejection._id === editedRejection._id ? editedRejection : rejection
      ),
    })
  ),
  on(RejectionActions.EditRejectionActionFailure, (state, { error }) => ({
    ...state,
    editLoading: false,
    error,
  })),
  on(RejectionActions.DeleteRejectionActionStart, (state) => ({
    ...state,
    deleteLoading: true,
  })),
  on(
    RejectionActions.DeleteRejectionActionSuccess,
    (state, { deletedRejection }) => ({
      ...state,
      deleteLoading: false,
      rejections: state.rejections.filter(
        (rejection) => rejection._id !== deletedRejection._id
      ),
    })
  ),
  on(RejectionActions.DeleteRejectionActionFailure, (state, { error }) => ({
    ...state,
    deleteLoading: false,
    error,
  })),
  on(RejectionActions.SetRejectionStateQuery, (state, { query }) => ({
    ...state,
    query,
  }))
);

export function RejectionReducer(state: any, action: Action) {
  return reducer(state, action);
}
