import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDataComponent } from './confirmation-data.component';

describe('ConfirmationDataComponent', () => {
  let component: ConfirmationDataComponent;
  let fixture: ComponentFixture<ConfirmationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
