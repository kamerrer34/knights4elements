import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BossesService {
    bossesAnimals: Observable<any[]>;
    bossAnimals: Observable<any>;

    constructor(private db: AngularFireDatabase) {
    }

    getBossesAnimals() {
        this.bossesAnimals = this.db.list('/bosses/animals/').valueChanges();
        return this.bossesAnimals;
    }

    getBossAnimals(id) {
        this.bossAnimals = this.db.object('/bosses/animals/' + id).valueChanges();
        return this.bossAnimals;
    }
}
