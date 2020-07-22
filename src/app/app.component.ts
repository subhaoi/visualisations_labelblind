import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor() {}
    
    visualisations = [
        {
            title: 'Labelblind Score',
            route: '/labelblind-score'
        },
        {
            title: 'Nutrient Score',
            route: '/nutrient-score'
        },
    ];

}