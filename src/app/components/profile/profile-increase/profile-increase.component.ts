import { Component, OnInit } from '@angular/core';

import { UserService } from "../../../services/user/user.service";
import { GainService } from '../../../services/gain/gain.service';

@Component({
    selector: 'profile-increase',
    templateUrl: './profile-increase.component.html',
    styleUrls: ['./profile-increase.component.scss']
})
export class ProfileIncreaseComponent implements OnInit {
    gains: any;
    userGains: any;
    status: string = 'all';
    category: string = 'all';

    constructor(
        private userService: UserService,
        private gainService: GainService
    ) {}

    ngOnInit() {
        this.gainService.getGains().subscribe(gains => {
            this.gains = gains;

            this.userService.getUserGains().subscribe(userGains => {
                this.userGains = userGains;

                for (let i = 0; i < this.gains.length; i++) {
                    if (this.userGains[i]) {
                        this.gains[i]['active'] = this.userGains[i].active;
                        this.gains[i]['progress'] = this.userGains[i].progress;
                    }
                }
            });
        });
    }

}
