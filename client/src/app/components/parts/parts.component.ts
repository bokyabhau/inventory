import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';
import { Part } from 'src/app/models/part.model';
import {
  GetAllPartsActionStart,
  SetPartsStateQuery,
} from 'src/app/store/part/part.actions';
import {
  selectPartStateFilteredParts,
  selectPartStateLoading,
} from 'src/app/store/part/part.selectors';
import { AppState } from 'src/app/store/store';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.less'],
})
export class PartsComponent implements OnInit, OnDestroy {
  query = '';
  private store = inject(Store<AppState>);
  private dialog = inject(NbDialogService);
  parts$: Observable<Part[]> = this.store.select(selectPartStateFilteredParts);
  loading = false;
  partsLoading$ = this.store
    .select(selectPartStateLoading)
    .subscribe((value) => (this.loading = value));

  queryForm = new FormGroup({
    query: new FormControl(''),
  });

  ngOnInit(): void {
    this.store.dispatch(GetAllPartsActionStart());
  }

  ngOnDestroy(): void {
    this.partsLoading$.unsubscribe();
  }

  handleChange() {
    this.store.dispatch(
      SetPartsStateQuery({ query: this.queryForm.value.query || '' })
    );
  }

  clear() {
    this.queryForm.setValue({ query: '' });
    this.store.dispatch(SetPartsStateQuery({ query: '' }));
  }

  addPart() {
    this.dialog.open(AddModalComponent, { context: { type: 'part' } });
  }
}
