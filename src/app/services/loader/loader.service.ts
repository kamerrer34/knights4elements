import { Injectable } from '@angular/core';

import { localData } from '../../shared/data';

@Injectable()
export class LoaderService {

    constructor() {
    }

    load(status) {
        localData.loading.status = status;
    }

}
