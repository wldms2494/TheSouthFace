/**
 * Project Name : The South Face
 * File Name : productTile
 * Description : 필수작성
 * Copyright : Copyright © JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-04 오전 8:44
 */
import {LightningElement, api} from 'lwc';

export default class ProductTile extends LightningElement {

    _product;
    @api
    get product(){
        return this._product; // product 를 찾으면 _product를 반환할게
    }
    set product(value){ // value는 productTileList에서 전달한 product 객체 데이터
        this._product = value;
        this.pictureUrl = value.Picture_URL__c;
        this.name = value.Name;
        this.color = value.Color__c;
        this.gender = value.Gender__c;
    }

    /** Tile에서 Display Field*/
    pictureUrl;
    name;
    color;
    gender;

}