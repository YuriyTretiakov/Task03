
import {Modal} from "../../classess/modal";
import {toursDataArray} from "../../index"; // ссылка на массив с данными
// window['openModal'] = openModal;
// window['removeModal'] = removeModal;
// window['openModalSecond'] = openModalSecond;


// Определить типы для метода (возвращающие и для переменных в теле функции)

export function openModal(type:any , i: number) {

    const data = toursDataArray[i];
    const tourId = data[i]?.id;

    let modalInfo = {};
    switch (type) {
        case "order":
            const modalTemplate = `
      <div> 
      <p data-moda-id="tour-modal" class="close-modal">x</p>
      <p>${data.name}</p>
      <p>${data.description}</p>
       
       <div data-tour-id=${tourId} class="ticket-submit">
       <a href="/ticket.html">Купить билет</a>
</div>
     </div>
  `
            const modal = new Modal('tour-modal');
            modal.open(modalTemplate);
            break;
    }
}

function removeModal():void {
    Modal.removeById;
}

function openModalSecond(id = null):void {
    const template = "<div>MyModal 2</div>";
    const modal = new Modal(id);
    modal.open(template);
}

