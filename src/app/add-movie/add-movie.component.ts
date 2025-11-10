import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 necesario para usar ngModel
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  // 👇 esta propiedad es la que usas en el HTML con [(ngModel)]
  movie: Partial<Movie> = {
    title: '',
    synopsis: '',
    year: new Date().getFullYear(),
    cover: ''
  };

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.movie.title || !this.movie.synopsis || !this.movie.year) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.movieService.addMovie(this.movie as Movie).subscribe({
      next: () => {
        alert('🎬 Película agregada correctamente');
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        console.error('Error al agregar película:', err);
        alert('Ocurrió un error al agregar la película.');
      }
    });
  }
}
