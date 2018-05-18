import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeaponService {
    weapons: Observable<any[]>;
    weapon: Observable<any>;

    constructor(private db: AngularFireDatabase) {
    }

    getWeapons() {
        this.weapons = this.db.list('/weapons').valueChanges();
        return this.weapons;
    }

    getWeapon(id) {
        this.weapon = this.db.object('/weapons/' + id).valueChanges();
        return this.weapon;
    }
}
