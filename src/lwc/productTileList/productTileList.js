/**
 * Project Name : The South Face
 * File Name : productTileList
 * Description : 필수작성
 * Copyright : Copyright © JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-03 오후 3:51
 */
import {LightningElement, api, wire} from 'lwc';

import getProducts from '@salesforce/apex/ProductController.getProducts';

// Lightning Message Service and Message Channels
import {publish, subscribe, MessageContext} from "lightning/messageService";
import PRODUCTS_FILTERED_MESSAGE from '@salesforce/messageChannel/ProductsFiltered__c';


export default class ProductTileList extends LightningElement {

    @wire(MessageContext) messageContext;

    pageNumber = 1;
    filters = {};
    @wire(getProducts, { filters: '$filters', pageNumber: '$pageNumber'}) // '$filters', '$pageNumber' ->파라미터 전달할때 filters의 값이나 pageNumber의 값이 변경될때마다 호출 되기 위함
    products;

    connectedCallback() {
        subscribe(this.messageContext, PRODUCTS_FILTERED_MESSAGE,(message) => this.handleFilterChange(message) );
    }

    handleSearchKeyChange(event){
        this.filters = {
            searchKey: event.target.value.toLowerCase()
        };
        this.pageNumber = 1;
    }

    handleFilterChange(message){
        //this.filters = message.filters;
        // --->  this.filters 와 message.filters는 같은 객체를 참조하게 됨
        // ---> @wire getProducts에서 '$filters'는 this.filters의 값이 바뀔때마다 호출이 되야하는데
        // ---> 새로운 객체를 할당하지 않고 내부값만 변경하려해서 LWC에서 변경으로 인식 못하고 @wire가 실행 되지 않을 수 있음
        console.log('handleFilterChange');
        this.filters = {...message.filters}; // so message.filters의 내용을 복사해 완전히 새로운 객체를 만들어주는 ... syntax 활용
        console.log('this.filters : ' +JSON.stringify(this.filters));
        this.pageNumber = 1;

    }


}