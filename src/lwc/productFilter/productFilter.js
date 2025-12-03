/**
 * Project Name : The South Face
 * File Name : productFilter
 * Description : 필수작성
 * Copyright : Copyright © JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-03 오전 10:10
 */
import {LightningElement, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
// Product Schema

//import CATEGORY_FIELD from '@salesforce/schema/Product__c.Product_Family__r.Category__c';
import  CATEGORY_FIELD from '@salesforce/schema/Product_Family__c.Category__c';
import PRODUCTFAMILY_NAME_FIELD from '@salesforce/schema/Product__c.Product_Family__r.Name';
import COLOR_FIELD from '@salesforce/schema/Product__c.Color__c';
import GENDER_FIELD from '@salesforce/schema/Product__c.Gender__c';

export default class ProductFilter extends LightningElement {

    // Picklist Value 가져오기
    @wire(getPicklistValues,{
        recordTypeId:'012000000000000AAA', //default record type이 없다면 master recordType 값 넣어주기 '012000000000000AAA'
        fieldApiName: CATEGORY_FIELD
    })
    categories;

    @wire(getPicklistValues,{
        recordTypeId:'012000000000000AAA', //default record type이 없다면 master recordType 값 넣어주기 '012000000000000AAA'
        fieldApiName: GENDER_FIELD
    })
    genders;

    @wire(getPicklistValues,{
        recordTypeId:'012000000000000AAA', //default record type이 없다면 master recordType 값 넣어주기 '012000000000000AAA'
        fieldApiName: COLOR_FIELD
    })
    colors;



}