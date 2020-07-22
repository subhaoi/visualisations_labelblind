import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { Ng5SliderModule } from 'ng5-slider';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  } from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ProviderService} from "./provider/provider.service";
import {eventService} from "./provider/eventService";
import { AppComponent } from './app.component';
import { LabelBlindScoreComponent } from './12_labelblind_score_table/labelblind_score.component'
import { NutrientScoreComponent } from './13_nutrient_score_table/nutrient_score.component'

const appRoutes: Routes = [
    { path: 'labelblind-score', component: LabelBlindScoreComponent },
    { path: 'nutrient-score', component: NutrientScoreComponent },
    { path: '',
        redirectTo: '/labelblind-score',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        LabelBlindScoreComponent,
        NutrientScoreComponent,
    ],
    imports: [
        BrowserModule,
        ChartsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Ng5SliderModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        NgbModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
        NgxDaterangepickerMd.forRoot(),
    ],
    providers: [ProviderService, eventService],
    bootstrap: [AppComponent]
})
export class AppModule { }
