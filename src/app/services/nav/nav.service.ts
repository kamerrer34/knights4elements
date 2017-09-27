import { Injectable } from '@angular/core';

import { localData } from '../../shared/data';

@Injectable()
export class NavService {

    constructor() {
    }

    goTo(item) {
        for (let i = 0; i < localData.pages.main.length; i++) {
            localData.pages.main[i].active = localData.pages.main[i].name === item;
        }
    }

}
