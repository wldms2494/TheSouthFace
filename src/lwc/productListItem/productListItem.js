/**
 * Project Name : The South Face
 * File Name : productListItem
 * Description : 필수작성
 * Copyright : Copyright © JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-02 오후 1:32
 */
import {LightningElement, api} from 'lwc';

export default class ProductListItem extends LightningElement {
    @api product;
    renderedCallback() {
        console.log('product:'+JSON.stringify(this.product));
    }
}