import { Component, OnInit } from '@angular/core';

import { localData } from '../../shared/data';

import { UserService } from '../../services/user/user.service';
import { GainService } from '../../services/gain/gain.service';

@Component({
    selector: 'page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
    loading: any = localData.loading;
    pageList: any = localData.pages;
    defaultData: any = localData.user;
    userData: any;
    gains: any;

    constructor(
        private userService: UserService,
        private gainService: GainService
    ) {}

    ngOnInit() {
        this.userService.getUserData().subscribe(data => {
            this.userData = data;
            const userSkills = this.userData.skills;
            const userCurrency = this.userData.currency;
            const userWeapons = this.userData.weapons;
            const userGains = this.userData.gains;

            if (userSkills) {
                const keys = Object.keys(this.defaultData.skills);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    if (!userSkills[key]) {
                        const data = {};
                        data[key] = this.defaultData.skills[key];
                        this.userService.updateUserSkills(data);
                    }
                }
            } else {
                this.userService.updateUserSkills(this.defaultData.skills);
            }

            if (userCurrency) {
                const keys = Object.keys(this.defaultData.currency);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    if (!userCurrency[key]) {
                        const data = {};
                        data[key] = this.defaultData.currency[key];
                        this.userService.updateUserCurrency(data);
                    }
                }
            } else {
                this.userService.updateUserCurrency(this.defaultData.currency);
            }

            if (userWeapons) {
                const keys = Object.keys(this.defaultData.weapons);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    if (!userWeapons[key]) {
                        const data = {};
                        data[key] = this.defaultData.weapons[key];
                        this.userService.updateUserWeapons(data);
                    }
                }
            } else {
                this.userService.updateUserWeapons(this.defaultData.weapons);
            }

            this.gainService.getGains().subscribe(gains => {
                this.gains = gains;
                if (userGains) {
                    for (let i = 0; i < this.gains.length; i++) {
                        if (!userGains[i]) {
                            const data = {active: false, progress: 0};
                            this.userService.updateUserGain(data, i);
                        }
                    }
                } else {
                    let data = {};
                    for (let i = 0; i < this.gains.length; i++) {
                        data[i] = {active: false, progress: 0};
                    }
                    this.userService.updateUserGains(data);
                }
            });

        });
    }

}
