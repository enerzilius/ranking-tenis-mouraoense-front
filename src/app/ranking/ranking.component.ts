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
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  @Input() class: any;

  public etapa: string = '1';

  public tenista: any = [];
  public results: any[] = [];
  public names: string[] = [];

  @ViewChild('swiper-container', { static: false }) swiper: Swiper;
  public swiperConfig = {
    slidesPerView: 1,
    allowTouchMove: false,
    autoHeight: false,
    allowSlideNext: false,
    allowSlidePrev: false,
  };
  currentIndex: number = 0;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.getGeral(this.class);
  }

  initSlides(slides: HTMLElement) {
    try {
      this.swiper = new Swiper(slides, this.swiperConfig);
      this.swiper.init();
    } catch (e) {
      console.error(e);
    }
  }

  filterByName(names: string[], query: string) {
    return names.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  handleInput(event: any) {
    const found: any[] = [];
    const query = event.target.value.toLowerCase();
    if (query == '') {
      this.results = [...this.tenista];
    } else {
      let searchedNames = this.filterByName(this.names, query);
      for (let name of searchedNames) {
        found.push(this.tenista.find((val: any) => val.nomeTenista == name)!);
      }
      this.results = found!;
    }
  }

  goTo(slide: number, e: Event) {
    this.swiper.slideTo(slide, 100, false);
    this.slideChanged(e);
  }

  swiperUpdateAutoHeight(time = 500) {
    setTimeout(() => this.swiper.updateAutoHeight(), time);
  }

  slideChanged(e: Event) {
    console.log(this.swiper.activeIndex);
    (this.swiper.activeIndex == 1) ? this.setEtapa(this.swiper.activeIndex) : this.setEtapa(this.swiper.activeIndex-1);
    console.log(this.etapa)
    this.getTenistas(this.class, this.etapa);
  }

  getTenistas(classe: string, etapa: string) {
    try {
      console.log(classe, etapa);
      this.http
        .post('http://127.0.0.1:3000/tenistas', { class: classe, etapa: etapa })
        .subscribe((res: any) => {
          this.tenista = res;
          this.results = [...this.tenista];
          this.names = this.tenista.map((person: any) => person.nomeTenista);
        });
    } catch (error) {
      console.error(error);
    }
  }
  getGeral(classe: string) {
    try {
      console.log(classe);
      this.http
        .post('http://127.0.0.1:3000/tenistasGeral', { class: classe })
        .subscribe((res: any) => {
          this.tenista = res;
          this.results = [...this.tenista];
          this.names = this.tenista.map((person: any) => person.nomeTenista);
        });
    } catch (error) {
      console.error(error);
    }
  }

  setEtapa(num: number){
    this.etapa = num.toString();
  }
}
