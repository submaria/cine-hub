import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { HttpService } from 'src/app/Services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormSearchInterface } from 'src/app/Pages/search/Interface/search.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public searchForm: FormGroup;
  resultApi: any[];
  filterResultApi: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];
  loading = true;
  currentPage: number = 1;
  excludedMovieId: number = 617932;

  constructor(
    private menuCtrl: MenuController,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.searchForm = fb.group(new FormSearchInterface());
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      const page = +queryParams['page'] || 1;
      this.currentPage = page;
      this.searchQuery = queryParams['q'] || '';
      if (this.searchQuery) {
        this.loadSearchResults(page);
      }
    });
  };

  //FUNCTIONS
  async loadSearchResults(page: number) {
    if (page < 1) {
      return;
    }

    this.loading = true;

    try {
      const searchResults = await this.http.getMovieSearch(this.searchQuery, page);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: page },
        queryParamsHandling: 'merge',
      });
      this.searchResults = searchResults.results.filter((item: any) => item.id !== this.excludedMovieId);
      this.currentPage = page;
    } catch (error) {
      console.error('Erro ao carregar os resultados da pesquisa:', error);
    } finally {
      this.loading = false;
    }
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

  //CONTROLS
  async ionViewWillEnter() {
    this.menuCtrl.enable(true);
  };

}
