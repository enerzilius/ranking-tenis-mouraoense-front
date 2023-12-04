import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import Swiper from 'swiper';
import { HttpClient } from '@angular/common/http';
import { Tenista } from '../tenistas-service/tenistas.service';
import { TenistaComponent } from '../tenista-component/tenista-component.component';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, TenistaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-ranking-adm',
  templateUrl: './ranking-adm.component.html',
  styleUrls: ['./ranking-adm.component.scss'],
})
export class RankingAdmComponent implements OnInit {
  public classe: string = '1M';

  public etapa: string = '1';

  public tenistas: any[] = [];
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

  constructor(private http: HttpClient, public modalController: ModalController) {}

  async ngOnInit() {
    this.getGeral(this.classe);
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
      this.results = [...this.tenistas];
    } else {
      let searchedNames = this.filterByName(this.names, query);
      for (let name of searchedNames) {
        found.push(this.tenistas.find((val: any) => val.nomeTenista == name)!);
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
    this.swiper.activeIndex == 1
      ? this.setEtapa(this.swiper.activeIndex)
      : this.setEtapa(this.swiper.activeIndex - 1);
    this.getTenistas(this.classe, this.etapa);
  }

  getTenistas(classe: string, etapa: string) {
    try {
      this.http
        .post('http://127.0.0.1:3000/tenistas', { class: classe, etapa: etapa })
        .subscribe((res: any) => {
          this.tenistas = res;
          this.results = [...this.tenistas];
          this.names = this.tenistas.map((person: any) => person.nomeTenista);
        });
    } catch (error) {
      console.error(error);
    }
  }
  getGeral(classe: string) {
    try {
      console.log(classe);
      // this.params.append("classe", classe);
      // console.log(this.params)
      this.http
        .post(`http://127.0.0.1:3000/tenistasGeral`, { class: classe })
        .subscribe((res: any) => {
          this.tenistas = res;
          this.results = [...this.tenistas];
          this.names = this.tenistas.map((person: any) => person.nomeTenista);
        });
    } catch (error) {
      console.error(error);
    }
  }

  async openTenistaModal(idTenista: number) {
    console.log('aberto')
    const modal = await this.modalController.create({
      component: TenistaComponent,
      cssClass: 'my-modal-class',
    });
    modal.present();
  }

  setEtapa(num: number) {
    this.etapa = num.toString();
  }

  setClasse(classe: string) {
    this.classe = classe;
    console.log(this.classe);
    this.getGeral(this.classe);
  }
}
