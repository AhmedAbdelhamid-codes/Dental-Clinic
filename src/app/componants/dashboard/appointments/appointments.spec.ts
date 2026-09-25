import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Appointments } from './appointments';

describe('Appointments', () => {
  let component: Appointments;
  let fixture: ComponentFixture<Appointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Appointments],
    }).compileComponents();

    fixture = TestBed.createComponent(Appointments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
