import { Injectable } from '@angular/core';

import { localData } from '../../shared/data';

@Injectable()
export class NavService {

    constructor() {
    }

    goTo(item) {
        for (let i = 0; i < localData.pages.length; i++) {
            localData.pages[i].active = localData.pages[i].name === item;
            localData.pages[i].sub = false;
        }
    }

    showSub(page) {
        localData.pages[page].sub = true;
    }

}
