/**
 * Project Name : The South Face
 * File Name : productFilter2
 * Description : 필수작성
 * Copyright : Copyright © JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-05 오전 8:53
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

// The delay used when debouncing event handlers before firing the event
const DELAY = 350;
export default class ProductFilter2 extends LightningElement {
    filters ={
        searchKey:''
    };

    @wire(MessageContext)
    messageContext;

    handleSearchKeyChange(event){
        this.filters.searchKey = event.target.value;
        this.delayedFireFilterChangeEvent();
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


    delayedFireFilterChangeEvent(){
        // 디바운싱 구현:  글자가 타이핑 될때마다 호출되면 과부화가 올 수 있기 때문에 이벤트 발생시마다 @wire메소드를 호출하는것을 방지하기 위함
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(()=>{
            publish(this.messageContext, PRODUCTS_FILTERED_MESSAGE, {
                filters: this.filters
            });
        }, DELAY);
        // 사용자가 'B' 타이핑을 시작하면 350ms 후 메세지를 보내도록 타이머가 설정됨.
        // 사용자가 100ms 이후 다른 글자 'I' 를 타이핑 하면 'B'에 셋팅이 되었던 clearTimeout이 이전 타이머를 취소함.
        // 그리고 'I'를 기준으로 새로운 350ms 타이머를 설정함.
        // 이를 통해 마지막 타이핑 이후 350ms 가 지날때 까지 메세지 전송이 지연(Debounce)됨.

    }
}