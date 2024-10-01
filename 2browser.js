/*
Нужно написать функцию, которая с любой веб-страницы собирает все ссылки. 
Затем, пишет в консоль про каждую из них, внешняя эта ссылка или внутренняя.

Внутренняя ссылка сайта – это ссылка, ведущая с одной страницы сайта на другую. 
Внешняя ссылка – это ссылка, ведущая на страницу, расположенную на другом сайте. 
*/

// Ответ:
const classifyLinks = async url => {
  // Завернул всё в try/catch, потому что запрос к веб-странице это обычно асинхронное действие, которое не должно блокировать основной поток.
  try {
    // Отправляю запрос на веб-страницу и получаем её html-содержимое (использовал аксиос)
    const response = await fetch(url)
    if (!response.ok) {
      console.error('Ошибка запроса')
    }
    const html = await response.text()

    // Парсю её при помощи DOMParser. Можно это сделать при помощи Cheerio, тогда синтаксис будет немного проще, похожим на jQuery
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    // Достаю через DOM все ссылки из документа
    const links = doc.querySelectorAll('a[href]')

    // Прохожусь по каждой ссылке и выводим в консоль, является ли она внешней или внутренней
    links.forEach(link => {
      //  Достаю url, на который ссылается ссылка через getAttribute, обращаясь к атрибуту href
      const linkUrl = link.getAttribute('href')
      //  Проверяю, является ли ссылка внешней или внутренней, использую созданную функцию isInternalLink
      const isInternal = isInternalLink(url, linkUrl)
      console.log(`Link ${linkUrl} is ${isInternal ? 'internal' : 'external'}`)
    })
  } catch (error) {
    console.error(`Ошибка соединения: ${error.message}`)
  }
}

/* 
Вынес логику по определению, является ли ссылка внутренней или внешней в отдельную функцию, 
так как функция классификации ссылок должна быть как можно более универсальной.
*/
const isInternalLink = (baseUrl, linkUrl) => {
  // Использую интерфейс URL для работы с url-адресами
  const baseUrlParsed = new URL(baseUrl)
  const linkUrlParsed = new URL(linkUrl, baseUrlParsed.origin)

  return linkUrlParsed.origin === baseUrlParsed.origin
}


// Интересная задача, раньше таким не занимался. Глобальнее двух предыдущих и более практическая. Пришлось поизучать с нуля некоторые вещи.
// В Node.js не будет работать, потому что fetch и DOMParser не поддерживаются в Node.js.
// Добавил решение для Node.js под названием "2node.js". Проверил - работает, в консоль вывело "is external" или "is internal" для каждой ссылки. 
