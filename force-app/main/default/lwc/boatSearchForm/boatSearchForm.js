import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
import { getDataConnectorSourceFields } from 'lightning/analyticsWaveApi';
import { LightningElement, track, wire } from 'lwc';

// imports
// import getBoatTypes from the BoatDataService => getBoatTypes method';
export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';

    // Private
    error = undefined;
    @track searchOptions;

    // Wire a custom Apex method
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
        if (data) {
            console.log(data);
            this.searchOptions = data.map(type => {
                // TODO: complete the logic
                return { label: type.Name, value: type.Id };
            });
            this.searchOptions.unshift({ label: 'All Types', value: '' });
        } else if (error) {
            this.searchOptions = undefined;
            this.error = error;
        }
    }

    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value
        // Create the const searchEvent        
        const searchEvent = new CustomEvent('search', { 
            detail: {
                boatTypeId: this.selectedBoatTypeId
            }
        });
        this.dispatchEvent(searchEvent);
    }
}
