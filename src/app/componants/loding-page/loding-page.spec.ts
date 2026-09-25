import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LodingPage } from './loding-page';

describe('LodingPage', () => {
  let component: LodingPage;
  let fixture: ComponentFixture<LodingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LodingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LodingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
