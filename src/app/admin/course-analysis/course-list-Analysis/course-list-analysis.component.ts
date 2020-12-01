import { Component, OnInit, Input } from '@angular/core';
import IndicatorState from 'src/app/models/LoadingStates';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-course-list-analysis',
  templateUrl: './course-list-analysis.html',
  styleUrls: ['./course-list-analysis.scss']
})
export class CourseListAnalysisComponent implements OnInit {
  @Input() courseStats = false;
  @Input() courses: any;
  @Input() loadingIndicator: any;
  IndicatorState = IndicatorState;
  public doughnutChartData: MultiDataSet = []
  public doughnutChartLabels: Label[] 
  public doughnutChartLabel: Label[]
  public doughnutChartType: ChartType = 'doughnut';
  public donutColors = [
    {
      backgroundColor: [
        '#870a3c',
        '#f5a538',
        '#c4c4c4',
      ],
      borderWidth: 0, 
    },
  ];

  public donutColor = [
    {
      backgroundColor: [
        '#f4f3f3',
      ],
      borderWidth: 0, 
    },
  ];

  constructor() {
    
  }

  ngOnInit() {
      this.doughnutChartLabels = ['Completed', 'In progress', 'Not started']
      this.doughnutChartLabel = ['no data']
  }
  showCourseStats(course) {
    if (course.showStats === true) {
      course.showStats = false;
    } else {
      course.showStats = true;
    }
  }
  
  chartOptions = {
    cutoutPercentage: 66,
    legend:false,
  };
}
