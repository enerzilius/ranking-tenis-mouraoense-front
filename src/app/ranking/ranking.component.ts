import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import Swiper from 'swiper';
import { tenista } from '../interfaces/tenista';
import { tenistas } from '../data/tenistas';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  
  // @Input() items: any;

  public tenista: tenista[] = tenistas

  
  
  @ViewChild('swiperContainer', { static: true }) swiper: Swiper;
  public results: tenista[] = [...this.tenista];
  public names: string[] = this.tenista.map((person) => person.nome);
  public swiperConfig = {
    slidesPerView: 1,
    allowTouchMove: false,
    autoHeight: false,
    allowSlideNext: true,
    allowSlidePrev: true
  };
  currentIndex: number = 0;
  
  
  constructor() {
  }
  
  ngOnInit() {}

  initSlides(slides: HTMLElement) {
    try {
      this.swiper = new Swiper(
        slides,
        this.swiperConfig
      );
      this.swiper.init();
    } catch (e) {
      console.error(e);
    }
  }

  filterByName(names: string[], query: string) {
    return names.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  handleInput(event: any) {
    const found: tenista[] = [];
    // console.log(this.tenista)
    const query = event.target.value.toLowerCase();
    // console.log(query)
    if (query == '') {
      this.results = [...this.tenista];
    } else {
      let searchedNames = this.filterByName(this.names, query);
      for (let name of searchedNames) {
        found.push(this.tenista.find((val) => val.nome == name)!);
      }
      this.results = found!;  
    }
  }

  goTo(slide: number, e: Event) {
    this.swiper.slideTo(slide,100, false)
    // this.swiper.slideNext()
    this.slideChanged(e)
  }

  swiperUpdateAutoHeight(time = 500) {
    setTimeout(() => this.swiper.updateAutoHeight(), time);
  }

  slideChanged(e: Event){
    console.log(this.swiper.activeIndex)
  }


}
