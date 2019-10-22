import { Injectable } from '@angular/core';
import  { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  
  getAllMovies(title:string){
    return this.http.get(`http://api.themoviedb.org/3/search/movie?api_key=931bdd8351ce1aff8e07cbf500429f27&language=en-US&page=1&include_adult=false&query=${title}`);
  }
}
