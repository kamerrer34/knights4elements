import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { localData } from '../../../shared/data';

import { LoaderService } from '../../../services/loader/loader.service';
import { LocationService } from '../../../services/location/location.service';
import { UserService } from '../../../services/user/user.service';
import { WeaponService } from '../../../services/weapon/weapon.service';
import { GainService } from '../../../services/gain/gain.service';
import { BossesService } from '../../../services/bosses/bosses.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ModalDialogComponent } from '../../modal-dialog/modal-dialog.component';

@Component({
    selector: 'location-card',
    templateUrl: './location-card.component.html',
    styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit {
    @Input() locationId: number;
    userId = localData.user.id;
    dataLocation: any;
    userCurrency: any;
    userWeapons: any;
    userSkills: any;
    userLocation: any;
    locationLevel: number;
    locationStage: number;
    locationEvent: boolean;
    weaponsInfo: any;
    keyInfo: any;
    bossName: any;

    constructor(
        private loaderService: LoaderService,
        private locationService: LocationService,
        private weaponService: WeaponService,
        private gainService: GainService,
        private userService: UserService,
        private bossesService: BossesService,
        private dialogService: DialogService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.locationService.getLocation(this.locationId).subscribe(location => {
            this.dataLocation = location;
        });

        this.weaponService.getWeapons().subscribe(weapons => {
            this.weaponsInfo = weapons;
        });

        this.userService.getUserLocation(this.locationId).subscribe(location => {
            this.userLocation = location;
            this.locationLevel = this.userLocation.status.level;
            this.locationStage = this.userLocation.status.stage;
            this.locationEvent = this.userLocation.status.event;
        });

        this.userService.getUserCurrency().subscribe(currency => {
            this.userCurrency = currency;
        });

        this.userService.getUserWeapons().subscribe(weapons => {
            this.userWeapons = weapons;
        });

        this.userService.getUserSkills().subscribe(skills => {
            this.userSkills = skills;
        });

        this.userService.getUserBossAnimals(this.locationId).subscribe(boss => {
            if (!boss) {
                this.userService.updateUserBossAnimals({keys: 0}, this.locationId);
            } else {
                this.keyInfo = boss.keys;
            }
        });

        this.bossesService.getBossAnimals(this.locationId).subscribe(boss => {
            this.bossName = boss.name;
        });
    }

    noEnergy() {
        const noEnergy = this.dialog.open(ModalDialogComponent, {
            data: {
                title: 'Внимание!',
                img: 'energy',
                txt: 'Недостаточно энергии',
                btn: 'Восстановить'
            }
        });

        noEnergy.afterClosed().subscribe(result => {
            if (result) {
                this.dialogService.makeEnergy(this.userCurrency.food, this.userSkills.energy, this.userSkills.energyMax);
            }
        });
    }

    perform() {
        const energy = this.dataLocation.quests[this.locationLevel - 1].energy;
        let userEnergy = this.userSkills.energy;
        let final = false;

        if (this.locationEvent) {
            const doEvent = this.dialog.open(ModalDialogComponent, {
                data: {
                    title: 'Встреча!',
                    img: this.dataLocation.event.icon,
                    txt: 'Вы встретили ' + this.dataLocation.event.name,
                    btn: 'Отбиться: -' + this.dataLocation.event.energy,
                    btnIcon: 'energy'
                }
            });

            doEvent.afterClosed().subscribe(result => {
                if (result) {
                    if (userEnergy >= this.dataLocation.event.energy) {
                        userEnergy -= this.dataLocation.event.energy;
                        this.userService.updateUserSkills({energy: userEnergy});
                        const furs = this.userCurrency.furs + this.dataLocation.event.award;
                        this.userService.updateUserCurrency({furs: furs});
                        this.locationEvent = false;
                        const status = {
                            'event': this.locationEvent,
                            'level': this.locationLevel,
                            'stage': this.locationStage
                        };
                        this.userService.updateUserLocation({status: status}, this.locationId);
                        this.dialog.open(ModalDialogComponent, {
                            data: {
                                title: 'Победа!',
                                img: 'furs',
                                txt: 'Пушнина: +' + this.dataLocation.event.award,
                            }
                        });
                    } else {
                        this.noEnergy();
                    }
                }
            });
        } else {
            this.loaderService.load(true);
            if (userEnergy >= energy) {
                userEnergy -= energy;
                this.locationStage += 1;

                if (this.locationStage === 5) {
                    this.locationStage = 0;
                    if (this.locationLevel < 5) {
                        this.locationLevel += 1;
                    } else {
                        final = true;
                        this.locationLevel = 1;
                        this.userLocation.passed += 1;

                        this.userLocation.courage += energy * 30;
                        this.userSkills.experience += energy * 60;
                        this.userCurrency.silver += energy * 60;

                        let update = true;
                        this.userService.getUserGain(this.dataLocation.gain).subscribe(gain => {
                            if (update) {
                                let gainProgress = gain.progress;
                                let gainActive = gain.active;

                                this.gainService.getGain(this.dataLocation.gain).subscribe(gain => {
                                    const gainInfo = gain;
                                    const gainNumber = gainInfo.number;

                                    if (!gainActive) {
                                        gainProgress += 1;
                                        if (gainProgress === gainNumber) {
                                            gainActive = true;
                                        }
                                        this.userService.updateUserGain({active: gainActive, progress: gainProgress}, this.dataLocation.gain);
                                        update = false;
                                    }
                                    const gainName = gainInfo.name + ' (' + gainInfo.text + ')';
                                    const keyNumber = this.keyInfo + 1;
                                    this.userService.updateUserBossAnimals({keys: keyNumber}, this.locationId);

                                    const bossName = this.bossName;
                                    this.dialog.open(ModalDialogComponent, {
                                        data: {
                                            title: 'Локация пройдена!',
                                            txt: 'Ваша награда:',
                                            prize: [
                                                {
                                                    icon: 'shield',
                                                    number: energy * 30
                                                },
                                                {
                                                    icon: 'knuckle',
                                                    number: energy * 60
                                                },
                                                {
                                                    icon: 'silver',
                                                    number: energy * 60
                                                },
                                                {
                                                    icon: 'puzzle',
                                                    number: gainProgress + '/' + gainNumber,
                                                    tooltip: gainName
                                                },
                                                {
                                                    icon: 'map',
                                                    number: '1',
                                                    tooltip: 'Карта логова зверя ' + bossName
                                                }
                                            ]
                                        }
                                    });
                                });
                            }
                        });
                    }
                }

                if (!final) {
                    const numberCat = 3; // кол-во категорий
                    const randCat = Math.floor(Math.random() * numberCat);
                    const random = Math.round(Math.random() * 1000);
                    const energyMax = this.userSkills.energyMax;
                    const chanceFood = (1000 / (energyMax * 2 / energy)) * numberCat;
                    const chanceWeapons = (1000 / (50 / energy)) * numberCat;
                    const chanceEvent = (1000 / 25) * numberCat;

                    // категория 1 (еда)
                    if (random <= chanceFood && randCat === 0) {
                        const food = this.userCurrency.food + 1;
                        this.userService.updateUserCurrency({food: food});
                        this.dialog.open(ModalDialogComponent, {
                            data: {
                                title: 'Находка!',
                                img: 'food',
                                txt: 'Найдена сумка с провизией'
                            }
                        });
                    }

                    // категория 2 (оружие)
                    if (random <= chanceWeapons && randCat === 1) {
                        const randWeapon = Math.floor(Math.random() * 4);
                        const weaponNumber = this.userWeapons[randWeapon] + 1;
                        const weapon = {};
                        weapon[randWeapon] = weaponNumber;
                        this.userService.updateUserWeapons(weapon);

                        const weaponIcon = this.weaponsInfo[randWeapon].icon;
                        const weaponName = this.weaponsInfo[randWeapon].name;
                        this.dialog.open(ModalDialogComponent, {
                            data: {
                                title: 'Находка!',
                                img: weaponIcon,
                                txt: 'Найден ' + weaponName
                            }
                        });
                    }

                    // категория 3 (встреча)
                    if (random <= chanceEvent && randCat === 2) {
                        this.locationEvent = true;
                    }
                }

                const silver = this.userCurrency.silver + (energy * 2);
                const experience = this.userSkills.experience + (energy * 2);
                const courage = this.userLocation.courage + energy;
                const passed = this.userLocation.passed;
                const status = {
                    'event': this.locationEvent,
                    'level': this.locationLevel,
                    'stage': this.locationStage
                };

                if (courage > this.dataLocation.courage) {
                    this.locationService.updateLocation({courage: courage, top: this.userId}, this.locationId);
                    this.userService.getUserGain(this.dataLocation.gainTop).subscribe(gain => {
                        if (!gain.active) {
                            this.userService.updateUserGain({active: true}, this.dataLocation.gainTop);
                        }
                    });
                }

                this.userService.updateUserLevel(experience);
                this.userService.updateUserCurrency({silver: silver});
                this.userService.updateUserSkills({experience: experience, energy: userEnergy});
                this.userService.updateUserLocation({courage: courage, passed: passed, status: status}, this.locationId);
                this.loaderService.load(false);
            } else {
                this.loaderService.load(false);
                this.noEnergy();
            }
        }
    }

}
