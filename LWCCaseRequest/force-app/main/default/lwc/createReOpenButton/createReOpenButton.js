import { LightningElement, api, wire } from 'lwc';
import ReopenCaseRequest from '@salesforce/apex/caseRequestController.ReopenCaseRequest';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateReOpenButton extends LightningElement {
    @api recordId; //Get the recordId from the Case_Request__c record when open the page

    
    //Method triggered when the "Reabrir Caso" button is clicked
    handleReopenCaseClickEvent() {
        //Call the Apex method and pass the record ID as parameter
        ReopenCaseRequest({caseRId: this.recordId})
            .then(result => {
                //Show success toast message
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'The case was reopened with succes! Refresh the page if you cant see the changes',
                        variant: 'success'
                    })
                );

                //Wait 4 seconds and refresh the page
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            })
            .catch(error => {
                //Show error toast message
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Erro',
                        message: error.body?.message || 'Erro ao reabrir o caso',
                        variant: 'error'
                    })
                );
            });
    }
}