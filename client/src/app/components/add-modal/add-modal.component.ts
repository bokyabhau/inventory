import { Component, OnDestroy, OnInit, Input, inject } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AddPartActionStart } from 'src/app/store/part/part.actions';
import { selectAddPartLoading } from 'src/app/store/part/part.selectors';
import { AddRejectionActionStart } from 'src/app/store/rejection/rejection.actions';
import { selectAddRejectionLoading } from 'src/app/store/rejection/rejection.selectors';
import { AppState } from 'src/app/store/store';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.less'],
})
export class AddModalComponent implements OnDestroy, OnInit {
  name = '';

  @Input()
  type!: 'part' | 'rejection';

  private dialog = inject(NbDialogRef<AddModalComponent>);
  private store = inject(Store<AppState>);
  loading!: boolean;

  loadingSubscription$!: Subscription;

  ngOnInit(): void {
    this.loadingSubscription$ = this.store
      .select(
        this.type === 'part' ? selectAddPartLoading : selectAddRejectionLoading
      )
      .subscribe((addLoading) => {
        if (typeof this.loading !== 'undefined' && this.loading === false) {
          this.dialog.close();
        }
        this.loading = addLoading;
      });
    this.loading = false;
  }

  confirm() {
    const entity = { name: this.name };

    this.store.dispatch(
      this.type === 'part'
        ? AddPartActionStart({ part: entity })
        : AddRejectionActionStart({ rejection: entity })
    );
  }

  cancel() {
    this.dialog.close();
  }

  ngOnDestroy(): void {
    this.loadingSubscription$.unsubscribe();
  }
}
