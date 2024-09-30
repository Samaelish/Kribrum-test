/* 
Дан код на javascript:

function update(list) {
  let $newList = list
  list.push('e')
  $newList.push('f')
  return $newList
}

let x = ['a', 'b', 'c', 'd']
console.log(update(x))
console.log(x)

Внесите изменения в код так, чтобы выдача консоли была такой:
['a', 'b', 'c', 'd', 'f']
['a', 'b', 'c', 'd', 'e']
*/

// Ответ:
const update = list => {
  //  Создаю копию массива. Можно и через .slice(), но здесь использую spread.
  let $newList = [...list]
  list.push('e')
  $newList.push('f')
  return $newList
}

let x = ['a', 'b', 'c', 'd']
console.log(update(x))
console.log(x)

/* P.S. Задача на понимание "ссылочности" объектов в JS.
Не стоит присваивать переменной ссылку на объект, лучше создавать копию.
Массивы - объекты и при создании массива занимается место в памяти (heap).
Это место менять по ссылкам через любую из переменных, это будет приводить к изменению значения на которое ссылаются обе переменных.
*/
