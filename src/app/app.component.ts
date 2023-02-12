import { Component, OnInit } from '@angular/core';
import { Item } from './interfaces/item.interface';
import { ItemListService } from './services/item-list.service';

let nextId = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'angular-custom-state-managment';

    constructor(private itemListService: ItemListService) {}

    addNewMockItem() {
        const id = ++nextId;

        const newItem: Item = {
            id,
            name: 'Mock Item (' + id + ')',
            price: Math.floor(Math.random() * 1000),
        };

        this.itemListService.addNewItem(newItem);
    }

    changeRandomItem() {
        const count = this.items.value.length;
        const index = Math.floor(Math.random() * count);
        const item = this.items.value[index];

        this.itemListService.changeItem(item.id, {
            price: Math.floor(Math.random() * 1000),
        });
    }

    get items() {
        return this.itemListService.getItems();
    }

    ngOnInit() {
        this.itemListService.addNewItem({
            id: ++nextId,
            name: 'One',
            price: 10,
        });
        this.itemListService.addNewItem({
            id: ++nextId,
            name: 'Two',
            price: 20,
        });
        this.itemListService.addNewItem({
            id: ++nextId,
            name: 'Three',
            price: 30,
        });
        this.itemListService.addNewItem({
            id: ++nextId,
            name: 'Four',
            price: 40,
        });

        this.itemListService.items.subscribe((items) => {
            console.log(items);
        });
    }
}
