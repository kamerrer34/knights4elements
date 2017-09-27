import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class LocationService {
    locations: FirebaseListObservable<any[]>;

    constructor(private db: AngularFireDatabase) {
    }

    getLocation() {
        this.locations = this.db.list('/locations') as FirebaseListObservable<any[]>;
        return this.locations;
    }
}
