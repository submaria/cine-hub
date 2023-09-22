import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieDetailsPageRoutingModule } from './movie-details-routing.module';
import { MovieDetailsPage } from './movie-details.page';
import { ScrollbarThemeModule } from './../../Directives/ScrollbarTheme.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    MovieDetailsPageRoutingModule,
    ScrollbarThemeModule,
  ],
  providers:[
    DatePipe,
  ],
  declarations: [MovieDetailsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class MovieDetailsPageModule {}
