import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: any;
  error = false;

  constructor(
    private movieService: MovieService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(Number(id)).subscribe({
      next: (data) => this.movie = data,
      error: () => this.error = true
    });
  }

  deleteMovie() {
    if (confirm(`¿Estás seguro que deseas eliminar "${this.movie.title}"?`)) {
      this.movieService.deleteMovie(this.movie.id).subscribe({
        next: () => {
          alert('Película eliminada correctamente.');
          this.router.navigate(['/movies']); // Regresa al catálogo
        },
        error: () => alert('Error al eliminar la película.')
      });
    }
  }
}

