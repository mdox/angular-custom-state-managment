import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../interfaces/item.interface';

@Injectable({
    providedIn: 'root',
})
export class ItemListService {
    public items = new BehaviorSubject<BehaviorSubject<Item>[]>([]);
    public itemsById = new Map<Item['id'], BehaviorSubject<Item>>();

    getItem(id: Item['id']) {
        const item = this.itemsById.get(id);
        if (!item) return null;
        return item;
    }

    getItems() {
        return this.items;
    }

    removeItem(id: Item['id']) {
        if (!this.itemsById.has(id)) throw new Error('Item not found');

        this.itemsById.delete(id);
        this.items.next(
            this.items.value.filter((item) => item.value.id !== id)
        );
    }

    addNewItem(item: Item) {
        if (this.itemsById.has(item.id)) throw new Error('Item already exists');

        const item$ = new BehaviorSubject<Item>(item);

        this.itemsById.set(item.id, item$);
        this.items.next([...this.items.value, item$]);
    }

    changeItem(id: Item['id'], props: Partial<Item>) {
        const item = this.itemsById.get(id);

        if (!item) throw new Error('Item not found');

        item.next({ ...item.value, ...props });
    }
}
