import { createAction, props } from '@ngrx/store';
import { Part } from 'src/app/models/part.model';

export const PartEditSuccessAction = createAction(
  '[Toast] Part Edit :: SUCCESS'
);

export const PartEditActionFailure = createAction(
  '[Toast] Part Edit :: FAILURE',
  props<{ error: Error }>()
);

export const ShowDeletePartDialog = createAction(
  '[Dialog] Show Delete Part Dialog',
  props<{ part: Part }>()
);
