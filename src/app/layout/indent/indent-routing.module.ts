import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndentComponent } from './indent.component';

const routes: Routes = [
    {
        path: '', component: IndentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IndentRoutingModule {
}
