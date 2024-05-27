import { PokemonDataService } from './../services/pokemon-data.service';
import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCepService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210'
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };
  pokemon: any = {};

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCepService: ViaCepService,
    private pokemonDataService: PokemonDataService
  ) {}
  buscarPokemon () {
    this.viaCepService.getViaCEPService(this.areaBuscarPokemon)
    .subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value)) ['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value)) ["bairro"];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value)) ['localidade'];
      this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value)) ['uf'];
    });
    this.pokeAPIService.getPokeAPIService()
    .subscribe((pokemonData) => {
      const pokemon = JSON.parse(JSON.stringify(pokemonData));
      this.pokemonDataService.adicionarPokemonCapturado(pokemon);
      this.pokemon = pokemon;
    });
  }
  gerarIdAleatorio(): number {
    return Math.floor(Math.random() * 100)+1 ;
  }
}
