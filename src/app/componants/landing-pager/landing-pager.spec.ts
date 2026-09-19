import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPager } from './landing-pager';

describe('LandingPager', () => {
  let component: LandingPager;
  let fixture: ComponentFixture<LandingPager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPager],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
