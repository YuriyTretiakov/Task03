import {getTicketById} from "@rest/tickets";
import '@myCss'; // добавлена новая ссылка - ссылка ведет на один файл
import '@assets/styles/tickets.scss'
import {IVipTicket, TicketType} from "../../models/ticket";
import {initFooterTitle, initHeaderTitle, registerConfirmButton, initTicketInfo} from "@services/general/general";


let ticketInstance: TicketType ;

// init main  data
initApp();
registerConfirmButton();

function initApp(): void {
    const ticketData: Promise<IVipTicket[]> = getTicketById<IVipTicket>('someId');
    ticketData.then((data): void => {
        ticketInstance = data[0];
        const ticketName = typeof ticketInstance?.name === "string" ? ticketInstance?.name : '';
        initHeaderTitle(ticketName, 'h3');
        initFooterTitle('Туры по всему миру', 'h2');
        initTicketInfo(ticketInstance);
    });
}


