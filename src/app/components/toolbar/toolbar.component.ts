import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { localData } from '../../shared/data';
import { svg } from '../../shared/svg';
import { UserService } from '../../services/user/user.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    svg = svg;
    info: any;
    login: string;
    currency: any;
    diamond: number;
    furs: number;
    gold: number;
    silver: number;
    food: number;
    skills: any;
    energy: number;
    energyMax: number;
    experience: number;
    level: number;
    expStart: number = localData.user.xp;
    expNext = 0;
    expDiff: number;
    expBar: number;

    constructor(private userService: UserService, public dialog: MdDialog) {
    }

    ngOnInit() {
        this.userService.getUserInfo().subscribe(info => {
            this.info = info;
            this.login = this.info.login;
        });

        this.userService.getUserSkills().subscribe(skills => {
            this.skills = skills;
            this.energy = this.skills.energy;
            this.energyMax = this.skills.energyMax;
            this.experience = this.skills.experience;
            this.level = this.skills.level;

            for (let i = 0; i < this.level; i++) {
                this.expNext = this.expNext + (Math.pow(1.5, i) * this.expStart);
            }

            this.expDiff = this.expNext - this.experience;
            this.expBar = ((Math.pow(1.5, this.level) * this.expStart) - this.experience) / 100;
        });

        this.userService.getUserCurrency().subscribe(currency => {
            this.currency = currency;
            this.diamond = this.currency.diamond;
            this.furs = this.currency.furs;
            this.gold = this.currency.gold;
            this.silver = this.currency.silver;
            this.food = this.currency.food;
        });
    }

    buyFood() {

    }

    makeEnergy() {
        if (this.food > 0) {
            const makeEnergyDialog = this.dialog.open(ModalDialogComponent, {
                data: {
                    title: 'Восстановить энергию?',
                    img: svg.food,
                    txt: 'Еды в наличии: ' + this.currency.food,
                    btn: 'Восстановить'
                }
            });

            makeEnergyDialog.afterClosed().subscribe(result => {
                if (result) {
                    if (this.energy === this.energyMax) {
                        this.dialog.open(ModalDialogComponent, {
                            data: {
                                title: 'Внимание!',
                                img: svg.food,
                                txt: 'Энергия не требует восстановления',
                                btn: false
                            }
                        });
                    } else {
                        this.userService.updateUserCurrency({food: this.food - 1});
                        this.userService.updateUserSkills({energy: this.energyMax});
                    }
                }
            });
        } else {
            const noFoodDialog = this.dialog.open(ModalDialogComponent, {
                data: {
                    title: 'Неудача',
                    img: svg.bone,
                    txt: 'Запасы провизии исчерпаны',
                    btn: 'Купить'
                }
            });

            noFoodDialog.afterClosed().subscribe(result => {
                if (result) {
                    this.buyFood();
                }
            });
        }
    }

}
