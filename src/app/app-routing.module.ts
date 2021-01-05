import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: "main", component: AppComponent},
  {path: '**', redirectTo: '/main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
  })],
exports: [RouterModule]
})

export class AppRoutingModule { }
