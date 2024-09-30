// Мало импортировал что-либо в ванильном JS и для Node. Возможно, есть более оптимальное решение
// Для гитхаба будет добавлено в .gitignore node_modules, а также package и package-lock.

const jsdom = require('jsdom')

// Решение для NodeJS

const classifyLinks = async url => {
  // Завернул всё в try/catch, потому что запрос к веб-странице это обычно асинхронное действие, которое не должно блокировать основной поток.
  try {
    // Отправляю запрос на веб-страницу и получаем её html-содержимое (использовал аксиос)
    const response = await fetch(url)
    const html = await response.text()

    // Парсю её при помощи jsdom, имитации DOM для NodeJS
    const { JSDOM } = jsdom
    const dom = new JSDOM(html)

    // Достаю через DOM все ссылки из документа
    const links = dom.window.document.querySelectorAll('a[href]')

    // Прохожусь по каждой ссылке и выводим в консоль, является ли она внешней или внутренней
    links.forEach(link => {
      //  Достаю url, на который ссылается ссылка через getAttribute, обращаясь к атрибуту href
      const linkUrl = link.getAttribute('href')
      //  Проверяю, является ли ссылка внешней или внутренней, использую созданную функцию isInternalLink
      const isInternal = isInternalLink(url, linkUrl)
      console.log(`Link ${linkUrl} is ${isInternal ? 'internal' : 'external'}`)
    })
  } catch (error) {
    console.error(`Error occurred: ${error.message}`)
  }
}

const isInternalLink = (baseUrl, linkUrl) => {
  // Использую интерфейс URL для работы с url-адресами
  const baseUrlParsed = new URL(baseUrl)
  const linkUrlParsed = new URL(linkUrl, baseUrlParsed.origin)

  return linkUrlParsed.origin === baseUrlParsed.origin
}

// Использую пример лендинга, который когда-то давно писал сам, он маленький и с него легко достать ссылки.
classifyLinks('https://store-website.vercel.app/')
