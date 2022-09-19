import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'courses/:id',
    loadChildren: () =>
      import('./details-course/details-course.module').then(
        (m) => m.DetailsCoursePageModule
      ),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./add-course/add-course.module').then(
        (m) => m.AddCoursePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
