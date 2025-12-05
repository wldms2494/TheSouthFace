/**
 * Project Name : The South Face
 * File Name : paginator
 * Description : 필수작성
 * Copyright : Copyright © JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-05 오전 9:43
 */
import {LightningElement, api} from 'lwc';

export default class Paginator extends LightningElement {

    @api totalItemCount
    @api pageSize
    @api pageNumber

    handlePrevious(){
        this.dispatchEvent(new CustomEvent('previous')); // 상위 컴포넌트에서 onprevious로 받음
    }

    handleNext(){
        this.dispatchEvent(new CustomEvent('next')); // 상위 컴포넌트에서 onnext 받음
    }

    get totalPages(){
        return Math.ceil(this.totalItemCount / this.pageSize)
    }

    get currentPageNumber(){
        return this.totalItemCount ===0 ? 0: this.pageNumber;
    }

}