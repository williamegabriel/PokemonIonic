import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../services/pokemon-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  pokemons: any[] = [];

  constructor(private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.pokemons = this.pokemonDataService.getPokemonsCapturados();
  }
}
