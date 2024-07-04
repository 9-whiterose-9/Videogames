import { Item } from "./item";


export interface User {
    _id:              String;
    username:         String;
    password:         String;
    items:            Item[];
    following:        User[];
    followers:        User[];
    user_lists:       {
        list_name: string;
        list_items: Item[];
    }[];
    profile_picture: String;     
}