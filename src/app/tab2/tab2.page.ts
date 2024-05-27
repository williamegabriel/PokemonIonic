import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { PokemonDataService } from '../services/pokemon-data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  pokemon: any = {
    name: '',
    front_default: '',
    abilities: 0,
    height: '',
    weight: '',
    victories: 0,
    defeats: 0,
    draws: 0
  };
  pokemonNameStyle: any = {};
  pokemonComparisonResult: string = '';
ativarCamera: any;

  constructor(
    private pokeAPIService: PokeAPIService,
    private pokemonDataService: PokemonDataService
  ) {}

  ngOnInit() {
    this.carregarPokemonAleatorio();
  }

  carregarPokemonAleatorio() {
    const pokemonsCapturados = this.pokemonDataService.getPokemonsCapturados(); // Corrigido para getPokemonsCapturados
    const pokemonTab1 = pokemonsCapturados[pokemonsCapturados.length - 1]; // Obtém o último Pokémon capturado

    this.pokeAPIService.getPokeAPIService(this.gerarIdAleatorio()).subscribe(pokemonData => {
      const pokemon = JSON.parse(JSON.stringify(pokemonData));
      this.pokemon.name = pokemon.name;
      this.pokemon.front_default = pokemon.sprites.other['official-artwork'].front_default;
      this.pokemon.abilities = parseInt(pokemon.abilities.length, 10); // Convertendo para número inteiro
      this.pokemon.height = pokemon.height;
      this.pokemon.weight = pokemon.weight;
      this.pokemon.victories = 0;
      this.pokemon.defeats = 0;
      this.pokemon.draws = 0;

      if (pokemonTab1) {
        const abilitiesTab1 = parseInt(pokemonTab1.abilities.length, 10); // Convertendo para número inteiro
        const abilitiesTab2 = this.pokemon.abilities;
        this.compararHabilidades(pokemonTab1, abilitiesTab1, abilitiesTab2);
      }
    });
  }

  compararHabilidades(pokemonTab1: any, abilitiesTab1: number, abilitiesTab2: number) {
    if (abilitiesTab1 === abilitiesTab2) {
      this.pokemonNameStyle = { 'color': 'yellow' };
      this.pokemonComparisonResult = 'Empate';
      this.pokemonDataService.incrementarEmpate(pokemonTab1);
      this.pokemonDataService.incrementarEmpate(this.pokemon);
    } else if (abilitiesTab2 > abilitiesTab1) {
      this.pokemonNameStyle = { 'color': 'green' };
      this.pokemonComparisonResult = 'Ganhou';
      this.pokemonDataService.incrementarVitoria(this.pokemon);
      this.pokemonDataService.incrementarDerrota(pokemonTab1);
    } else {
      this.pokemonNameStyle = { 'color': 'red' };
      this.pokemonComparisonResult = 'Perdeu';
      this.pokemonDataService.incrementarDerrota(this.pokemon);
      this.pokemonDataService.incrementarVitoria(pokemonTab1);
    }
  }

  gerarIdAleatorio(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
}
