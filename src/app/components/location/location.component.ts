import { Component, OnInit } from '@angular/core';

import { localData } from '../../shared/data';
import { LocationService } from '../../services/location/location.service';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
    locations: any = localData.locations;

    constructor(private locationService: LocationService) { }

    ngOnInit() {
        /*this.locationService.getLocation().subscribe(locations => {
            this.locations = locations;
        });*/
    }

}
