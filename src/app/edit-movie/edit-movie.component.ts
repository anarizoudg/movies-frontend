import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MovieService, Movie } from '../services/movie.service';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movieForm!: FormGroup;
  movieId!: number;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      synopsis: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      cover: ['', Validators.required]
    });

    this.movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovie(this.movieId).subscribe({
      next: (movie: Movie) => {
        this.movieForm.patchValue(movie);
      },
      error: (err: any) => {
        console.error('Error al cargar la película:', err);
      }
    });
  }

  onSubmit() {
    if (this.movieForm.valid) {
      this.movieService.updateMovie(this.movieId, this.movieForm.value).subscribe({
        next: () => {
          alert('Película actualizada correctamente.');
          this.router.navigate(['/movies']);
        },
        error: (err: any) => {
          console.error('Error al actualizar la película:', err);
        }
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}
