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

// Lightning Message Service and Message Channel
import PRODUCTS_FILTERED_MESSAGE from '@salesforce/messageChannel/ProductsFiltered__c';
import {publish, MessageContext} from "lightning/messageService";

export default class ProductFilter extends LightningElement {

    filters ={
        searchKey:''
    };

    @wire(MessageContext)
    messageContext;

    handleSearchKeyChange(event){
        this.filters.searchKey = event.target.value;
    }


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

//     handle (event handling)
    handleCheckboxChange(event){
        if(!this.filters.categories){ // Filters를 처음 클릭했을때만 적용
            this.filters.categories = this.categories.data.values.map(
                (item) => item.value // getPicklistValues 통해 가져온 data의 values를 각각 item에 담고 item.value를 리스트화
            );
            this.filters.genders = this.genders.data.values.map(
                (item) => item.value
            );
            this.filters.colors = this.colors.data.values.map(
                (item) => item.value
            );

        }

        const value = event.target.dataset.value;  // 사용자가 클릭한 실제 값 (data-value={category.value}), 하이픈(-)으로 구분된 HTML 속성은 JS에서 카멜케이스로 자동 변환
        const filterArray = this.filters[event.target.dataset.filter]// data-filter="categories" 가져옴 -> this.filters.categories를 불러옴
        console.log('event.target.checked : ' + event.target.checked);
        if(event.target.checked){
            // 다시 체크 되었을때
            if(!filterArray.includes(value)){
                filterArray.push(value);
            }
        } else {
            // 언체크 했을때
            this.filters[event.target.dataset.filter] = filterArray.filter(
                (item) => item!== value
            );
        }
        console.log('this.filters :' +JSON.stringify(this.filters));

        publish(this.messageContext, PRODUCTS_FILTERED_MESSAGE, {
           filters: this.filters
        });
    }
}