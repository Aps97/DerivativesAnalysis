import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentHoldingsComponent } from './current-holdings.component';

describe('CurrentHoldingsComponent', () => {
  let component: CurrentHoldingsComponent;
  let fixture: ComponentFixture<CurrentHoldingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentHoldingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentHoldingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
