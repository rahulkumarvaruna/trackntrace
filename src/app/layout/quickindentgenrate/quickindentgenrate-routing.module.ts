import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickindentgenrateComponent } from './quickindentgenrate.component';

const routes: Routes = [
    {
        path: '', component: QuickindentgenrateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuickindentgenrateRoutingModule {
}