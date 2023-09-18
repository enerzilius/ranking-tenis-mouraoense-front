import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

interface Data {
  id: number,
  nome: string,
  idade: number,
  pontos: number
  pontos1: number
  pontos2: number
  pontos3: number
  pontos4: number
}

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent  implements OnInit {
  
  // @Input() items: any;



  public data: Data[] = [
    {
      id: 1,
      nome: 'Águias da Noite',
      idade: 0,
      pontos: 20000,
      pontos1: 5000,
      pontos2: 5000,
      pontos3: 5000,
      pontos4: 5000,
    },
    {
      id: 2,
      nome: 'Marcos',
      idade: 57,
      pontos: 550,
      pontos1: 5000,
      pontos2: 5000,
      pontos3: 5000,
      pontos4: 5000,
    },
    {
      id: 3,
      nome: 'Giulio',
      idade: 16,
      pontos: 450,
      pontos1: 5000,
      pontos2: 5000,
      pontos3: 5000,
      pontos4: 5000,
    },
    {
      id: 4,
      nome: 'Walter',
      idade: 33,
      pontos: 400,
      pontos1: 5000,
      pontos2: 5000,
      pontos3: 5000,
      pontos4: 5000,
    },
    {
      id: 5,
      nome: 'Zé',
      idade: 17,
      pontos: 200,
      pontos1: 5000,
      pontos2: 5000,
      pontos3: 5000,
      pontos4: 5000,
    },
    {
      id: 6,
      nome: 'ELE',
      idade: 16,
      pontos: 150,
      pontos1: 5000,
      pontos2: 5000,
      pontos3: 5000,
      pontos4: 5000,
    },
    {
      id: 7,
      nome: 'É',
      idade: 16,
      pontos: 150,
      pontos1: 5000,
      pontos2: 5000,
      pontos3: 5000,
      pontos4: 5000,
    },
    {
      id: 8,
      nome: 'O',
      idade: 16,
      pontos: 150,
      pontos1: 5000,
      pontos2: 5000,
      pontos3: 5000,
      pontos4: 5000,
    },
    {
      id: 9,
      nome: 'ERICK',
      idade: 16,
      pontos: 150,
      pontos1: 5000,
      pontos2: 5000,
      pontos3: 5000,
      pontos4: 5000,
    },
    {
      id: 10,
      nome: 'M32',
      idade: 16,
      pontos: 4,
      pontos1: 1,
      pontos2: 1,
      pontos3: 1,
      pontos4: 1,
    },
  ];
  public results: Data[] = [...this.data];
  public names: string[] = [];

  constructor() { }

  ngOnInit() {
    this.data.forEach((person) => { this.names.push(person.nome) })
    console.log(this.names)
  }

  

  filterByName(obj: Object, names: string[], query: string) {
    return names.filter((d) => d.toLowerCase().indexOf(query) > -1)

  }

  handleInput(event: any) {
    const found: Data[] = []
    // console.log(this.data)
    const query = event.target.value.toLowerCase()
    // console.log(query)  	
    if (query == ''){
      this.results = [...this.data];
    }else {
      let searchedNames = this.filterByName(this.data, this.names, query)
      console.log(searchedNames)
      for (let name of searchedNames){
        found.push(this.data.find((val) => val.nome == name)!)
        console.log(found)
      }
    this.results = found!
    }
  }

  goTo(slide: Number){
    
  }
}
