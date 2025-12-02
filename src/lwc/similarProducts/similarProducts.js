/**
 * Project Name : The South Face
 * File Name : similarProducts
 * Description : 필수작성
 * Copyright : Copyright © JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-02 오전 10:12
 */
import {LightningElement, api,wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getSimilarProducts from '@salesforce/apex/ProductController.getSimilarProducts';
import PRODUCT_FAMILY_FIELD from '@salesforce/schema/Product__c.Product_Family__c';
import COLOR_FIELD from '@salesforce/schema/Product__c.Color__c';
const fields = [PRODUCT_FAMILY_FIELD, COLOR_FIELD];

export default class SimilarProducts extends LightningElement {
    @api recordId;
    // productData;

    // 1. 선언적 방식  - 간결. 하지만 형식을 바꿀 수는 없음
    @wire(getRecord, {recordId: '$recordId', fields})
    product;

    // 2. 데이터가 도착할때 특정 메소드를 실행하여 데이터를 처리 가능
    // @wire(getRecord, { recordId: '$recordId', fields })
    // wiredProduct({ error, data }) {
    //     console.log('wiredProduct');
    //     // 💡여기에 console.log 또는 원하는 로직 삽입 가능
    //     if (data) {
    //         this.productData = data;
    //     } else if (error) {
    //
    //     }
    // }

    @wire(getSimilarProducts, {
        productId: '$recordId',
        familyId: '$product.data.fields.Product_Family__c.value'
    })
    similarProducts;


}