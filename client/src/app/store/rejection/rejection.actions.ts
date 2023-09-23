import { createAction, props } from '@ngrx/store';
import { Rejection, RejectionDto } from 'src/app/models/rejection.model';

export const GetRejectionsActionStart = createAction(
  '[Rejection] Get All Rejections :: START'
);

export const GetRejectionsActionSuccess = createAction(
  '[Rejection] Get All Rejections :: SUCCESS',
  props<{ rejections: Rejection[] }>()
);

export const GetRejectionsActionFailure = createAction(
  '[Rejection] Get All Rejections :: FAILURE',
  props<{ error: Error }>()
);

export const AddRejectionActionStart = createAction(
  '[Rejection] Add Rejection :: START',
  props<{ rejection: RejectionDto }>()
);

export const AddRejectionActionSuccess = createAction(
  '[Rejection] Add Rejection :: SUCCESS',
  props<{ rejection: Rejection }>()
);

export const AddRejectionActionFailure = createAction(
  '[Rejection] Add Rejection :: FAILURE',
  props<{ error: Error }>()
);

export const EditRejectionActionStart = createAction(
  '[Rejection] Edit Rejection :: START',
  props<{ rejection: Rejection }>()
);

export const EditRejectionActionSuccess = createAction(
  '[Rejection] Edit Rejection :: SUCCESS',
  props<{ editedRejection: Rejection }>()
);

export const EditRejectionActionFailure = createAction(
  '[Rejection] Edit Rejection :: FAILURE',
  props<{ error: Error }>()
);

export const DeleteRejectionActionStart = createAction(
  '[Rejection] Delete Rejection :: START',
  props<{ rejection: Rejection }>()
);

export const DeleteRejectionActionSuccess = createAction(
  '[Rejection] Delete Rejection :: SUCCESS',
  props<{ deletedRejection: Rejection }>()
);

export const DeleteRejectionActionFailure = createAction(
  '[Rejection] Delete Rejection :: FAILURE',
  props<{ error: Error }>()
);

export const SetRejectionStateQuery = createAction(
  '[Rejection] Set Query',
  props<{ query: string }>()
);
