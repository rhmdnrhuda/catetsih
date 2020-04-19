import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public data;
  chartData: ChartDataSets[] = [{ data: [], label: 'Tingkat Mood' }];
  chartLabels: Label[];

  constructor(
    private storage: Storage,
    public datepipe: DatePipe
  ) { 
  }

  ionViewWillEnter(){
    this.datepipe = new DatePipe('en-US')
    this.chartLabels = [];
    this.chartData[0].data = [];

    this.storage.get('data').then(async val =>{
      val = await val.sort((a, b) => a.date - b.date)
      this.data = await val;
      val.forEach(item => {
        this.chartLabels.push(item.date);
        this.chartData[0].data.push(item.valueOfFeeling);
      });
    })
  }

  public getData = () => {
    return this.data;
  }
  // Options
  chartOptions = {
    hover: {
      mode: 'index'
    },
    responsive: true,
    title: {
      display: true,
      text: 'History kamu'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          this.datepipe = new DatePipe('en-US');
          var label =  this.datepipe.transform(tooltipItem[0].label, 'dd-MM-yy, hh:mm') + '\n' + this.data[tooltipItem[0].index].note;
          return label;
        }.bind(this)
      }
  },
    scales: {
      xAxes: [{
        display: false,
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' },
        // type: 'time',
          time: {
            parser: 'MM/DD/YYYY HH:mm',
            tooltipFormat: 'll HH:mm',
            unit: 'day',
            unitStepSize: 1,
            displayFormats: {
              'day': 'MM/DD/YYYY'
            }
          }
      }],
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#ffffff',
      backgroundColor: '#ff00ff'
    }
  ];
  chartType = 'line';
  showLegend = true;

}
