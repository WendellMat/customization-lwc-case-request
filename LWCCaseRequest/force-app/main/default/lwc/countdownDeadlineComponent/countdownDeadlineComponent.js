import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import SLA_DEADLINE_FIELD from '@salesforce/schema/Case_Request__c.SLA_Deadline__c';


export default class countdownDeadlineComponent extends LightningElement {
    @api recordId; //Get the recordId from the Case_Request__c when open the page
    deadline; 
    timer = 'Time Left';
    setTimeInterval;

    //Get the record wich is showing up in the page and stores in the variable "caseRequest"
    @wire(getRecord, { recordId: '$recordId', fields: [SLA_DEADLINE_FIELD] })
    caseRequest({ data, error }) {
        //If the data is not empty, the error is empty and the count down is running
        if(data) {
            //Get the SLA Deadline from the record
            this.deadline = getFieldValue(data, SLA_DEADLINE_FIELD);
            //Clear the timer (0days 0hrs 0mins 0secs)
            clearInterval(this.setTimeInterval);
            this.setTimeInterval = setInterval(() => {
                let day = new Date(this.deadline);        

                let dayWithHours = day.getTime();

                let currentDateTime = new Date().getTime();

                let timeDifference = dayWithHours - currentDateTime;


                //Clear the timer if the deadline is passed
                if (timeDifference < 0) {
                    clearInterval(this.setTimeInterval);
                    this.timer = 'The SLA Deadline Lapsed';
                } else //Else, format the time left and show in the UI
                {
                    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                    this.timer = days + "days " + hours + "hrs " + minutes + "mins " + seconds + "secs ";
                }
            //Wait for 1 second and repeat the process
            }, 1000)
       } else if(error) {
            this.error = error;
            this.dayWithHours = undefined;
        }
    }
}