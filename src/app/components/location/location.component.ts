import { Component, OnInit, Input } from '@angular/core';

import { localData } from '../../shared/data';

import { NavService } from '../../services/nav/nav.service';
import { LocationService } from '../../services/location/location.service';

@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
    @Input() userData: any;
    @Input() gains: any;

    locations: any;
    locationId: number;
    location: any = localData.pages[2];

    constructor(
        private locationService: LocationService,
        private navService: NavService
    ) {}

    ngOnInit() {
        this.locationService.getLocations().subscribe(locations => {
            this.locations = locations;
        });
    }

    openCard(id) {
        this.locationId = id;
        this.navService.showSub(2);
    }

}
