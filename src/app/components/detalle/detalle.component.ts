import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonesService } from 'src/app/servicios/pokemones.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {
  pokemon: any;
  images: string[] = [];
  abilities: any[] = [];
  isLoading : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonesService
  ) { }

  ngOnInit() {  
      this.loadDetails();  
  }


  loadDetails() {
    const name = this.route.snapshot.paramMap.get('pokemon');
    this.isLoading = true;

    setTimeout(() => {
      this.pokemonService.getPokemonDetails(name!).subscribe(
        data => {
          this.pokemon = data;
          this.isLoading = false;
          this.images = Object.values(this.pokemon.sprites).filter(sprite => sprite).slice(0, -2) as string[];
          this.pokemon.abilities.forEach((ability: any) => {
            this.pokemonService.getAbilityDetails(ability.ability.name).subscribe(
              abilityData => {
                this.abilities.push(abilityData);               
              },
              error => {
                console.error(error);
                this.isLoading = false;
              }
            );
          });
        },
        error => {
          console.error(error);
          this.isLoading = false;
        }
      );
      
    }, 1500) 
  }
  
}
