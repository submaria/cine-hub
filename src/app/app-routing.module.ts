import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Services/authentication/auth.guard';
import { MovieDetailsPage } from './Pages/movie-details/movie-details.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'genres',
    loadChildren: () => import('./Pages/genres/genres.module').then( m => m.GenresPageModule)
  },
  {
    path: 'movie-details/:id',
    loadChildren: () => import('./Pages/movie-details/movie-details.module').then( m => m.MovieDetailsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./Pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'popular',
    loadChildren: () => import('./Pages/popular/popular.module').then( m => m.PopularPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
