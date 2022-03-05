import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OnboardingGuard } from './guards/onboarding.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'edit-todo',
    loadChildren: () => import('./edit-todo/edit-todo.module').then( m => m.EditTodoPageModule)
  },
  {
    path: 'edit-todo/:id',
    loadChildren: () => import('./edit-todo/edit-todo.module').then( m => m.EditTodoPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
