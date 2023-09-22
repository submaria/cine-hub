import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { HttpService } from 'src/app/Services/http.service';
import { FormGenreInterface } from 'src/app/Pages/genres/Interface/genres.interface';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.page.html',
  styleUrls: ['./genres.page.scss'],
})
export class GenresPage implements OnInit {
  public homeForm: FormGroup;
  resultApi: any[];
  filterResultApi: any[] = [];
  searchQuery: string = '';
  loading = true;

  constructor(
    private menuCtrl: MenuController,
    private http: HttpService,
    fb: FormBuilder
  ) {
    this.homeForm = fb.group(new FormGenreInterface());
  }

  async ngOnInit() {
    await this.loadMovieList();
  };

  async loadMovieList() {
    await this.http.getMovieList().then((result: any) => {
      this.loading = false;
      this.resultApi = result.genres;
      this.filterResultApi = result.genres;
    });
  };

  filterList(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.loading = true;
    if(event.detail.value !== ''){
        this.filterResultApi = this.resultApi.filter(item => {
          return item.title.toLowerCase().indexOf(searchTerm) > -1;
        });
        this.loading = false;
      } else {
        this.loading = false;
        this.filterResultApi = this.resultApi;
      }
    };

    async openModalDetalhes(id: number){
      // const modal = await this.modalCtrl.create({
      //   // component: ModalProdutosComponent,
      //   // cssClass: '',
      //   componentProps: {
      //     id
      //   },
      //   backdropDismiss: false,
      // });

      // modal.onDidDismiss().then((data: any) => {
      // });

      // modal.present();
    };

  //CONTROLS
  async ionViewWillEnter() {
    this.menuCtrl.enable(true);
  };

}
