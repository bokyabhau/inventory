import { createAction, props } from '@ngrx/store';
import { Record, RecordDto } from './record.config';
import { Rejection } from 'src/app/models/rejection.model';

export const GetRecordsActionStart = createAction(
  '[Record] Get Records :: START'
);

export const GetRecordsActionSuccess = createAction(
  '[Record] Get Records :: SUCCESS',
  props<{ records: Record[] }>()
);

export const GetRecordsActionFailure = createAction(
  '[Record] Get Records :: FAILURE',
  props<{ error: Error }>()
);

export const AddRecordActionStart = createAction(
  '[Record] Add Record :: START',
  props<{ record: RecordDto }>()
);

export const AddRecordActionSuccess = createAction(
  '[Record] Add Record :: SUCCESS',
  props<{ newRecord: Record }>()
);

export const AddRecordActionFailure = createAction(
  '[Record] Add Record :: FAILURE',
  props<{ error: Error }>()
);

export const EditRecordActionStart = createAction(
  '[Record] Edit Record :: START',
  props<{ record: Record }>()
);

export const EditRecordActionSuccess = createAction(
  '[Record] Edit Record :: SUCCESS',
  props<{ updatedRecord: Record }>()
);

export const EditRecordActionFailure = createAction(
  '[Record] Edit Record :: FAILURE',
  props<{ error: Error }>()
);

export const DeleteRecordActionStart = createAction(
  '[Record] Delete Record :: START',
  props<{ record: Record }>()
);

export const DeleteRecordActionSuccess = createAction(
  '[Record] Delete Record :: SUCCESS',
  props<{ deletedRecord: Record }>()
);

export const DeleteRecordActionFailure = createAction(
  '[Record] Delete Record :: FAILURE',
  props<{ error: Error }>()
);

export const AddRejection = createAction(
  '[Record] Add Rejection',
  props<{ rejection: Rejection }>()
);
