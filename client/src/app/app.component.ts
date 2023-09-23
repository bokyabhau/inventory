import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartService } from './services/part.service';
import { Part } from './models/part.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'client';
  products$ = new Observable<Part[]>();

  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.products$ = this.partService.getAllParts();
  }
}
