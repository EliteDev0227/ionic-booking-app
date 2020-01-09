import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * Generated class for the ThreePairToggleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'three-pair-toggle',
  templateUrl: 'three-pair-toggle.html'
})
export class ThreePairToggleComponent {
    
    @Input() enabled: boolean = true;
    @Input() checked: number;
    @Input() firstLabel: string;
    @Input() secondLabel: string;
    @Input() thirdLabel: string;
    @Input() forthLabel: string;
    @Output() clicked = new EventEmitter<number>();

    constructor( ) {
        this.checked = 1;
    }

    toggleClick (sel_num: number) {
        if(!this.enabled) return;

        this.checked = sel_num;

        this.clicked.emit(this.checked);
    }
}
