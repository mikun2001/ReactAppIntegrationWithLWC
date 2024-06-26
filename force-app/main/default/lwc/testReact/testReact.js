import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import REACT_APP from '@salesforce/resourceUrl/ReactApp';

export default class TestReact extends LightningElement {
    renderedCallback() {
        if (this.isReactAppInitialized) {
            return;
        }
        this.isReactAppInitialized = true;

        Promise.all([
            loadScript(this, REACT_APP + '/static/js/main.9f612d24.js'),
            loadStyle(this, REACT_APP + '/static/css/main.1a7488ce.css')
        ])
        .then(() => {
            this.initializeReactApp();
        })
        .catch(error => {
            console.error('Error loading React app', error);
        });
    }

    initializeReactApp() {
        const reactRoot = this.template.querySelector('.react-root');
        if (reactRoot) {
            // Assuming your React app is bundled with an entry point that attaches to a DOM element
            window.ReactApp.init(reactRoot);
        }
    }
}