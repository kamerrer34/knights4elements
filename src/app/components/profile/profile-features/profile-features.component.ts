import { Component, OnInit } from '@angular/core';

import { LoaderService } from "../../../services/loader/loader.service";
import { UserService } from '../../../services/user/user.service';
import { GainService } from '../../../services/gain/gain.service';

@Component({
    selector: 'profile-features',
    templateUrl: './profile-features.component.html',
    styleUrls: ['./profile-features.component.scss']
})
export class ProfileFeaturesComponent implements OnInit {
    userInfo: any;
    userSkills: any;
    userGains: any;
    gains: any;
    strength: number;
    dexterity: number;
    intelligence: number;
    endurance: number;
    strengthNext: number;
    dexterityNext: number;
    intelligenceNext: number;
    enduranceNext: number;
    health: number = 0;
    meleeHit: number = 0;
    waterHit: number = 0;
    fireHit: number = 0;
    airHit: number = 0;
    earthHit: number = 0;

    constructor(
        private loaderService: LoaderService,
        private userService: UserService,
        private gainService: GainService
    ) {}

    ngOnInit() {
        this.userService.getUserInfo().subscribe(info => {
            this.userInfo = info;
        });

        this.userService.getUserSkills().subscribe(skills => {
            this.userSkills = skills;
            this.strength = this.userSkills.strength;
            this.dexterity = this.userSkills.dexterity;
            this.intelligence = this.userSkills.intelligence;
            this.endurance = this.userSkills.endurance;

            function impNext(skill) {
                let impNext;
                if (skill === 1) {
                    impNext = 1;
                }
                if (skill === 2) {
                    impNext = 3;
                }
                if (skill === 3) {
                    impNext = 5;
                }
                if (skill >= 4) {
                    impNext = 10;
                }
                if (skill >= 10) {
                    impNext = 25;
                }
                if (skill >= 20) {
                    impNext = 50;
                }
                if (skill >= 30) {
                    impNext = 100;
                }
                return impNext;
            }

            this.strengthNext = impNext(this.strength);
            this.dexterityNext = impNext(this.dexterity);
            this.intelligenceNext = impNext(this.intelligence);
            this.enduranceNext = impNext(this.endurance);

            this.userService.getUserGains().subscribe(userGains => {
                this.userGains = userGains;

                this.gainService.getGains().subscribe(gains => {
                    this.gains = gains;
                    let healthBonus = 1;
                    let meleeBonus = 1;
                    let waterBonus = 1;
                    let fireBonus = 1;
                    let airBonus = 1;
                    let earthBonus = 1;

                    for (let i = 0; i < this.gains.length; i++) {
                        if (this.userGains[i] && this.userGains[i].active) {
                            let skill = this.gains[i].skill;
                            let increase = this.gains[i].increase;
                            switch (skill) {
                                case 'health':
                                    this.userSkills.health += increase;
                                    break;
                                case 'healthBonus':
                                    healthBonus += increase;
                                    break;
                                case 'meleeHit':
                                    this.userSkills.meleeHit += increase;
                                    break;
                                case 'meleeCrit':
                                    this.userSkills.meleeCrit += increase;
                                    break;
                                case 'meleeBonus':
                                    meleeBonus += increase;
                                    break;
                                case 'waterHit':
                                    this.userSkills.waterHit += increase;
                                    break;
                                case 'waterCrit':
                                    this.userSkills.waterCrit += increase;
                                    break;
                                case 'waterBonus':
                                    waterBonus += increase;
                                    break;
                                case 'fireHit':
                                    this.userSkills.fireHit += increase;
                                    break;
                                case 'fireCrit':
                                    this.userSkills.fireCrit += increase;
                                    break;
                                case 'fireBonus':
                                    fireBonus += increase;
                                    break;
                                case 'airHit':
                                    this.userSkills.airHit += increase;
                                    break;
                                case 'airCrit':
                                    this.userSkills.airCrit += increase;
                                    break;
                                case 'airBonus':
                                    airBonus += increase;
                                    break;
                                case 'earthHit':
                                    this.userSkills.earthHit += increase;
                                    break;
                                case 'earthCrit':
                                    this.userSkills.earthCrit += increase;
                                    break;
                                case 'earthBonus':
                                    earthBonus += increase;
                                    break;
                            }
                        }
                    }

                    this.health = Math.round(this.userSkills.health * healthBonus);
                    this.meleeHit = Math.round(this.userSkills.meleeHit * meleeBonus);
                    this.waterHit = Math.round(this.userSkills.waterHit * waterBonus);
                    this.fireHit = Math.round(this.userSkills.fireHit * fireBonus);
                    this.airHit = Math.round(this.userSkills.airHit * airBonus);
                    this.earthHit = Math.round(this.userSkills.earthHit * earthBonus);
                });
            });
        });
    }

    upSkill(skill, impNext) {
        let improvement = this.userSkills.improvement;
        if (improvement >= impNext) {
            this.loaderService.load({status: true});
            improvement -= impNext;
            switch (skill) {
                case 'strength':
                    const strength = this.strength + 1;
                    const health = this.userSkills.health + 100;
                    this.userService.updateUserSkills({
                        improvement: improvement,
                        strength: strength,
                        health: health
                    });
                    this.loaderService.load({status: false});
                    break;
                case 'dexterity':
                    const dexterity = this.dexterity + 1;
                    let meleeUp = 5;
                    if (dexterity >= 10) {
                        meleeUp = 10;
                    }
                    if (dexterity >= 20) {
                        meleeUp = 15;
                    }
                    if (dexterity >= 30) {
                        meleeUp = 20;
                    }
                    if (dexterity >= 40) {
                        meleeUp = 25;
                    }
                    const meleeHit = this.userSkills.meleeHit + meleeUp;
                    this.userService.updateUserSkills({
                        improvement: improvement,
                        dexterity: dexterity,
                        meleeHit: meleeHit
                    });
                    this.loaderService.load({status: false});
                    break;
                case 'intelligence':
                    const intelligence = this.intelligence + 1;
                    let elementUp = 5;
                    if (intelligence >= 10) {
                        elementUp = 10;
                    }
                    if (intelligence >= 20) {
                        elementUp = 15;
                    }
                    if (intelligence >= 30) {
                        elementUp = 20;
                    }
                    if (intelligence >= 40) {
                        elementUp = 25;
                    }
                    const waterHit = this.userSkills.waterHit + elementUp;
                    const fireHit = this.userSkills.fireHit + elementUp;
                    const airHit = this.userSkills.airHit + elementUp;
                    const earthHit = this.userSkills.earthHit + elementUp;
                    this.userService.updateUserSkills({
                        improvement: improvement,
                        intelligence: intelligence,
                        waterHit: waterHit,
                        fireHit: fireHit,
                        airHit: airHit,
                        earthHit: earthHit
                    });
                    this.loaderService.load({status: false});
                    break;
                case 'endurance':
                    const endurance = this.endurance + 1;
                    const energyMax = this.userSkills.energyMax + 10;
                    this.userService.updateUserSkills({
                        improvement: improvement,
                        endurance: endurance,
                        energyMax: energyMax
                    });
                    this.loaderService.load({status: false});
                    break;
            }
        }
    }

}
