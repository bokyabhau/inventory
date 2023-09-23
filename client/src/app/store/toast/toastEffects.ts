import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, delay } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as ToastActions from './toast.actions';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable()
export class ToastEffects {
  showPartEditSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToastActions.PartEditSuccessAction),
        map(() =>
          this.toast.show('Success', 'Part Updated Successfully', {
            position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
            icon: 'checkmark',
            status: 'success',
          })
        )
      ),
    { dispatch: false }
  );

  showPartEditFailureToast = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToastActions.PartEditActionFailure),
        map(
          ({ error }) => this.toast.danger(error.message, 'Error')
          //   this.toast.show('Error', error.message, {
          //     position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
          //     icon: 'close',
          //     status: 'danger',
          //   })
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private toast: NbToastrService) {}
}
