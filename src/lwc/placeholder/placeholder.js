/**
 * Project Name : The South Face
 * File Name : placeholder
 * Description : 필수작성
 * Copyright : Copyright © JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-02 오후 4:54
 */
import {LightningElement, api} from 'lwc';

/** Static Resource**/
import LOGO from '@salesforce/resourceUrl/logo';

export default class Placeholder extends LightningElement {
    logoUrl =`${LOGO}`;
    @api message;
}