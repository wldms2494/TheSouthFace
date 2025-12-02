/**
 * Project Name : The South Face
 * File Name : productListItem
 * Description : 필수작성
 * Copyright : Copyright © JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-02 오후 1:32
 */
import {LightningElement, api} from 'lwc';
import { NavigationMixin} from "lightning/navigation";
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';

export default class ProductListItem extends NavigationMixin(LightningElement) {
    @api product;

    // LWC에서 선언적 방식으로 SFDC 페이지 이동 기능을 사용할 수 있도록 제공하는 표준 모듈 => NavigationMixin
    // 레코드페이지, 목록페이지, 웹페이지 등으로 이동할 수 있는 기능을 제공
    handleViewDetailsClick(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:{
                recordId: this.product.Id,
                objectApiName: PRODUCT_OBJECT.objectApiName,
                actionName: 'view'
            }

        });
    }

}