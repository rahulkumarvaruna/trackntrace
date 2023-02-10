import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../../../app/Data';
import { Month } from '../../../app/app_class/month';
import { globalservices } from '../../shared/globalservices';
import { Common } from 'src/app/app_class/Common';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    dropdownList: any;
    selectedItems = [];
    dataSaved = false;
    ipAddress: string;
    massage = null;
    public custcd = localStorage.getItem('custcd');
    public custnm = localStorage.getItem('custnm');
    dropdownSettings = {};
    currentJustify = 'start';
    nrSelect = new Date().getMonth() + 1;
    nryear = new Date().getFullYear();
    selectedMonth: Month = new Month(0, 'Select');
    months = [
        new Month(1, 'JANUARY'),
        new Month(2, 'FEBRUARY'),
        new Month(3, 'MARCH'),
        new Month(4, 'APRIL'),
        new Month(5, 'MAY'),
        new Month(6, 'JUNE'),
        new Month(7, 'JULY'),
        new Month(8, 'AUGUST'),
        new Month(9, 'SEPTEMBER'),
        new Month(10, 'OCTOBER'),
        new Month(11, 'NOVEMBER'),
        new Month(12, 'DECEMBER')
    ];
    yeardata: any;
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8'
        })
      };
    url = this.globalService.checkString(localStorage.getItem('userstr')) + '/indentPlaced';
    url1 = this.globalService.checkString(localStorage.getItem('userstr')) + '/getPlacementAging';
    url2 = this.globalService.checkString(localStorage.getItem('userstr')) + '/getTAT';
    url3 = this.globalService.checkString(localStorage.getItem('userstr')) + '/getVehicleLoadingTime';
    url4 = this.globalService.checkString(localStorage.getItem('userstr')) + '/getVehicleUnloadingTime';
    urlyear = this.globalService.checkString(localStorage.getItem('userstr')) + '/year';
    urlbrcd = this.globalService.checkString(localStorage.getItem('userstr')) + '/customerbrcd?custcd=' + this.custcd;
    Location = [];
    Location1 = [];
    Location2 = [];
    Location3 = [];
    Location4 = [];
    Ontime = [];
    oneday = [];
    twoday = [];
    gratertwoday = [];
    lWithin24Hrs = [];
    lBetween24HrsTo48Hrs = [];
    lBetween48hrsto72hrs = [];
    lGreaterthan72hrs = [];
    Within24Hrs = [];
    Between24HrsTo48Hrs = [];
    Between48hrsto72hrs = [];
    Greaterthan72hrs = [];
    IndentReceived = [];
    IndentPlaced = [];
    barchart = [];
    VehiclePlacedTime = [];
    HourBinID = [];
    HourBin = [];
    VehiclePlacedTime0to24 = [];
    VehiclePlacedTime24to48 = [];
    VehiclePlacedTime48to72 = [];
    public chartColors: Array<any> = [
        {
            backgroundColor: '#1C2C5E'
        },
        {
            backgroundColor: '#FFC10E'

        },
        {
            backgroundColor: '#FF0000'
        },
        {
            backgroundColor: 'rgb(192,192,192)'
        }
    ];

    title = '';
    type = 'PieChart';
    data: any = [];
    columnNames = ['TAT', 'Percentage'];
    options = {
        colors: ['#1C2C5E', '#FFC10E', '#FF0000'], is3D: true
    };
    width = 650;
    height = 500;
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        isStacked: true,
        scaleShowValues: true,
        
        scaleValuePaddingX: 5,
        scaleValuePaddingY: 5,
        scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          },
        animation: {
            onComplete: function () {
                const chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        const data = dataset.data[index];
                        if (data > 0) {
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        }
                    });
                });
            }
        }
    };
    public barChartOptions1: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scaleShowValues: true,
        scaleValuePaddingX: 10,
        scaleValuePaddingY: 10,
        scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  autoSkip: false
                }
              }
            ]
          },
        animation: {
            onComplete: function () {
                const chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        const data = dataset.data[index];
                        if (data > 0) {
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        }
                    });
                });
            }
        }
    };
    public barChartOptions2: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        isStacked: true,
        scaleShowValues: true,
        scaleValuePaddingX: 5,
        scaleValuePaddingY: 5,
        animation: {
            onComplete: function () {
                const chartInstance = this.chart,
                ctx = chartInstance.ctx;
                ctx.textAlign = 'start';
                ctx.fillStyle = 'white';
                ctx.textBaseline = 'top';
                this.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        let data: any;
                       let numbervalue: any;
                        if (index === 0) {
                             data = 'Before time ' + dataset.data[index];
                             numbervalue = 5;
                        } else if (index === 1) {
                           data = 'On Time ' + dataset.data[index];
                           numbervalue = 10;
                        } else {
                            data = 'Late ' + dataset.data[index];
                            numbervalue = 15;
                        }
                        if (data !== '') {
                            ctx.fillText(data, bar._model.x, bar._model.y - numbervalue);
                        }
                    });
                });
            }
        }
    };
    public barChartOptions3: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scaleShowValues: true,
        scaleValuePaddingX: 10,
        scaleValuePaddingY: 10,
        scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  autoSkip: false
                }
              }
            ]
          },
        animation: {
            onComplete: function () {
                const chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        const data = dataset.data[index];
                        if (data > 0) {
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        }
                    });
                });
            }
        }
    };
    public barChartOptions4: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scaleShowValues: true,
        scaleValuePaddingX: 10,
        scaleValuePaddingY: 10,
        scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  autoSkip: false
                }
              }
            ]
          },
        animation: {
            onComplete: function () {
                const chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        const data = dataset.data[index];
                        if (data > 0) {
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        }
                    });
                });
            }
        }
    };
    public barChartLabels: any[] = [];
    public barChartType: string;
    public barChartLegend: boolean;
    public barChartData: any[];
    public barChartData1: any[];
    public barChartLabels1: any[] = [];
    public barChartType1: string;
    public barChartLegend1: boolean;
    public barChartData2: Array<any>;
    public chartdata: Array<any>;
    public barChartLabels2: Array<any>;
    public chartColorspie: Array<any>;
    public barChartType2: string;
    public barChartLegend2: boolean;
    public barChartData3: any[];
    public barChartLabels3: any[] = [];
    public barChartType3: string;
    public barChartLegend3: boolean;
    public barChartData4: any[];
    public barChartLabels4: any[] = [];
    public barChartType4: string;
    public barChartLegend4: boolean;
    public selectedvalue: string;

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }
    constructor(private http: HttpClient,private globalService
        : globalservices) { }
    onItemSelect(item: any) {
        this.selectedvalue = '';
        console.log(item);
        console.log(this.selectedItems);
        // tslint:disable-next-line:forin
        for (const key in this.selectedItems) {
            console.log ('key: ' +  key + ',  value: ' + this.selectedItems[key].id);
            this.selectedvalue = this.selectedvalue + ',' + this.selectedItems[key].id;
        }
        this.Location = [];
        this.Location1 = [];
        this.Location2 = [];
        this.Location3 = [];
        this.Location4 = [];
        this.Ontime = [];
        this.oneday = [];
        this.twoday = [];
        this.gratertwoday = [];
        this.lWithin24Hrs = [];
        this.lBetween24HrsTo48Hrs = [];
        this.lBetween48hrsto72hrs = [];
        this.lGreaterthan72hrs = [];
        this.Within24Hrs = [];
        this.Between24HrsTo48Hrs = [];
        this.Between48hrsto72hrs = [];
        this.Greaterthan72hrs = [];
        this.IndentReceived = [];
        this.IndentPlaced = [];
        this.barchart = [];
        this.VehiclePlacedTime = [];
        this.HourBinID = [];
        this.HourBin = [];
        this.VehiclePlacedTime0to24 = [];
        this.VehiclePlacedTime24to48 = [];
        this.VehiclePlacedTime48to72 = [];

        this.http.get(this.url4 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + this.nryear + '&brcd=' + this.selectedvalue).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location4.push(x.Location);
                this.Within24Hrs.push(x.Within24Hrs);
                this.Between24HrsTo48Hrs.push(x.Between24HrsTo48Hrs);
                this.Between48hrsto72hrs.push(x.Between48hrsto72hrs);
            });
        });
        this.barChartLabels4 = this.Location4;
        this.barChartData4 = [{ data: this.Within24Hrs, label: 'Average Hour < 24' }, { data: this.Between24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.Between48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType4 = 'bar';
        this.barChartLegend4 = true;


    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
        this.selectedvalue = '';
        console.log(item);
        console.log(this.selectedItems);
        // tslint:disable-next-line:forin
        for (const key in this.selectedItems) {
            console.log ('key: ' +  key + ',  value: ' + this.selectedItems[key].id);
            this.selectedvalue = this.selectedvalue + ',' + this.selectedItems[key].id;
        }
        this.Location = [];
        this.Location1 = [];
        this.Location2 = [];
        this.Location3 = [];
        this.Location4 = [];
        this.Ontime = [];
        this.oneday = [];
        this.twoday = [];
        this.gratertwoday = [];
        this.lWithin24Hrs = [];
        this.lBetween24HrsTo48Hrs = [];
        this.lBetween48hrsto72hrs = [];
        this.lGreaterthan72hrs = [];
        this.Within24Hrs = [];
        this.Between24HrsTo48Hrs = [];
        this.Between48hrsto72hrs = [];
        this.Greaterthan72hrs = [];
        this.IndentReceived = [];
        this.IndentPlaced = [];
        this.barchart = [];
        this.VehiclePlacedTime = [];
        this.HourBinID = [];
        this.HourBin = [];
        this.VehiclePlacedTime0to24 = [];
        this.VehiclePlacedTime24to48 = [];
        this.VehiclePlacedTime48to72 = [];

        this.http.get(this.url4 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + this.nryear + '&brcd=' + this.selectedvalue).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location4.push(x.Location);
                this.Within24Hrs.push(x.Within24Hrs);
                this.Between24HrsTo48Hrs.push(x.Between24HrsTo48Hrs);
                this.Between48hrsto72hrs.push(x.Between48hrsto72hrs);
            });
        });
        this.barChartLabels4 = this.Location4;
        this.barChartData4 = [{ data: this.Within24Hrs, label: 'Average Hour < 24' }, { data: this.Between24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.Between48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType4 = 'bar';
        this.barChartLegend4 = true;
    }
    onSelectAll(items: any) {
        console.log(items);
        this.selectedvalue = '';

        // tslint:disable-next-line:forin
        this.Location = [];
        this.Location1 = [];
        this.Location2 = [];
        this.Location3 = [];
        this.Location4 = [];
        this.Ontime = [];
        this.oneday = [];
        this.twoday = [];
        this.gratertwoday = [];
        this.lWithin24Hrs = [];
        this.lBetween24HrsTo48Hrs = [];
        this.lBetween48hrsto72hrs = [];
        this.lGreaterthan72hrs = [];
        this.Within24Hrs = [];
        this.Between24HrsTo48Hrs = [];
        this.Between48hrsto72hrs = [];
        this.Greaterthan72hrs = [];
        this.IndentReceived = [];
        this.IndentPlaced = [];
        this.barchart = [];
        this.VehiclePlacedTime = [];
        this.HourBinID = [];
        this.HourBin = [];
        this.VehiclePlacedTime0to24 = [];
        this.VehiclePlacedTime24to48 = [];
        this.VehiclePlacedTime48to72 = [];

        this.http.get(this.url4 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + this.nryear + '&brcd=' + this.selectedvalue).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location4.push(x.Location);
                this.Within24Hrs.push(x.Within24Hrs);
                this.Between24HrsTo48Hrs.push(x.Between24HrsTo48Hrs);
                this.Between48hrsto72hrs.push(x.Between48hrsto72hrs);
            });
        });
        this.barChartLabels4 = this.Location4;
        this.barChartData4 = [{ data: this.Within24Hrs, label: 'Average Hour < 24' }, { data: this.Between24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.Between48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType4 = 'bar';
        this.barChartLegend4 = true;
    }
    onDeSelectAll(items: any) {
        console.log(items);
        this.selectedvalue = '';
        // tslint:disable-next-line:forin
        this.Location = [];
        this.Location1 = [];
        this.Location2 = [];
        this.Location3 = [];
        this.Location4 = [];
        this.Ontime = [];
        this.oneday = [];
        this.twoday = [];
        this.gratertwoday = [];
        this.lWithin24Hrs = [];
        this.lBetween24HrsTo48Hrs = [];
        this.lBetween48hrsto72hrs = [];
        this.lGreaterthan72hrs = [];
        this.Within24Hrs = [];
        this.Between24HrsTo48Hrs = [];
        this.Between48hrsto72hrs = [];
        this.Greaterthan72hrs = [];
        this.IndentReceived = [];
        this.IndentPlaced = [];
        this.barchart = [];
        this.VehiclePlacedTime = [];
        this.HourBinID = [];
        this.HourBin = [];
        this.VehiclePlacedTime0to24 = [];
        this.VehiclePlacedTime24to48 = [];
        this.VehiclePlacedTime48to72 = [];

        this.http.get(this.url4 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + this.nryear + '&brcd=' + this.selectedvalue).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location4.push(x.Location);
                this.Within24Hrs.push(x.Within24Hrs);
                this.Between24HrsTo48Hrs.push(x.Between24HrsTo48Hrs);
                this.Between48hrsto72hrs.push(x.Between48hrsto72hrs);
            });
        });
        this.barChartLabels4 = this.Location4;
        this.barChartData4 = [{ data: this.Within24Hrs, label: 'Average Hour < 24' }, { data: this.Between24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.Between48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType4 = 'bar';
        this.barChartLegend4 = true;
    }
    ngOnInit() {
        this.getIP();
        this.auditlog();
        this.dropdownSettings = {
            singleSelection: false,
            text: 'Select Branch',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            enableCheckAll: true,
            classes: 'form-control pure-checkbox',
            selectGroup: true,
            badgeShowLimit: 5
        };
        this.http.get(this.urlbrcd)
            .subscribe((res) => this.dropdownList = res);

        this.http.get(this.urlyear)
            .subscribe((res) => this.yeardata = res);

        this.http.get(this.url + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + this.nryear).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location.push(x.Location);
                this.IndentReceived.push(x.IndentReceived);
                this.IndentPlaced.push(x.IndentPlaced);
            });
        });
        this.barChartLabels = this.Location;
        this.barChartData = [{ data: this.IndentReceived, label: 'Indent Received' }, { data: this.IndentPlaced, label: 'Indent Placed' }];
        this.barChartType = 'bar';
        this.barChartLegend = true;

        this.http.get(this.url1 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + this.nryear).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location1.push(x.Location);
                this.VehiclePlacedTime0to24.push(x.VehiclePlacedTime0to24);
                this.VehiclePlacedTime24to48.push(x.VehiclePlacedTime24to48);
                this.VehiclePlacedTime48to72.push(x.VehiclePlacedTime48to72);
            });
        });
        this.barChartLabels1 = this.Location1;
        this.barChartData1 = [{ data: this.VehiclePlacedTime0to24, label: 'Within 24 Hrs' }, { data: this.VehiclePlacedTime24to48, label: 'Between 24 Hrs To 48 Hrs' }, { data: this.VehiclePlacedTime48to72, label: 'Between 48 hrs to 72 hrs' }];
        this.barChartType1 = 'bar';
        this.barChartLegend1 = true;

        this.http.get(this.url2 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + this.nryear).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location2.push(x.Location);
                this.Ontime.push(x.Ontime);
                this.oneday.push(x.oneday);
                this.twoday.push(x.twoday);
                this.data = [
                    ['Before Time', x.Ontime],
                    ['On Time', x.oneday],
                    ['Late', x.twoday]
                 ];
            });
        });
        this.barChartLabels2 = ['Before Time', 'On Time', 'Late'];
        // this.barChartLegend2 = true;

        this.http.get(this.url3 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + this.nryear).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location3.push(x.Location);
                this.lWithin24Hrs.push(x.lWithin24Hrs);
                this.lBetween24HrsTo48Hrs.push(x.lBetween24HrsTo48Hrs);
                this.lBetween48hrsto72hrs.push(x.lBetween48hrsto72hrs);
            });
        });
        this.barChartLabels3 = this.Location3;
        this.barChartData3 = [{ data: this.lWithin24Hrs, label: 'Average Hour < 24' }, { data: this.lBetween24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.lBetween48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType3 = 'bar';
        this.barChartLegend3 = true;

        this.http.get(this.url4 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + this.nryear + '&brcd=' + this.selectedvalue).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location4.push(x.Location);
                this.Within24Hrs.push(x.Within24Hrs);
                this.Between24HrsTo48Hrs.push(x.Between24HrsTo48Hrs);
                this.Between48hrsto72hrs.push(x.Between48hrsto72hrs);
            });
        });
        this.barChartLabels4 = this.Location4;
        this.barChartData4 = [{ data: this.Within24Hrs, label: 'Average Hour < 24' }, { data: this.Between24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.Between48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType4 = 'bar';
        this.barChartLegend4 = true;

        // window.addEventListener('beforeunload', function (e) {
        //     const currentUser = localStorage.getItem('custcd');
        //     if (currentUser) {
        //       localStorage.removeItem('isLoggedin');
        //       localStorage.removeItem('custcd');
        //       localStorage.removeItem('custnm');
        //     }
        // });

    }
    getIPAddress() {
        return this.http.get('http://api.ipify.org/?format=json');
    }
    getIP() {
    this.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
    }
    date = new Date()
    auditlog() {
      const myObj = {
        custcode: this.custcd,
        IPAddress: this.ipAddress,
        modulename: 'dashboard',
        sessiontime: '0001-01-01T00:00:00',
        logindatetime: '0001-01-01T00:00:00',
        moduleopendatetime: new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString()
      };
      const myObjStr = JSON.stringify(myObj);
      const body = myObjStr.toString();
      this.http.post<any>('https://v-api.varuna.net/api/audit', body, this.httpOptions).subscribe((results: Common[]) => {
            results.forEach(xx => {
              if (this.custcd !== '') {
               this.dataSaved = true;
                this.massage = '';
              }
            });
        });
    }
    onSelectMonth(monthid) {
        this.Location = [];
        this.Location1 = [];
        this.Location2 = [];
        this.Location3 = [];
        this.Location4 = [];
        this.Ontime = [];
        this.oneday = [];
        this.twoday = [];
        this.gratertwoday = [];
        this.lWithin24Hrs = [];
        this.lBetween24HrsTo48Hrs = [];
        this.lBetween48hrsto72hrs = [];
        this.lGreaterthan72hrs = [];
        this.Within24Hrs = [];
        this.Between24HrsTo48Hrs = [];
        this.Between48hrsto72hrs = [];
        this.Greaterthan72hrs = [];
        this.IndentReceived = [];
        this.IndentPlaced = [];
        this.barchart = [];
        this.VehiclePlacedTime = [];
        this.HourBinID = [];
        this.HourBin = [];
        this.VehiclePlacedTime0to24 = [];
        this.VehiclePlacedTime24to48 = [];
        this.VehiclePlacedTime48to72 = [];



        this.http.get(this.url + '?Custcd=' + this.custcd + '&monthid=' + monthid + '&yearid=' + this.nryear).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location.push(x.Location);
                this.IndentReceived.push(x.IndentReceived);
                this.IndentPlaced.push(x.IndentPlaced);
            });
        });
        this.barChartLabels = this.Location;
        this.barChartData = [{ data: this.IndentReceived, label: 'Indent Received' }, { data: this.IndentPlaced, label: 'Indent Placed' }];
        this.barChartType = 'bar';
        this.barChartLegend = true;

        this.http.get(this.url1 + '?Custcd=' + this.custcd + '&monthid=' + monthid + '&yearid=' + this.nryear).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location1.push(x.Location);
                this.VehiclePlacedTime0to24.push(x.VehiclePlacedTime0to24);
                this.VehiclePlacedTime24to48.push(x.VehiclePlacedTime24to48);
                this.VehiclePlacedTime48to72.push(x.VehiclePlacedTime48to72);
            });
        });
        this.barChartLabels1 = this.Location1;
        this.barChartData1 = [{ data: this.VehiclePlacedTime0to24, label: 'Within 24 Hrs' }, { data: this.VehiclePlacedTime24to48, label: 'Between 24 Hrs To 48 Hrs' }, { data: this.VehiclePlacedTime48to72, label: 'Between 48 hrs to 72 hrs' }];
        this.barChartType1 = 'bar';
        this.barChartLegend1 = true;

        this.http.get(this.url2 + '?Custcd=' + this.custcd + '&monthid=' + monthid + '&yearid=' + this.nryear).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location2.push(x.Location);
                this.Ontime.push(x.Ontime);
                this.oneday.push(x.oneday);
                this.twoday.push(x.twoday);
                this.data = [
                    ['Before Time', x.Ontime],
                    ['On Time', x.oneday],
                    ['Late', x.twoday]
                 ];
            });
        });
        this.barChartLabels2 = this.Location2;
        this.barChartData2 = [{ data: this.Ontime, label: 'Before Time' }, { data: this.oneday, label: 'On Time' }, { data: this.twoday, label: 'Late' }];
        this.barChartType2 = 'bar';
        this.barChartLegend2 = true;

        this.http.get(this.url3 + '?Custcd=' + this.custcd + '&monthid=' + monthid + '&yearid=' + this.nryear).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location3.push(x.Location);
                this.lWithin24Hrs.push(x.lWithin24Hrs);
                this.lBetween24HrsTo48Hrs.push(x.lBetween24HrsTo48Hrs);
                this.lBetween48hrsto72hrs.push(x.lBetween48hrsto72hrs);
            });
        });
        this.barChartLabels3 = this.Location3;
        this.barChartData3 = [{ data: this.lWithin24Hrs, label: 'Average Hour < 24' }, { data: this.lBetween24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.lBetween48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType3 = 'bar';
        this.barChartLegend3 = true;

        this.http.get(this.url4 + '?Custcd=' + this.custcd + '&monthid=' + monthid + '&yearid=' + this.nryear + '&brcd=' + this.selectedvalue).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location4.push(x.Location);
                this.Within24Hrs.push(x.Within24Hrs);
                this.Between24HrsTo48Hrs.push(x.Between24HrsTo48Hrs);
                this.Between48hrsto72hrs.push(x.Between48hrsto72hrs);
            });
        });
        this.barChartLabels4 = this.Location4;
        this.barChartData4 = [{ data: this.Within24Hrs, label: 'Average Hour < 24' }, { data: this.Between24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.Between48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType4 = 'bar';
        this.barChartLegend4 = true;

    }
    onSelectYear(yearid) {
        this.Location = [];
        this.Location1 = [];
        this.Location2 = [];
        this.Location3 = [];
        this.Location4 = [];
        this.Ontime = [];
        this.oneday = [];
        this.twoday = [];
        this.gratertwoday = [];
        this.lWithin24Hrs = [];
        this.lBetween24HrsTo48Hrs = [];
        this.lBetween48hrsto72hrs = [];
        this.lGreaterthan72hrs = [];
        this.Within24Hrs = [];
        this.Between24HrsTo48Hrs = [];
        this.Between48hrsto72hrs = [];
        this.Greaterthan72hrs = [];
        this.IndentReceived = [];
        this.IndentPlaced = [];
        this.barchart = [];
        this.VehiclePlacedTime = [];
        this.HourBinID = [];
        this.HourBin = [];
        this.VehiclePlacedTime0to24 = [];
        this.VehiclePlacedTime24to48 = [];
        this.VehiclePlacedTime48to72 = [];

        this.http.get(this.url + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + yearid).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location.push(x.Location);
                this.IndentReceived.push(x.IndentReceived);
                this.IndentPlaced.push(x.IndentPlaced);
            });
        });
        this.barChartLabels = this.Location;
        this.barChartData = [{ data: this.IndentReceived, label: 'Indent Received' }, { data: this.IndentPlaced, label: 'Indent Placed' }];
        this.barChartType = 'bar';
        this.barChartLegend = true;

        this.http.get(this.url1 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + yearid).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location1.push(x.Location);
                this.VehiclePlacedTime0to24.push(x.VehiclePlacedTime0to24);
                this.VehiclePlacedTime24to48.push(x.VehiclePlacedTime24to48);
                this.VehiclePlacedTime48to72.push(x.VehiclePlacedTime48to72);
            });
        });
        this.barChartLabels1 = this.Location1;
        this.barChartData1 = [{ data: this.VehiclePlacedTime0to24, label: 'Within 24 Hrs' }, { data: this.VehiclePlacedTime24to48, label: 'Between 24 Hrs To 48 Hrs' }, { data: this.VehiclePlacedTime48to72, label: 'Between 48 hrs to 72 hrs' }];
        this.barChartType1 = 'bar';
        this.barChartLegend1 = true;

        this.http.get(this.url2 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + yearid).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location2.push(x.Location);
                this.Ontime.push(x.Ontime);
                this.oneday.push(x.oneday);
                this.twoday.push(x.twoday);
                this.data = [
                    ['Before Time', x.Ontime],
                    ['On Time', x.oneday],
                    ['Late', x.twoday]
                 ];
            });
        });
        this.barChartLabels2 = this.Location2;
        this.barChartData2 = [{ data: this.Ontime, label: 'Before Time' }, { data: this.oneday, label: 'On Time' }, { data: this.twoday, label: 'Late' }];
        this.barChartType2 = 'bar';
        this.barChartLegend2 = true;

        this.http.get(this.url3 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + yearid).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location3.push(x.Location);
                this.lWithin24Hrs.push(x.lWithin24Hrs);
                this.lBetween24HrsTo48Hrs.push(x.lBetween24HrsTo48Hrs);
                this.lBetween48hrsto72hrs.push(x.lBetween48hrsto72hrs);
            });
        });
        this.barChartLabels3 = this.Location3;
        this.barChartData3 = [{ data: this.lWithin24Hrs, label: 'Average Hour < 24' }, { data: this.lBetween24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.lBetween48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType3 = 'bar';
        this.barChartLegend3 = true;

        this.http.get(this.url4 + '?Custcd=' + this.custcd + '&monthid=' + this.nrSelect + '&yearid=' + yearid + '&brcd=' + this.selectedvalue).subscribe((result: Data[]) => {
            result.forEach(x => {
                this.Location4.push(x.Location);
                this.Within24Hrs.push(x.Within24Hrs);
                this.Between24HrsTo48Hrs.push(x.Between24HrsTo48Hrs);
                this.Between48hrsto72hrs.push(x.Between48hrsto72hrs);
            });
        });
        this.barChartLabels4 = this.Location4;
        this.barChartData4 = [{ data: this.Within24Hrs, label: 'Average Hour < 24' }, { data: this.Between24HrsTo48Hrs, label: 'Average Hour between 24 and 48' }, { data: this.Between48hrsto72hrs, label: 'Average Hour > 48' }];
        this.barChartType4 = 'bar';
        this.barChartLegend4 = true;
    }
}
