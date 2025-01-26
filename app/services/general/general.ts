import {openModal} from "@services/modal/modalService";
import {getTourTemplate} from "../../templates/tours";
import {postTicketData} from "@rest/tickets";
import {initTicketElementTemplate} from "../../templates/ticketInfo";
import {IVipTicket, TicketType, ITicket} from "../../models/ticket";
import { ITours } from "models/tours";

const clientType = "custom";
let ticketPostInstance;
/* Общие методы используются для вставки текста в header   footer*/

export function initHeaderTitle(ticketName: string, selector: string) {
    const headerElement: HTMLInputElement | null = document.querySelector('header') as HTMLInputElement | null;
    const targetItem: HTMLInputElement | null = headerElement.querySelector(selector) as HTMLInputElement | null;
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initFooterTitle(ticketName: string, selector: string) {
    const headerElement: HTMLInputElement | null = document.querySelector('footer') as HTMLInputElement | null;
    const targetItem: HTMLInputElement | null = headerElement.querySelector(selector) as HTMLInputElement | null;
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

/* Методы для index ts*/
export function initToursDivElements(data: ITours[]) {

    if (Array.isArray(data)) {
      const rootElement: Element = document.querySelector('.main-app');
      const tourWrap = document.createElement('div');
  
      tourWrap.classList.add('tour-wrap');
  
      // init click for modal
      initTourElemListener(tourWrap);
  
      let rootElementData = '';
      data.forEach((el, i) => {
        rootElementData += getTourTemplate(el, i);
      });
  
      tourWrap.innerHTML = rootElementData;
      rootElement.appendChild(tourWrap) ;
    }
  }
  
  
function initTourElemListener(tourWrap:HTMLElement): void {
    tourWrap.addEventListener('click', (ev: Event) => {
      const targetItem = ev.target as HTMLElement;
      const parentItem = targetItem?.parentNode as HTMLElement;
      let realTarget: HTMLElement = null;
  
      if (targetItem.hasAttribute('data-tour-item-index')) {
        realTarget = targetItem;
      } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
        realTarget = parentItem;
      }
  
      if (realTarget) {
        const dataIndex = realTarget.getAttribute('data-tour-item-index');
        openModal('order', Number(dataIndex));
      }
    });
  }

  /*Методы для ticket.ts*/
  export function initTicketInfo(ticket: TicketType | IVipTicket) {
    const targetElement = document.querySelector('.ticket-info');

    const ticketDescription = ticket?.description;
    const ticketOperator = ticket?.tourOperator;
    let vipClientType: string;
    if ("vipStatus" in ticket) {
        vipClientType = ticket.vipStatus;
    }


    const ticketElemsArr: [string, string, string] = [ticketDescription, ticketOperator, vipClientType];
    let ticketElemTemplate;

    ticketElemsArr.forEach((el, i) => {
        ticketElemTemplate+= initTicketElementTemplate(el, i);
    });

    targetElement.innerHTML = ticketElemTemplate;

}

function initUserData() {
const userInfo = document.querySelectorAll('.user-info > p');
let userInfoObj;
    userInfo.forEach((el) => {
    const inputDataName = el.getAttribute('data-name');
    if (inputDataName) {
        const inputElems = el.querySelector('input');
        userInfoObj[inputDataName] = inputElems.value;
    }
    });

    console.log('userInfoObj',userInfoObj)
    return userInfoObj;
}

function initPostData(data) {
    initUserData();
    postTicketData(data).then((data) => {
        if (data.success) {

        }
    })
}

export function registerConfirmButton(): void {
    const targetEl = document.getElementById('accept-order-button');
    if (targetEl) {
        targetEl.addEventListener('click', () => {
            initPostData(ticketPostInstance);
        });
    }
}