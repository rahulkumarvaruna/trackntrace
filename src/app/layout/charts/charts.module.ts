import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
    imports: [CommonModule, Ng2Charts, FormsModule, AngularMultiSelectModule, ReactiveFormsModule, NgbModule, ChartsRoutingModule, PageHeaderModule, GoogleChartsModule],
    declarations: [ChartsComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ChartsModule {}
