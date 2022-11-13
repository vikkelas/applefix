class FormClass{
    constructor() {
        this.oredrForm = document.getElementById('orderForm')
        this.btnSubmit = document.getElementById('formSubmit')
        this.inputForm = document.querySelectorAll('.formInput')

    }
    checkValid(type,value){
        switch (type){
            case 'name':
                return /^\S([А-Яа-яA-Za-z \s]{2,20})$/gm.test(value)
            case 'tel':
                return /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g.test(value)
            default:
                return  false
        }
    }

    submitForm(){
        this.btnSubmit&&this.btnSubmit.addEventListener('click',(e)=>{
            e.preventDefault()
            const formData = new FormData(this.oredrForm)
            let checkInput = null
            this.inputForm.forEach(item=>{
                item.classList.remove('formInputSuccess')
                item.classList.remove('formInputError')
            })
            this.inputForm.forEach(item=>{
                if(this.checkValid(item.name, item.value)){
                    checkInput++
                    item.classList.add('formInputSuccess')
                }
                if(!this.checkValid(item.name, item.value)){
                    item.classList.add('formInputError')
                }
            })
            checkInput===this.inputForm.length&&console.log('Done form')
        })
    }

}
export default FormClass;