import { Component, ViewChild } from '@angular/core';
import { StackedColumnsChartComponent } from '../stacked-columns-chart/stacked-columns-chart.component';

@Component({
  selector: 'app-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.css']
})

export class ContentDashboardComponent {
  @ViewChild(StackedColumnsChartComponent) stackedColumnsChartComponent: StackedColumnsChartComponent;

  onChange($event: any) {
    const selectedYear = $event.source.value;
    this.stackedColumnsChartComponent.updateChartData(selectedYear);
  }
}