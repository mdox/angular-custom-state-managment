import {
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Item } from 'src/app/interfaces/item.interface';
import { ItemListService } from 'src/app/services/item-list.service';

@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, OnDestroy {
    subs: Subscription[] = [];

    @Input()
    id!: Item['id'];

    item$!: BehaviorSubject<Item>;
    item!: Item;

    constructor(
        private itemListService: ItemListService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.item$ = this.itemListService.getItem(this.id)!;
        this.item = this.item$.getValue();

        this.subs.push(
            this.item$.subscribe((value) => {
                this.item = value;
                this.cdr.detectChanges();
            })
        );
    }

    ngOnDestroy() {
        this.subs.forEach((sub) => sub.unsubscribe());
    }
}
