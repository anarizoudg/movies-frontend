import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'movies/add', component: AddMovieComponent },
  { path: 'movies/edit/:id', component: EditMovieComponent },
];
