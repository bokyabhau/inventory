import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecordService } from 'src/app/services/record.service';
import * as RecordActions from './record.actions';

@Injectable()
export class RecordEffects {
  getRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.GetRecordsActionStart),
      mergeMap(() =>
        this.recordService.getRecords().pipe(
          map((records) => RecordActions.GetRecordsActionSuccess({ records })),
          catchError(({ error }) =>
            of(RecordActions.GetRecordsActionFailure({ error }))
          )
        )
      )
    )
  );

  addRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.AddRecordActionStart),
      mergeMap(({ record }) =>
        this.recordService.addRecord(record).pipe(
          map((newRecord) =>
            RecordActions.AddRecordActionSuccess({ newRecord })
          ),
          tap(() => this.toast.success('Record Added Successfully')),
          catchError(({ error }) =>
            of(RecordActions.AddRecordActionFailure({ error })).pipe(
              tap(({ error }) => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  editRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.EditRecordActionStart),
      mergeMap(({ record }) =>
        this.recordService.editRecord(record).pipe(
          map((updatedRecord) =>
            RecordActions.EditRecordActionSuccess({ updatedRecord })
          ),
          tap(() => this.toast.success('Record Edited Successfully')),
          catchError(({ error }) =>
            of(RecordActions.EditRecordActionFailure({ error })).pipe(
              tap(({ error }) => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  deleteRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.DeleteRecordActionStart),
      mergeMap(({ record }) =>
        this.recordService.deleteRecord(record).pipe(
          map((deletedRecord) =>
            RecordActions.DeleteRecordActionSuccess({ deletedRecord })
          ),
          tap(() => this.toast.success('Record Deleted Successfully')),
          catchError(({ error }) =>
            of(RecordActions.DeleteRecordActionFailure({ error })).pipe(
              tap(() => this.toast.danger(error.message))
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private recordService: RecordService,
    private toast: NbToastrService
  ) {}
}
