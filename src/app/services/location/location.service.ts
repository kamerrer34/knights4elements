import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationService {
    locations: Observable<any[]>;
    location: Observable<any>;

    constructor(private db: AngularFireDatabase) {
    }

    getLocations() {
        this.locations = this.db.list('/locations').valueChanges();
        return this.locations;
    }

    getLocation(id) {
        this.location = this.db.object('/locations/' + id).valueChanges();
        return this.location;
    }

    updateLocation(data, id) {
        this.db.object('/locations/' + id).update(data);
    }
}
