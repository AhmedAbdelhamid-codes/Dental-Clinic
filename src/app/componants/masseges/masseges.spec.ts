import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Masseges } from './masseges';

describe('Masseges', () => {
  let component: Masseges;
  let fixture: ComponentFixture<Masseges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Masseges],
    }).compileComponents();

    fixture = TestBed.createComponent(Masseges);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
