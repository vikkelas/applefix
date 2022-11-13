import RenderClass from "./RenderClass";
import data from "./data";

class SubmitPageClass {
    constructor(){
        this.renderElem = new RenderClass()
        this.posts = data.posts
        this.galleryIphone = data.iphone
        this.menuList = document.querySelectorAll('.toolbarNavListItem')
        this.filterType = document.querySelectorAll('.mainStoreFiltersBoxTypeItem')
        this.filterDevice = document.querySelectorAll('.mainStoreFiltersBoxDeviceListItem')
        this.previewCardDevice= document.querySelectorAll('.mainStoreCardDeviceMainGalleryPreviewImg')
        this.accordionItem =document.querySelectorAll('.mainStoreAccordionListItem')
        this.postsList = document.getElementById('posts')
        this.boxView = document.getElementById('boxView')
        this.activePhotoView = this.galleryIphone[0]
        this.btnOpenPrice = document.getElementById('btnPrice')
        this.secondaryPriceList = document.getElementById('priceSecondary')
    }

    //подписка на события
    subscriptionEvent(){
        this.changeActiveItem(this.menuList, 'toolbarNavListItem-active');
        this.changeActiveItem(this.filterType, 'mainStoreFiltersBoxTypeItemActive')
        this.changeActiveItem(this.filterDevice, 'mainStoreFiltersBoxDeviceListItemActive')
        this.changeActiveItem(this.previewCardDevice, 'mainStoreCardDeviceMainGalleryPreviewImgActive')
        this.openAccordion()
        this.openSecondPrice()
        this.renderPage()
        this.changePhotoCard()
    }
    //изменения активных кнопок
    changeActiveItem(arrElement,activeClass){
        arrElement.forEach(item=>{
            item.addEventListener('click',()=>{
               arrElement.forEach(i=>i.classList.remove(activeClass))
                item.classList.add(activeClass)
            })
        })
    }
    //изменение активного фото по клику на фото из списка
    changePhotoCard(){
        this.previewCardDevice.forEach((item,index)=>{
            item.addEventListener('click',()=>{
                this.boxView.replaceChildren();
                this.activePhotoView = this.galleryIphone[index]
                this.boxView.insertAdjacentElement('beforeend',this.renderElem.renderCardImageView(this.activePhotoView))
            })
        })
    }
    //первоначальная отрисовка элементов
    renderPage(){
        this.posts.forEach(item=>{
            this.postsList&&this.postsList.insertAdjacentElement('beforeend',this.renderElem.renderPost(item))
        })
        this.boxView&&this.boxView.insertAdjacentElement('beforeend',this.renderElem.renderCardImageView(this.activePhotoView))
    }
    //раскрытие аккордеона
    openAccordion(){
       this.accordionItem&&this.accordionItem.forEach(item=>{
           item.addEventListener('click', ()=>{
               if(item.classList.contains('mainStoreAccordionListItemActive')){
                   item.classList.remove('mainStoreAccordionListItemActive')
                   return
               }
               if(!item.classList.contains('mainStoreAccordionListItemActive')){
                   this.accordionItem.forEach(item=>{
                       item.classList.remove('mainStoreAccordionListItemActive')
                   })
                   item.classList.add('mainStoreAccordionListItemActive')
               }
           })
       })
    }
    //раскрытие дополнительного прайса
    openSecondPrice(){
        this.btnOpenPrice&&this.btnOpenPrice.addEventListener('click',()=>{
            this.secondaryPriceList.classList.toggle('mainStorePriceMainListVisible')
            this.secondaryPriceList.classList.toggle('mainStorePriceMainListHidden')
            this.btnOpenPrice.classList.toggle('mainStorePriceBtnUp')
        })
    }
}

export default SubmitPageClass;