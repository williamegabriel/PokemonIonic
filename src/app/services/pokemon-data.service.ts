import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  private pokemonsCapturados: any[] = [];

  constructor() { }

  adicionarPokemonCapturado(pokemon: any): void {
    pokemon.victories = 0;
    pokemon.defeats = 0;
    pokemon.draws = 0;
    this.pokemonsCapturados.push(pokemon);
  }

  getPokemonsCapturados(): any[] {
    return this.pokemonsCapturados;
  }

  setPokemonsCapturados(pokemons: any[]): void {
    this.pokemonsCapturados = pokemons;
  }

  limparPokemonsCapturados(): void {
    this.pokemonsCapturados = [];
  }

  incrementarVitoria(pokemon: any): void {
    pokemon.victories = (pokemon.victories || 0) + 1;
  }

  incrementarDerrota(pokemon: any): void {
    pokemon.defeats = (pokemon.defeats || 0) + 1;
  }

  incrementarEmpate(pokemon: any): void {
    pokemon.draws = (pokemon.draws || 0) + 1;
  }
}
