import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisComponentComponent } from './analysis-component.component';

describe('AnalysisComponentComponent', () => {
  let component: AnalysisComponentComponent;
  let fixture: ComponentFixture<AnalysisComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
