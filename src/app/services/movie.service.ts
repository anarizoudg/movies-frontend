import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // URL de producción en Railway
  private apiUrl = 'https://moviescatalog-production.up.railway.app/api/movies';

  constructor(private http: HttpClient) {}

  // Traer todas las películas
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  // Traer película por ID
  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva película
  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  // Actualizar película
  updateMovie(id: number, movie: Movie): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, movie);
  }

  // Eliminar película
  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
