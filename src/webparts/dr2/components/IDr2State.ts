import { IListItem } from "../models/IListItem";

export interface IDr2State {
    status: string;
    ListItem: IListItem;
    ListItems: IListItem[];
}