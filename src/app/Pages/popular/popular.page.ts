import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuController, IonContent } from '@ionic/angular';
import { HttpService } from 'src/app/Services/http.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
})
export class PopularPage implements OnInit {
  public homeForm: FormGroup;
  resultApi: any[];
  searchQuery: string = '';
  loading = true;
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private menuCtrl: MenuController,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute){}

  async ngOnInit() {
    this.loadPopularMovies();
  };

  //FUNCTIONS
  async loadPopularMovies() {
    await this.http.getPopularMovies().then((result: any) => {
      this.loading = false;
      this.resultApi = result.results;
    });
  };

  search() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery, page: 1},
      });
      this.searchQuery = '';
    }
  };

  //CONTROLS
  async ionViewWillEnter() {
    this.menuCtrl.enable(true);
  };
}
