import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrouteRoutingModule } from './enroute-routing.module';
import { EnrouteComponent } from './enroute.component';
import { PageHeaderModule } from './../../shared';
import { AgmCoreModule } from '@agm/core';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [CommonModule, EnrouteRoutingModule, PageHeaderModule, FormsModule, NgxPaginationModule, ReactiveFormsModule, FilterPipeModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCQRIiVSlDIL7l0PilJGF-BGbgRKpGE29I'
          })],
    declarations: [EnrouteComponent]
})
export class EnrouteModule {}
