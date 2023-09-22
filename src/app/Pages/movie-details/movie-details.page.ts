import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../Services/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
// import { FormMovieDetailsInterface } from 'src/app/Pages/movie-details/Interface/movie-details.interface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  public homeForm: FormGroup;
  resultApi: any;
  filterResultApi: any[] = [];
  searchQuery: string = '';
  loading = true;
  filmeId: number;
  genres: any[];
  production_companies: any[];
  production_countries: any[];
  spoken_languages: any[];
  poster_path: any[];
  title: any[];
  original_title: any[];
  release_date: string;
  vote_average: string;
  overview: any[];
  cast: any[];
  runtime: any[];

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private datePipe: DatePipe
  ) {
    // this.homeForm = fb.group(new FormMovieDetailsInterface());
  }

  ngOnInit() {
    this.filmeId = +this.route.snapshot.paramMap.get('id');
    console.log(this.filmeId);
    this.loadMovieDetails(this.filmeId);
    this.loadMovieCast(this.filmeId);
  }

  async loadMovieDetails(id: number) {
    await this.http.getMovieDetails(id).then((result: any) => {
      this.loading = false;
      // this.resultApi = result;
      this.poster_path = result.poster_path;
      this.title = result.title;
      this.original_title = result.original_title;
      this.genres = result.genres;
      this.release_date = this.datePipe.transform(result.release_date, 'yyyy');
      const vote_average = result.vote_average;
      const formatter = new Intl.NumberFormat('en', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      this.vote_average = formatter.format(vote_average);
      this.overview = result.overview;
      this.production_companies = result.production_companies;
      this.production_countries = result.production_countries;
      this.spoken_languages = result.spoken_languages;
      this.runtime = result.runtime;
    });
  }

  async loadMovieCast(id: number) {
    await this.http.getMovieCast(id).then((result: any) => {
      this.loading = false;
      this.cast = result.cast.slice(0,15);
      console.log(this.cast);
    });
  }

}
