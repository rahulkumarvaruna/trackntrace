import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrouteComponent } from './enroute.component';

const routes: Routes = [
    {
        path: '', component: EnrouteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EnrouteRoutingModule {
}
