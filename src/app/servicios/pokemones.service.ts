import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonData } from '../interfaces/PokemonData';

@Injectable({
  providedIn: 'root'
})
export class PokemonesService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(offset: number, limit: number): Observable<PokemonData> {
    return this.http.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${name}`);
  }

  getAbilityDetails(name: string): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/ability/${name}`);
  }
  
}
