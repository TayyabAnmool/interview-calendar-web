import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvailabilitySlotComponent } from './add-availability-slot.component';

describe('AddAvailabilitySlotComponent', () => {
  let component: AddAvailabilitySlotComponent;
  let fixture: ComponentFixture<AddAvailabilitySlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAvailabilitySlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAvailabilitySlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
