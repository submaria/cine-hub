import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.api;
const API_KEY = 'cc1763d0ae0f729ed9d86167b9500a5e';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  async get(req: string, options?: any) {
    return await this.http
      .get(`${API}/${req}`, options)
      .toPromise()
      .then((retorno: any) => retorno);
  }

  async post(req: string, value: any) {
    return await this.http
      .post(`${API}/${req}`, value)
      .toPromise()
      .then((retorno: any) => retorno);
  }

  async put(req: string, value: any) {
    return await this.http
      .put(`${API}/${req}`, value)
      .toPromise()
      .then((retorno: any) => retorno);
  }

  async delete(req: string, codigo: number) {
    return await this.http
      .delete(`${API}/${req}/${codigo}`)
      .toPromise()
      .then((retorno: any) => retorno);
  }

  //MOVIES API

  async getMoviesTopRated(page: number = 1) {
    return await this.http
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=${page}`)
      .toPromise()
      .then((retorno: any) => retorno);
  }

  async getMovieCast(id: number) {
    return await this.http
      .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`)
      .toPromise()
      .then((retorno: any) => retorno);
  }

  async getMovieSearch(event: any, page: number = 1){
    return await this.http
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${event}&include_adult=false&language=pt-BR&page=${page}`)
      .toPromise()
      .then((retorno: any) => retorno);
    }

  async getMovieList() {
    return await this.http
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`)
      .toPromise()
      .then((retorno: any) => retorno);
  }

  async getMovieDetails(id: number) {
    return await this.http
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`)
      .toPromise()
      .then((retorno: any) => retorno);
  }

}
