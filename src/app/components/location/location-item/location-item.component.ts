import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { localData } from "../../../shared/data";

import { UserService } from '../../../services/user/user.service';
import { GainService } from '../../../services/gain/gain.service';

@Component({
    selector: 'location-item',
    templateUrl: './location-item.component.html',
    styleUrls: ['./location-item.component.scss']
})

export class LocationItemComponent implements OnInit {
    @Input() locationItem: any;
    @Output() open = new EventEmitter();

    locationCourage: any;
    leaderInfo: any;
    gainInfo: any;
    defaultData: any = localData.user.location;

    constructor(
        private userService: UserService,
        private gainService: GainService
    ) {}

    ngOnInit() {
        this.userService.getUserLocation(this.locationItem.id).subscribe(location => {
            this.locationCourage = location.courage;
            if (this.locationCourage === undefined) {
                const location = {};
                location[this.locationItem.id] = this.defaultData;
                this.userService.updateUserLocations(location);
            }
        });

        this.userService.getUserInfo(this.locationItem.top).subscribe(info => {
            this.leaderInfo = info;
        });

        this.gainService.getGain(this.locationItem.gainTop).subscribe(gain => {
            this.gainInfo = gain;
        });
    }

    openLocation() {
        this.open.emit(this.locationItem.id);
    }

}
