import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionRoutingModule } from './suggestion-routing.module';
import { SuggestionComponent } from './suggestion.component';
import { PageHeaderModule } from './../../shared';
import { AgmCoreModule } from '@agm/core';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [CommonModule, SuggestionRoutingModule, PageHeaderModule, FormsModule, HttpClientModule, NgxPaginationModule, ReactiveFormsModule, FilterPipeModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCQRIiVSlDIL7l0PilJGF-BGbgRKpGE29I'
          })],
    declarations: [SuggestionComponent]
})
export class SuggestionModule {}
