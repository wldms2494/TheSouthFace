/****************************************************************************************
 * Project Name : The South Face
 * File Name : ProductController
 * Description : 필수작성 
 * Copyright : Copyright ©  JieunSong. All Rights Reserved. 2025
 * Author : 82107
 * Created Date : 2025-12-02 오전 10:46
***********************************************************************************/


public with sharing class ProductController
{

    // 비슷한 상품 가져오기
    @AuraEnabled(Cacheable=true scope='global')
    public static Product__c[] getSimilarProducts(Id productId, Id familyId){
        List<Product__c> similarProdcuts = [
                SELECT Id, Name, Gender__c, Picture_URL__c, fm_imageURL__c, Color__c
                FROM Product__c
                WHERE Product_Family__c = :familyId AND Id != :productId];

        System.debug('similarProducts : ' + similarProdcuts);
        return similarProdcuts;
    }
}