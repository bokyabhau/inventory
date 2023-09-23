import { createAction, props } from '@ngrx/store';
import { Part, PartDto } from 'src/app/models/part.model';

export const GetAllPartsActionStart = createAction(
  '[Part] Get All Parts :: START'
);

export const GetAllPartsActionSuccess = createAction(
  '[Part] Get All Parts :: SUCCESS',
  props<{ parts: Part[] }>()
);

export const GetAllPartsActionFailure = createAction(
  '[Part] Get All Parts :: FAILURE',
  props<{ error: Error }>()
);

export const SetPartsStateQuery = createAction(
  '[Part] Get Filtered Parts',
  props<{ query: string }>()
);

export const UpdatePartActionStart = createAction(
  '[Part] Update Part :: Start',
  props<{ part: Part }>()
);

export const UpdatePartActionSuccess = createAction(
  '[Part] Update Part :: Success',
  props<{ updatedPart: Part }>()
);

export const UpdatePartActionFailure = createAction(
  '[Part] Update Part :: FAILURE',
  props<{ error: Error }>()
);

export const DeletePartActionStart = createAction(
  '[Part] Delete Part :: START',
  props<{ part: Part }>()
);

export const DeletePartActionSuccess = createAction(
  '[Part] Delete Part :: SUCCESS',
  props<{ deletedPart: Part }>()
);

export const DeletePartActionFailure = createAction(
  '[Part] Delete Part: FAILURE',
  props<{ error: Error }>()
);

export const AddPartActionStart = createAction(
  '[Part] Add Part :: START',
  props<{ part: PartDto }>()
);

export const AddPartActionSuccess = createAction(
  '[Part] Add Part :: SUCCESS',
  props<{ part: Part }>()
);

export const AddPartActionFailure = createAction(
  '[Part] Add Part :: FAILURE',
  props<{ error: Error }>()
);
