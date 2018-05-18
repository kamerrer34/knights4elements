import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { UserService } from '../user/user.service';

@Injectable()
export class DialogService {

    constructor(private userService: UserService, public dialog: MatDialog) {}

    makeEnergy(food, energy, energyMax) {
        if (food > 0) {
            const makeEnergyDialog = this.dialog.open(ModalDialogComponent, {
                data: {
                    title: 'Восстановить энергию?',
                    img: 'food',
                    txt: 'Еды в наличии: ' + food,
                    btn: 'Восстановить'
                }
            });

            makeEnergyDialog.afterClosed().subscribe(result => {
                if (result) {
                    if (energy === energyMax) {
                        this.dialog.open(ModalDialogComponent, {
                            data: {
                                title: 'Внимание!',
                                img: 'food',
                                txt: 'Энергия не требует восстановления',
                                btn: false
                            }
                        });
                    } else {
                        this.userService.updateUserCurrency({food: food - 1});
                        this.userService.updateUserSkills({energy: energyMax});
                    }
                }
            });
        } else {
            const noFoodDialog = this.dialog.open(ModalDialogComponent, {
                data: {
                    title: 'Неудача',
                    img: 'bone',
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

    buyFood() {
        console.log('buyFood');
    }

}
