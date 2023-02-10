import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { globalservices } from '../../shared/globalservices';

@Component({
    selector: 'app-indent',
    templateUrl: './indent.component.html',
    styleUrls: ['./indent.component.scss'],
    animations: [routerTransition()]
})
export class IndentComponent implements OnInit {
  indentdtl: any;
  loading = false;
  p = 1;
  veh: any;
  test: string;
  test1: string;
  test2: string;
  title = 'Map';
  lat: Number = 28.70;
  lng: Number = 77.10;
  origin: any;
  destination: any;
  selectedName: any;
  searchbox: string;
  openedWindow: 0;
  show: boolean;
  buttonName: any = 'Show Map';
  closeResult: string;
  modalOptions: NgbModalOptions;
  constructor(private http: HttpClient, private modalService: NgbModal,private globalService
    : globalservices) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }
  ngOnInit() {
     this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + 'getallindent?customer=C00019939')
     .subscribe((res) => this.indentdtl = res);
    }
    onMouseOver(infoWindow, $event: MouseEvent) {
      infoWindow.open();
  }
onMouseOut(infoWindow, $event: MouseEvent) {
      infoWindow.close();
  }
  openWindow(VehicleNo) {
    this.openedWindow = VehicleNo; // alternative: push to array of numbers
}
  isInfoWindowOpen(VehicleNo) {
    return this.openedWindow === VehicleNo; // alternative: check if id is in array
}
toggle() {
this.show = !this.show;
if (this.show) {
  this.buttonName = 'Hide Map';
} else {
  this.buttonName = 'Show Map';
}
}
open(content, lat, long, pickuplat, pickuplong) {
  this.origin = [{ lat: lat, lng: long }];
  this.destination = [{ lat: pickuplat, lng: pickuplong }];
  this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
}
