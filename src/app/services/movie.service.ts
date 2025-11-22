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

<<<<<<< HEAD
  private apiUrl = 'http://127.0.0.1:8000/api/movies';
=======
  private apiUrl = 'https://moviescatalog-production.up.railway.app/api/movies';
>>>>>>> b986076f00f84b00875d61b5b0b24b4c89cfe92a

  constructor(private http: HttpClient) { }

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
