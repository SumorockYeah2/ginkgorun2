import { Component, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-stacked-columns-chart',
  templateUrl: './stacked-columns-chart.component.html',
  styleUrls: ['./stacked-columns-chart.component.css']
})
export class StackedColumnsChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public selectedYear: string = "notselected"; 

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Working Days",
          data: null
        },
        {
          name: "Days Attended",
          data: null
        },
        {
          name: "Leaves",
          data: null
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [ //call a function which returns an array, instead of entering default values
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
  }
  
  updateChartData(selectedYear: any): void {
    this.selectedYear = selectedYear;

    const dataFor2024 = {
      "Working Days": [21,19,21,19,21,0,0,0,0,0,0,18], // this has to be subtracted by days checked in
      "Days Attended": [15, 14, 16, 18, 17,0,0,0,0,0,0,0],
      "Leaves": [0.5, 0, 0, 1, 0,0,0,0,0,0,0,5]
    };
    const dataFor2023 = {
      "Working Days": [20,19,21,16,20,21,20,20,21,20,22,18],
      "Days Attended": [14, 15, 13, 14, 12, 16,14, 15, 13, 14, 12, 16],
      "Leaves": [0, 0, 1, 0, 0, 0,0, 0, 1, 0, 0, 0]
    };

    switch(selectedYear) {
      case 'option1':
        this.chartOptions.series = [
          { name: "Working Days", data: this.subtractDays(dataFor2024["Working Days"], dataFor2024["Days Attended"], dataFor2024["Leaves"]) },
          { name: "Days Attended", data: dataFor2024["Days Attended"] },
          { name: "Leaves", data: dataFor2024["Leaves"] }
        ];
        break;
      case 'option2':
        this.chartOptions.series = [
          { name: "Working Days", data: this.subtractDays(dataFor2023["Working Days"], dataFor2023["Days Attended"], dataFor2023["Leaves"]) },
          { name: "Days Attended", data: dataFor2023["Days Attended"] },
          { name: "Leaves", data: dataFor2023["Leaves"] }
        ];
        break;
    }
  }

  subtractDays(workingDays: number[], daysAttended: number[], daysLeft: number[]): number[] {
    const remainingDays: number[] = [];
    for (let i = 0; i < workingDays.length; i++) {
      remainingDays.push(workingDays[i] - daysAttended[i] - daysLeft[i]);
    }
    return remainingDays;
  }
}
