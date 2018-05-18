import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GainService {
    gains: Observable<any[]>;
    gain: Observable<any>;

    constructor(private db: AngularFireDatabase) {
    }

    getGains() {
        this.gains = this.db.list('/gains').valueChanges();
        return this.gains;
    }

    getGain(id) {
        this.gain = this.db.object('/gains/' + id).valueChanges();
        return this.gain;
    }
}
