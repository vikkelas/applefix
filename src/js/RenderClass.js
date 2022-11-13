import iconCalendar from "../icons/calendar.svg";
import iconView from '../icons/eye.svg';
import iconLikes from '../icons/thumbs-up.svg'
class RenderClass{
    constructor() {

    }
    renderPost({title,data,views,likes,links}){
        const post = document.createElement('li');
        post.classList.add('mainContainerTextBoxListItem');
        post.insertAdjacentHTML('afterbegin',`
            <a href=${links}>${title}</a>
            <div class="mainContainerTextBoxListItemInfoBox">
                <div class="mainContainerTextBoxListItemInfoBoxItem">
                    <img src=${iconCalendar} alt="дата">
                    <span>${data}</span>
                </div>
                <div class="mainContainerTextBoxListItemInfoBoxItem">
                    <img src=${iconView} alt="просмотры">
                    <span>${views}</span>
                </div>
                <div class="mainContainerTextBoxListItemInfoBoxItem">
                    <img src=${iconLikes} alt="просмотры">
                    <span>${likes}</span>
                </div>
            </div>
        `)
        return post;
    }

    renderCardImageView({photoCard, name}){
        const image = document.createElement('img')
        image.setAttribute('alt', name)
        image.setAttribute('src', photoCard)
        return image
    }
}
export default RenderClass;