public class CaseRequestController {
    @AuraEnabled
    public static void ReopenCaseRequest(Id caseRId) {
        Case_Request__c caseR = [SELECT Id, Status__c FROM Case_Request__c WHERE Id =: caseRId LIMIT 1];

        if(caseR.Status__c == 'Closed'){
            caseR.Status__c = 'In Progress';
            update caseR;
        }
    }
}