import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuggestionComponent } from './suggestion.component';

const routes: Routes = [
    {
        path: '', component: SuggestionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SuggestionRoutingModule {
}
