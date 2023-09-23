import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, delay } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import * as PartActions from './part.actions';
import * as ToastActions from '../toast/toast.actions';

import { PartService } from '../../services/part.service';
import { Store } from '@ngrx/store';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class PartEffects {
  loadParts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartActions.GetAllPartsActionStart),
      // delay(3000),
      mergeMap(() =>
        this.partService.getAllParts().pipe(
          map((parts) => PartActions.GetAllPartsActionSuccess({ parts })),
          catchError((error) =>
            of(PartActions.GetAllPartsActionFailure({ error })).pipe(
              tap(() => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  editParts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartActions.UpdatePartActionStart),
      // delay(3000),
      mergeMap(({ part }) =>
        this.partService.editPart(part).pipe(
          map((updatedPart) =>
            PartActions.UpdatePartActionSuccess({ updatedPart })
          ),
          tap(() => this.toast.success('Part Updated Successfully')),
          catchError(({ error }) =>
            of(PartActions.UpdatePartActionFailure({ error })).pipe(
              tap(({ error }) => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  deletePart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartActions.DeletePartActionStart),
      mergeMap(({ part }) =>
        this.partService.deletePart(part).pipe(
          map((deletedPart) =>
            PartActions.DeletePartActionSuccess({ deletedPart })
          ),
          tap(() => this.toast.success('Part Deleted Successfully')),
          catchError(({ error }) =>
            of(PartActions.DeletePartActionFailure({ error })).pipe(
              tap(() => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  addPart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartActions.AddPartActionStart),
      mergeMap(({ part }) =>
        this.partService.addPart(part).pipe(
          map((newPart) => PartActions.AddPartActionSuccess({ part: newPart })),
          tap(() => this.toast.success('Part Added Successfully')),
          catchError(({ error }) =>
            of(PartActions.AddPartActionFailure({ error })).pipe(
              tap(() => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private partService: PartService,
    private store: Store,
    private toast: NbToastrService
  ) {}
}
