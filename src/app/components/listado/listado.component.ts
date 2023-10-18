import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/interfaces/PokemonData';
import { PokemonesService } from 'src/app/servicios/pokemones.service';



@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit{
  pokemons: any[] = [];
  offset = 0;
  isLoading: boolean = false;
  limit : number = 20;

  constructor(private pokemonService: PokemonesService) { }

  ngOnInit() : void {
    this.loadPokemons();
  }

  changeLimit() {
    this.offset = 0; // Reiniciar el offset
    this.loadPokemons(); // Recargar los pokemones con el nuevo límite
  }

  loadPokemons() {
    this.isLoading = true; 
    setTimeout(() => {
      this.pokemonService.getPokemons(this.offset,this.limit).subscribe(
        (data : PokemonData) => {
          this.pokemons = data.results ;
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        }
      );
    }, 1500); 
  }

  nextPage() {
    this.offset += 20;
    this.loadPokemons();
  }

  previousPage() {
    if (this.offset > 0) {
      this.offset -= 20;
    }
    this.loadPokemons();
  }
  
}
