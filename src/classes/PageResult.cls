/****************************************************************************************
 * Project Name : The South Face
 * File Name : PageResult
 * Description : 필수작성 
 * Copyright : Copyright ©  JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-03 오후 3:57
******************************************************************************************/
public with sharing class PageResult {
    @AuraEnabled
    public Integer pageSize { get; set; }

    @AuraEnabled
    public Integer pageNumber { get; set; }

    @AuraEnabled
    public Integer totalItemCount { get; set; }

    @AuraEnabled
    public Object[] records { get; set; }

}