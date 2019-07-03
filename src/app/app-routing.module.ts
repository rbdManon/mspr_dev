import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule', canActivate: [AuthGuard] },
  { path: 'calculator', loadChildren: './calculator/calculator.module#CalculatorPageModule', canActivate: [AuthGuard] },
  { path: 'map-offline', loadChildren: './map-offline/map-offline.module#MapOfflinePageModule', canActivate: [AuthGuard] },
  { path: 'form/list', loadChildren: './form-list/form-list.module#FormListPageModule', canActivate: [AuthGuard] },  
  { path: 'form/new', loadChildren: './admin/form-edit/form-edit.module#FormEditPageModule', canActivate: [AuthGuard] },
  { path: 'form/:uuid', loadChildren: './form/form.module#FormPageModule', canActivate: [AuthGuard] },
  { path: 'form/:form_uuid/question/:position', loadChildren: './question/question.module#QuestionPageModule', canActivate: [AuthGuard] },
  { path: 'form/:form_uuid/results', loadChildren: './form-results/form-results.module#FormResultsPageModule', canActivate: [AuthGuard] },
  { path: 'form/:form_uuid/edit', loadChildren: './admin/form-edit/form-edit.module#FormEditPageModule', canActivate: [AuthGuard] },
  { path: 'practitioner/:uuid', loadChildren: './practitioner/practitioner.module#PractitionerPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
