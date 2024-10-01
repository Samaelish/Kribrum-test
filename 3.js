/*
Нужно написать функцию, превращающую количество секунд в человекочитаемый промежуток времени (K дней, L часов, M минут, N секунд). 
На вход подаётся int, на выходе должна быть строка. 
Cклонение и множественное/единственное числов интервалов времени можно не учитывать. пример: 87448 -> '1 days 17 min 28 sec'. 
*/
const secondsToHumanReadable = seconds => {
  // Получаем дни, часы, минуты и оставшиеся секунды из строки с секундами
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  // Для удобства дальнейшего выведения результата создаём пустой масссив
  const parts = []

  // Подсчёт  количества дней, часов, минут и секунд
  if (days > 0) {
    parts.push(`${days} days`)
  }

  if (hours > 0) {
    parts.push(`${hours} hours`)
  }

  if (minutes > 0) {
    parts.push(`${minutes} min`)
  }

  if (remainingSeconds > 0) {
    parts.push(`${remainingSeconds} sec`)
  }

  // Возвращаю строку с пробелом в качестве разделителя. 
  // Можно было бы вывести результат в консоль через console.log, но в задаче это не уточнено, поэтому просто возвращаю.
  return parts.join(' ')
}


console.log(secondsToHumanReadable('87448')) // 1 days 17 min 28 sec

// P.S. задача на логику и немного на знание JS.