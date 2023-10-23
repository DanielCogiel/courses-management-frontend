import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from "./guards/authenticated.guard";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
    children: [
      {
        path: '',
        canActivate: [AuthenticatedGuard],
        loadComponent: () => import('./pages/courses-page/courses-page.component').then(c => c.CoursesPageComponent)
      },
    ]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/registration-page/registration-page.component').then(c => c.RegistrationPageComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
