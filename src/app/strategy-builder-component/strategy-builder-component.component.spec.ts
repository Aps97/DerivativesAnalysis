import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyBuilderComponentComponent } from './strategy-builder-component.component';

describe('StrategyBuilderComponentComponent', () => {
  let component: StrategyBuilderComponentComponent;
  let fixture: ComponentFixture<StrategyBuilderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyBuilderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyBuilderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
