import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalComponent } from './add-modal.component';

describe('AddPartComponent', () => {
  let component: AddModalComponent;
  let fixture: ComponentFixture<AddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddModalComponent],
    });
    fixture = TestBed.createComponent(AddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
