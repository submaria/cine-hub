import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrollbarThemeModule } from './../../Directives/ScrollbarTheme.directive';
import { GenresPageRoutingModule } from './genres-routing.module';
import { GenresPage } from './genres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GenresPageRoutingModule,
    ScrollbarThemeModule
  ],
  declarations: [GenresPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class GenresPageModule {}
