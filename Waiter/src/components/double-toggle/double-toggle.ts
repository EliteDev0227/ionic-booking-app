import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the DoubleToggleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'double-toggle',
  templateUrl: 'double-toggle.html'
})
export class DoubleToggleComponent {

    @Input() enabled: boolean = true;
    @Input() checked: number;
    @Input() firstLabel: string;
    @Input() secondLabel: string;
    @Input() thirdLabel: string;
    @Output() clicked = new EventEmitter<number>();

    constructor() {
        this.checked = 1;
        this.firstLabel = ``;
        this.secondLabel = ``;
        this.thirdLabel = ``;
    }

    toggleClick (sel_num: number) {
        if(!this.enabled) return;

        this.checked = sel_num;

        this.clicked.emit(this.checked);
    }
}

/**
 * Usage
 * <double-toggle firstLabel="Online" secondLabel="Offline" thirdLabel="All" [checked]="1" [enabled]="true" (clicked)="onClickToggle($event)"></double-toggle>
 */