import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    userInfo: any;
    userSkills: any;
    userCurrency: any;
    expDiff: number;
    expBar: number;

    constructor(
        private userService: UserService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.userService.getUserInfo().subscribe(info => {
            this.userInfo = info;
        });

        this.userService.getUserSkills().subscribe(skills => {
            this.userSkills = skills;
            let expNext = 0;
            let expPrev = 0;

            for (let i = 0; i < this.userSkills.level; i++) {
                expPrev = expNext;
                expNext = expNext + (Math.pow(1.5, i) * 400);
            }

            this.expDiff = expNext - this.userSkills.experience;
            this.expBar = (this.userSkills.experience - expPrev) / ((expNext - expPrev) / 100);

        });

        this.userService.getUserCurrency().subscribe(currency => {
            this.userCurrency = currency;
        });
    }

    makeEnergy() {
        this.dialogService.makeEnergy(this.userCurrency.food, this.userSkills.energy, this.userSkills.energyMax);
    }

}
