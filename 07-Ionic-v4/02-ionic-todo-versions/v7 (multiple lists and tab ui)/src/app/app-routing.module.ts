import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  // { path: 'edit-todo', loadChildren: './edit-todo/edit-todo.module#EditTodoPageModule' },
  // { path: 'add-list', loadChildren: './add-list/add-list.module#AddListPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
