
/**
 * 动态计算元素的高度
 * @param className 元素的class
 * @param numbers   需要减掉的高度
 */
export function clacScrollHeight (className, numbers) {
  var navHeight = (document.documentElement.clientHeight - numbers) + 'px'
  document.getElementsByClassName(className)[0].style.height = navHeight
}
/**
 * 根据id获取制定元素的所有父节点
 * @param arr
 * @param id
 * @returns {Array}
 */
export function getParentsById (arr, id) {
  var temp = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      temp.push(arr[i])
      temp = temp.concat(this.getParentsById(arr, arr[i].pid))
      break
    }
  }
  return temp
}
/**
 * 将树形导航嵌套的json转换成单层json
 * @param datas
 * @returns {Array}
 */
export function getNavDateToSimpleJson (datas) {
  if (datas.length === 0) {
    console.log('no data!')
  } else {
    let arr = []
    for (let i in datas) {
      arr.push({'lable': datas[i].label, 'url': datas[i].url, 'id': datas[i].id, 'pid': datas[i].pid})
      if (datas[i].children) {
        arr = arr.concat(getNavDateToSimpleJson(datas[i].children))
      }
    }
    return arr
  }
}
/**
 * 动态计算页签包裹层的宽度
 */
export function setTagNavWIdth () {
  let list = document.getElementsByClassName('z-nav-tag-ul-li')
  let width = 0
  let boxWidth = document.body.offsetWidth - 422
  for (let i = 0; i < list.length; i++) {
    width += parseInt(window.getComputedStyle(list[i], null).width) + 10
  }
  document.getElementsByClassName('z-nav-tag-ul')[0].style.width = width + 'px'
  document.getElementById('z-nav-tag-box').style.width = boxWidth + 'px'
}
/**
 * 动态计算页签移动的距离,作为是否可以拖动或点击滑动的依据
 */
export function calcTagBox () {
  let tagBox = document.getElementById('z-nav-tag-box')
  let tagUl = document.getElementsByClassName('z-nav-tag-ul')[0]
  let tagBoxWidth = parseInt(window.getComputedStyle(tagBox, null).width)
  let tagUlWidth = parseInt(window.getComputedStyle(tagUl, null).width)
  return {tagBoxWidth, tagUlWidth}
}

