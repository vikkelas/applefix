import './sass/main.sass'
import './index.html'
import IMask from 'imask';
import SubmitPageClass from "./js/SubmitPageClass";
import FormClass from "./js/FormClass";

const inputTell = document.getElementById('formTel');
const maskOptions = {
    mask: '+{7} (000) 000-00-00',
};
const startSubscription = new SubmitPageClass()
const formSubmit = new FormClass()

formSubmit.submitForm()
startSubscription.subscriptionEvent()

inputTell&&IMask(inputTell,maskOptions)