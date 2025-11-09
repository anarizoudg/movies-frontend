import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-movie.component.html',
})
export class EditMovieComponent implements OnInit {
  movieForm: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      synopsis: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]],
      cover: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(this.id).subscribe({
      next: (movie) => this.movieForm.patchValue(movie),
      error: (err) => console.error(err),
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      this.movieService.updateMovie(this.id, this.movieForm.value).subscribe({
        next: () => {
          alert('Película actualizada con éxito!');
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar la película');
        },
      });
    }
  }
}
