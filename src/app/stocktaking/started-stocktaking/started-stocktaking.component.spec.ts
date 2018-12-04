import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartedStocktakingComponent } from './started-stocktaking.component';

describe('StartedStocktakingComponent', () => {
  let component: StartedStocktakingComponent;
  let fixture: ComponentFixture<StartedStocktakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartedStocktakingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartedStocktakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
