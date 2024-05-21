import { WebPartContext } from '@microsoft/sp-webpart-base';
import { getSP } from './pnpjsConfig';

const batchOptions = ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4'];
const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

export interface IPnpServices {
    createItem(listname: string, itemObj: any): Promise<any>;
    getItems(listname: string, coloumns: string[]): Promise<any>;
    updateItem(listname: string, itemId: number, itemObj: any): Promise<any>;
    deleteItem(listname: string, itemId: number): Promise<any>;
}

export class PnpServices implements IPnpServices {
    private _sp;

    constructor(context: WebPartContext) {
        this._sp = getSP(context);
    }

    public async createItem(listname: string, itemObj: any): Promise<any> {
        try {
            const newDataObject = {
                Title: itemObj.Title,
                Email: itemObj.Email,
                Batch: batchOptions[parseInt(itemObj.Batch) - 1],
                LevelofKnowledge: levelOptions[parseInt(itemObj.LevelofKnowledge) - 1]
            };
            const list = await this._sp.web.lists.getByTitle(listname);
            console.log('List item added');
            console.log(newDataObject);
            return await list.items.add(newDataObject);
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    }

    public async getItems(listname: string): Promise<any> {
        try {
            const listItems = await this._sp.web.lists.getByTitle(listname).items();
            console.log('List item fetched' + listItems);

            listItems.forEach(item => {
                console.log(item);
            });
            return listItems;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    }

    public async getItemByName(listname: string, itemName: string): Promise<any> {
        try {
            const list = this._sp.web.lists.getByTitle(listname);
            const items = await list.items.filter(`Title eq '${itemName}'`).top(1)();
            if (items.length > 0) {
                return items[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching item by name:', error);
            throw error;
        }
    }

    public async updateItem(listname: string, itemId: number, newDataObject: any): Promise<any> {
        try {
            const list = this._sp.web.lists.getByTitle(listname);
            newDataObject.Batch = batchOptions[parseInt(newDataObject.Batch) - 1];
            newDataObject.LevelofKnowledge = levelOptions[parseInt(newDataObject.LevelofKnowledge) - 1];
            await list.items.getById(itemId).update(newDataObject);
            console.log('List item updated');
            return itemId;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    }

    public async updateItemByName(listname: string, itemName: string, newDataObject: any): Promise<any> {
        try {
            const listItem = await this.getItemByName(listname, itemName);
            if (!listItem) {
                throw new Error(`Item with name '${itemName}' not found.`);
            }

            const itemId = listItem.Id;
            console.log("Item ID to be updated is " + itemId);
            const updatedItem = await this.updateItem(listname, itemId, newDataObject);

            return updatedItem;
        } catch (error) {
            console.error('Error updating item by name:', error);
            throw error;
        }
    }

    public async deleteItem(listname: string, itemId: number): Promise<any> {
        try {
            const list = this._sp.web.lists.getByTitle(listname);
            await list.items.getById(itemId).delete();
            console.log('List item deleted');
            return;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }

    public async deleteItemByName(listname: string, itemName: string): Promise<any> {
        try {
            const listItem = await this.getItemByName(listname, itemName);
            if (!listItem) {
                throw new Error(`Item with name '${itemName}' not found.`);
            }

            const itemId = listItem.Id;
            console.log("Item ID to be deleted is " + itemId);
            const deletedItem = await this.deleteItem(listname, itemId);

            return deletedItem;
        } catch (error) {
            console.error('Error deleting item by name:', error);
            throw error;
        }
    }
}