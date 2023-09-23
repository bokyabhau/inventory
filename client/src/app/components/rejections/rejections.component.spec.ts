import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionsComponent } from './rejections.component';

describe('RejectionsComponent', () => {
  let component: RejectionsComponent;
  let fixture: ComponentFixture<RejectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectionsComponent]
    });
    fixture = TestBed.createComponent(RejectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
