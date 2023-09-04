import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent  implements OnInit {
  // @Input() items: any;

  public data = [
    {
      id: 1,
      nome: 'Walter',
      idade: 33,
      pontos: 750
    },
    {
      id: 2,
      nome: 'Marcos',
      idade: 57,
      pontos: 550
    },
    {
      id: 3,
      nome: 'Giulio',
      idade: 16,
      pontos: 450
    },
  ];
  public results = [...this.data];

  constructor() { }

  ngOnInit() {}

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d: any) => d.toLowerCase().indexOf(query) > -1);
  }

}
