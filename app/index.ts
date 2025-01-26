import {getTours} from "@rest/tours";
import './assets/styles/main.scss';
import {images} from "@services/img/img";
import {ITours} from "./models/tours";
import {initFooterTitle, initHeaderTitle, initToursDivElements} from "@services/general/general";


export let  toursDataArray: ITours[] = [];
const imagesStore = images; // ссылка на изображения нужна чтобы webpack формировал изображения в папке dist

function initApp(): void {
  initHeaderTitle('Туры', 'h1');
  initFooterTitle('Туры по всему миру', 'h2');
  // init data
  const tourData: Promise<ITours[]> = getTours();

  tourData.then((data): void => {
    console.log('call ')
    toursDataArray = data;
    initToursDivElements(data);
  });

}

initApp();