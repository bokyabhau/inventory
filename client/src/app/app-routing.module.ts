import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartsComponent } from './components/parts/parts.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { RejectionsComponent } from './components/rejections/rejections.component';
import { RecordsComponent } from './components/records/records.component';

const routes: Routes = [
  { path: '', component: DataEntryComponent },
  { path: 'entry', component: DataEntryComponent },
  { path: 'parts', component: PartsComponent },
  { path: 'rejections', component: RejectionsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'records', component: RecordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
