// запрос на получение списка туров - Определить типы (возвращающие и для параметров)
export function getTours() :Promise<{success: boolean}>  {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/').then((response) => response.json())

}


