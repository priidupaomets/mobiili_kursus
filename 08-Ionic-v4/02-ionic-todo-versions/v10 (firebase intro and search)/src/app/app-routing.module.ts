import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OnboardingGuard } from './guards/onboarding.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [OnboardingGuard]
  },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
