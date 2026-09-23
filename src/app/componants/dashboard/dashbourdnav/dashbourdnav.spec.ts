import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashbourdnav } from './dashbourdnav';

describe('Dashbourdnav', () => {
  let component: Dashbourdnav;
  let fixture: ComponentFixture<Dashbourdnav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashbourdnav],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashbourdnav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
