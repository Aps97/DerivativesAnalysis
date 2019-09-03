import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentHoldingsComponentComponent } from './current-holdings-component.component';

describe('CurrentHoldingsComponentComponent', () => {
  let component: CurrentHoldingsComponentComponent;
  let fixture: ComponentFixture<CurrentHoldingsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentHoldingsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentHoldingsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
