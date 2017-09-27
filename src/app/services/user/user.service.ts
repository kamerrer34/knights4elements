import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { localData } from '../../shared/data';

@Injectable()
export class UserService {
    info: FirebaseObjectObservable<any[]>;
    skills: FirebaseObjectObservable<any[]>;
    currency: FirebaseObjectObservable<any[]>;
    userId = localData.user.id;

    constructor(private db: AngularFireDatabase) {
    }

    getUserInfo() {
        this.info = this.db.object('/users/' + this.userId + '/info') as FirebaseObjectObservable<any[]>;
        return this.info;
    }

    getUserSkills() {
        this.skills = this.db.object('/users/' + this.userId + '/skills') as FirebaseObjectObservable<any[]>;
        return this.skills;
    }

    getUserCurrency() {
        this.currency = this.db.object('/users/' + this.userId + '/currency') as FirebaseObjectObservable<any[]>;
        return this.currency;
    }

    updateUserSkills(data) {
        this.skills.update(data);
    }

    updateUserCurrency(data) {
        this.currency.update(data);
    }
}
