import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { localData } from '../../shared/data';

@Injectable()
export class UserService {
    userId = localData.user.id;
    data: Observable<any>;
    info: Observable<any>;
    skills: Observable<any>;
    currency: Observable<any>;
    weapons: Observable<any>;
    gains: Observable<any>;
    gain: Observable<any>;
    bossAnimals: Observable<any>;
    locations: Observable<any>;
    location: Observable<any>;


    constructor(private db: AngularFireDatabase) {
    }

    /*getUserPhoto(id) {
        this.http.get('https://api.vk.com/method/users.get?fields=photo_100&user_id=' + id).subscribe(data => {
            return data['response']['photo_100'];
        });
    }*/

    getUserData(id = this.userId) {
        this.data = this.db.object('/users/' + id).valueChanges();
        return this.data;
    }

    getUserInfo(id = this.userId) {
        this.info = this.db.object('/users/' + id + '/info').valueChanges();
        return this.info;
    }

    getUserSkills(id = this.userId) {
        this.skills = this.db.object('/users/' + id + '/skills').valueChanges();
        return this.skills;
    }

    updateUserSkills(data, id = this.userId) {
        this.db.object('/users/' + id + '/skills').update(data);
    }

    getUserCurrency() {
        this.currency = this.db.object('/users/' + this.userId + '/currency').valueChanges();
        return this.currency;
    }

    updateUserCurrency(data) {
        this.db.object('/users/' + this.userId + '/currency').update(data);
    }

    getUserWeapons() {
        this.weapons = this.db.object('/users/' + this.userId + '/weapons').valueChanges();
        return this.weapons;
    }

    updateUserWeapons(data) {
        this.db.object('/users/' + this.userId + '/weapons').update(data);
    }

    getUserGains() {
        this.gains = this.db.object('/users/' + this.userId + '/gains/').valueChanges();
        return this.gains;
    }

    getUserGain(id) {
        this.gain = this.db.object('/users/' + this.userId + '/gains/' + id).valueChanges();
        return this.gain;
    }

    updateUserGains(data) {
        this.db.object('/users/' + this.userId + '/gains/').update(data);
    }

    updateUserGain(data, id) {
        this.db.object('/users/' + this.userId + '/gains/' + id).update(data);
    }

    getUserBossAnimals(id) {
        this.bossAnimals = this.db.object('/users/' + this.userId + '/bosses/animals/' + id).valueChanges();
        return this.bossAnimals;
    }

    updateUserBossAnimals(data, id) {
        this.db.object('/users/' + this.userId + '/bosses/animals/' + id).update(data);
    }

    getUserLocation(id) {
        this.location = this.db.object('/users/' + this.userId + '/locations/' + id).valueChanges();
        return this.location;
    }

    updateUserLocation(data, id) {
        this.db.object('/users/' + this.userId + '/locations/' + id).update(data);
    }

    updateUserLocations(data) {
        this.db.object('/users/' + this.userId + '/locations').update(data);
    }

    updateUserLevel(xp) {
        this.getUserSkills().subscribe(skills => {
            const expCurr = xp;
            let level = skills['level'];
            let improvement = skills['improvement'];
            let iter = true;
            let expDiff;

            while (iter) {
                let expNext = 0;
                for (let i = 0; i < level; i++) {
                    expNext = expNext + (Math.pow(1.5, i) * 400);
                }
                expDiff = expNext - expCurr;
                if (expDiff <= 0) {
                    level += 1;
                    improvement += 1;
                } else {
                    iter = false;
                }
            }
            this.updateUserSkills({level: level, improvement: improvement});
        });
    }

}
