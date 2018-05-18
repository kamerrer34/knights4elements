import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'location-quest',
    templateUrl: './location-quest.component.html',
    styleUrls: ['./location-quest.component.scss']
})
export class LocationQuestComponent implements OnInit {
    @Input() level: number;
    @Input() stage: number;
    @Input() id: number;
    @Input() quest: any;

    constructor() {
    }

    ngOnInit() {
    }

}
