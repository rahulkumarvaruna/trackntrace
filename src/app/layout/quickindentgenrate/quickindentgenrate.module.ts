import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickindentgenrateRoutingModule } from './quickindentgenrate-routing.module';
import { QuickindentgenrateComponent } from './quickindentgenrate.component';
import { PageHeaderModule } from './../../shared';
import { AgmCoreModule } from '@agm/core';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { AgmDirectionModule } from 'agm-direction';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, QuickindentgenrateRoutingModule, PageHeaderModule, FormsModule, NgbModule, TooltipModule, NgxPaginationModule, ReactiveFormsModule, FilterPipeModule, AgmDirectionModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCQRIiVSlDIL7l0PilJGF-BGbgRKpGE29I'
          })],
    declarations: [QuickindentgenrateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuickindentgenrateModule {}
