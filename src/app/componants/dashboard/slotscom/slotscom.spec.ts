import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Slotscom } from './slotscom';

describe('Slotscom', () => {
  let component: Slotscom;
  let fixture: ComponentFixture<Slotscom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slotscom],
    }).compileComponents();

    fixture = TestBed.createComponent(Slotscom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
