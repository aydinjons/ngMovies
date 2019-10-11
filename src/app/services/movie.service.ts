import { Injectable } from '@angular/core';
import  { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  
  getAllMovies(title:string){
    return this.http.get(`http://www.omdbapi.com/?apikey=9c1059c9&s=${title}`);
  }
}
