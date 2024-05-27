import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedColumnsChartComponent } from './stacked-columns-chart.component';

describe('StackedColumnsChartComponent', () => {
  let component: StackedColumnsChartComponent;
  let fixture: ComponentFixture<StackedColumnsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedColumnsChartComponent]
    });
    fixture = TestBed.createComponent(StackedColumnsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
