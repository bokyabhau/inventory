import { Component, Input, OnInit } from '@angular/core';
import { PartRejections } from 'src/app/models/rejection.model';

@Component({
  selector: 'app-rejection',
  templateUrl: './rejection.component.html',
  styleUrls: ['./rejection.component.less'],
})
export class RejectionComponent implements OnInit {
  @Input('rejections') rejections!: PartRejections[];
  ngOnInit(): void {}
}
