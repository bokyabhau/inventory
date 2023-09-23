import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, delay } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import * as RejectionActions from './rejection.actions';

import { RejectionService } from '../../services/rejection.service';
import { Store } from '@ngrx/store';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class RejectionEffects {
  loadParts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RejectionActions.GetRejectionsActionStart),
      // delay(3000),
      mergeMap(() =>
        this.rejectionService.getRejections().pipe(
          map((rejections) =>
            RejectionActions.GetRejectionsActionSuccess({ rejections })
          ),
          catchError(({ error }) =>
            of(RejectionActions.GetRejectionsActionFailure({ error })).pipe(
              tap(() => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  editParts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RejectionActions.EditRejectionActionStart),
      // delay(3000),
      mergeMap(({ rejection }) =>
        this.rejectionService.editRejection(rejection).pipe(
          map((editedRejection) =>
            RejectionActions.EditRejectionActionSuccess({ editedRejection })
          ),
          tap(() => this.toast.success('Rejection Updated Successfully')),
          catchError(({ error }) =>
            of(RejectionActions.EditRejectionActionFailure({ error })).pipe(
              tap(({ error }) => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  deletePart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RejectionActions.DeleteRejectionActionStart),
      mergeMap(({ rejection }) =>
        this.rejectionService.deleteRejection(rejection).pipe(
          map((deletedRejection) =>
            RejectionActions.DeleteRejectionActionSuccess({ deletedRejection })
          ),
          tap(() => this.toast.success('Rejection Deleted Successfully')),
          catchError(({ error }) =>
            of(RejectionActions.DeleteRejectionActionFailure({ error })).pipe(
              tap(() => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  addPart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RejectionActions.AddRejectionActionStart),
      mergeMap(({ rejection }) =>
        this.rejectionService.addRejection(rejection).pipe(
          map((rejection) =>
            RejectionActions.AddRejectionActionSuccess({ rejection })
          ),
          tap(() => this.toast.success('Rejection Added Successfully')),
          catchError(({ error }) =>
            of(RejectionActions.AddRejectionActionFailure({ error })).pipe(
              tap(() => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private rejectionService: RejectionService,
    private toast: NbToastrService
  ) {}
}
