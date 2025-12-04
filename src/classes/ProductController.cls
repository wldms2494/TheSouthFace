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
    static Integer PAGE_SIZE = 9;

    public class Filters {
        @AuraEnabled
        public String searchKey { get;set; }
        @AuraEnabled
        public String[] categories { get;set; }
        @AuraEnabled
        public String[] genders { get;set; }
        @AuraEnabled
        public String[] colors { get;set; }
    }

    @AuraEnabled(Cacheable=true Scope='global')
    public static PageResult getProducts(Filters filters, Integer pageNumber){
        System.debug('filters: '+filters+' , pageNumber: ' + pageNumber);
        String key, whereClause = '';
        String[] categories, genders, colors, criteria = new List<String>{};
        if(filters !=null){
            // Search Key
            if(!String.isEmpty(filters.searchKey)){
                key='%' + filters.searchKey + '%';
                criteria.add('Name LIKE :key');
            }

            // Category
            if(filters.categories!=null){
                categories = filters.categories;
                System.debug('categories: '+categories);
                criteria.add('Product_Family__r.Category__c IN :categories');
            }

            // gender
            if(filters.genders!=null){
                genders = filters.genders;
                criteria.add('gender__c IN :genders');
            }

            // color
            if(filters.colors!=null){
                colors = filters.colors;
                criteria.add('color__c IN :colors');
            }

            if (criteria.size() > 0){
                whereClause  = 'WHERE ' + String.join(criteria, ' AND ');
            }

        }
        Integer pageSize = ProductController.PAGE_SIZE;
        Integer offset = (pageNumber - 1) * pageSize; // offset만큼 SOQL에서 레코드수를 건너뛰고 그 다음부터 가져옴
        PageResult result = new PageResult();
        result.pageSize = pageSize;
        result.pageNumber = pageNumber;

        System.debug('whereClause: '+whereClause);
        result.totalItemCount = Database.countQuery(
          'SELECT count() FROM Product__c ' + whereClause
        );
        result.records = Database.query(
                'SELECT Id, Name,Picture_URL__c, Product_Family__c, Product_Family__r.Category__c, Color__c, Gender__c  FROM Product__c ' +
                        whereClause +
                        ' WITH USER_MODE ' +
                        ' ORDER BY Name LIMIT :pageSize OFFSET :offset'
        );

        System.debug('result: '+result);
        return result;
    }

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