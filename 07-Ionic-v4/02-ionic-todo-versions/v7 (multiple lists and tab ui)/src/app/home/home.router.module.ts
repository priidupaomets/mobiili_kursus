import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    // { path: 'lists', loadChildren: './lists/lists.module#ListsPageModule' },
    // { path: 'lists/todo-list/:id', loadChildren: './todo-list/todo-list.module#TodoListPageModule' },
    // { path: 'edit-todo', loadChildren: './edit-todo/edit-todo.module#EditTodoPageModule' },
    // { path: 'edit-todo/:id', loadChildren: './edit-todo/edit-todo.module#EditTodoPageModule' },

    children: [
        {
            path: 'lists',
            children: [
                { path: '', loadChildren: '../lists/lists.module#ListsPageModule' },
                { path: 'todo-list', loadChildren: '../todo-list/todo-list.module#TodoListPageModule' },
                { path: 'todo-list/:id', loadChildren: '../todo-list/todo-list.module#TodoListPageModule' },
                { path: 'edit-todo', loadChildren: '../edit-todo/edit-todo.module#EditTodoPageModule' },
                { path: 'edit-todo/:id', loadChildren: '../edit-todo/edit-todo.module#EditTodoPageModule' },
            ]
        },
        // {
        //     // path: 'lists/:id',
        //     path: 'todo-list',
        //     children: [
        //         {
        //             path: '',
        //             loadChildren: '../todo-list/todo-list.module#TodoListPageModule'
        //         },
        //     ]
        // },
              // { path: 'lists', loadChildren: '../lists/lists.module#ListsPageModule' },
        // { path: 'edit-todo', loadChildren: '../edit-todo/edit-todo.module#EditTodoPageModule' },
        { path: 'add-list', loadChildren: '../add-list/add-list.module#AddListPageModule' },
        // { path: 'lists/todo-list/:id', loadChildren: '../todo-list/todo-list.module#TodoListPageModule' },
        { path: 'calendar', loadChildren: '../calendar/calendar.module#CalendarPageModule' },
        { path: 'search', loadChildren: '../search/search.module#SearchPageModule' },
        { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
        { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule' },
        {
            path: '',
            redirectTo: '/tabs/lists',
            pathMatch: 'full'
        }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/lists',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
