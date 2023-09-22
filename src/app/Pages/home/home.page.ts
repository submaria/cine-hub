import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController, IonContent } from '@ionic/angular';
import { FormHomeInterface } from 'src/app/Pages/home/Interface/home.interface';
import { HttpService } from 'src/app/Services/http.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public homeForm: FormGroup;
  resultApi: any[];
  filterResultApi: any[] = [];
  searchQuery: string = '';
  loading = true;
  currentPage: number = 1;
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private menuCtrl: MenuController,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.homeForm = fb.group(new FormHomeInterface());
  }

  async ngOnInit() {
    // setTimeout(async () => {
    //   await this.loadMoviesTopRated();
    // }, 2000);
    this.route.queryParams.subscribe((queryParams) => {
      const page = +queryParams['page'] || 1;
      if (queryParams instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Isso rolará para o topo da página
      }
      this.loadMovies(page);
    });
  };

  //FUNCTIONS
  async loadMoviesTopRated(page: number = 1) {
    await this.http.getMoviesTopRated(page).then((result: any) => {
      this.loading = false;
      this.resultApi = result.results;
      this.filterResultApi = result.results;
      this.currentPage = page;
    });
  };

  async loadMovies(page: number) {
    if (page < 1 || page > 500) {
      return;
    }

    this.loading = true;
    await this.loadMoviesTopRated(page);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  // async loadMovieDetails(id: number) {
  //   await this.http.getMovieDetails(id).then((result: any) => {
  //     this.loading = false;
  //     this.resultApi = result.results;
  //     this.filterResultApi = result.results;
  //   });
  // };

  navigateToMovieDetails(id: number) {
    console.log(id)
    this.router.navigate(['/movie-details/', id]);
  }

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

    search() {
      if (this.searchQuery.trim() !== '') {
        this.router.navigate(['/search'], {
          queryParams: { q: this.searchQuery, page: this.currentPage },
        });
        this.searchQuery = '';
      }
    };

    scrollToTop() {
      this.content.scrollToTop(500);
    }

  //CONTROLS
  async ionViewWillEnter() {
    this.menuCtrl.enable(true);
  };

}
