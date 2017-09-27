import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {

    constructor(
        public dialogRef: MdDialogRef<ModalDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
    }

}
