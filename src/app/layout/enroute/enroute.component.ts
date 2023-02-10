import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { routerTransition } from '../../router.animations';
import { globalservices } from '../../shared/globalservices';

@Component({
  selector: 'app-enroute',
  templateUrl: './enroute.component.html',
  styleUrls: ['./enroute.component.scss'],
  animations: [routerTransition()]
})
export class EnrouteComponent implements OnInit {
  customerdetail: any;
  loading = false;
  p = 1;
  veh: any;
  public custcd = localStorage.getItem('custcd');
  public custnm = localStorage.getItem('custnm');
  test: string;
  test1: string;
  test2: string;
  title = 'Map';
  lat = 20.5937;
  lng = 78.9629;
  selectedName: any;
  searchbox: string;
  openedWindow: 0;
  show: boolean;
  buttonName: any = 'Show Map';
  constructor(private http: HttpClient, private globalService
    : globalservices) {
  }
  ngOnInit() {
    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + 'customer_Tracking_Detail?Custcd=' + this.custcd)
      .subscribe((res) => this.customerdetail = res);
  }
  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
  openWindow(Vehicleno) {
    this.openedWindow = Vehicleno; // alternative: push to array of numbers
  }
  isInfoWindowOpen(Vehicleno) {
    return this.openedWindow === Vehicleno; // alternative: check if id is in array
  }
  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.buttonName = 'Hide Map';
    } else {
      this.buttonName = 'Show Map';
    }
  }
}
