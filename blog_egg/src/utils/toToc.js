// 将 h? 转换成 ul > li
// 利用堆栈确定标签等级
export default function toToc(data) {

    let levelStack = []
    let result = ''
    const addStartUL = () => { result += '<ul class="catalog-list">'; }
    const addEndUL = () => { result += '</ul>\n'; }
    const addLI = (index, itemText) => {
        result +=
            `<li><a name="link" class="toc-link-#${index}" href="#${index}"> 
            ${itemText}
            </a></li>\n`;
    }

    let dataString = data.join()
    console.log("%c data", "color: red", data, "\n", dataString)
    // const newData = dataString.replace((/(?<=\<h[1-6]).*?<\/h[1-6]>/g), '>')
    // 如果标签中存在其他属性就进行替换
    let regNewData = new RegExp('\\sid\\=\\".*?\\"','g')
    // let regNewData = new RegExp('(?<=\\<h[1-6]).*?(?=\\>)', 'g')  // ios 和 Safari 不支持零宽断言

    // let newData = dataString.replace((/(?<=\<h[1-6]).*?(?=\>)/g), '').split(',')
    // let test = dataString.match(regNewData)
    let newData = dataString.replace(regNewData, '').split(',')
    console.log("%c newData", "color: red", newData)
    // console.log("%c test", "color: red", test)


    newData.forEach((item, index) => {
        // console.log('单个数组标签:', item)
        // console.log('匹配h标签的文字', item.replace(/<[^>]+>/g, ''))
        let regItemText = new RegExp('<[^>]+>', 'g')
        let itemText = item.replace(regItemText, '')      // 匹配h标签的文字
        console.log("%c itemText", "color: red", itemText)

        // let itemText = item.replace(/<[^>]+>/g, '')      // 匹配h标签的文字
        // let itemLevel = item.match(/h(?<=\<h)\d/g)
        // console.log('itemLevel', itemLevel)

        // console.log('匹配h?标签<h?>', item.match(/<.+?>/))
        let regItemLabel = new RegExp('<\\w+?>')
        let itemLabel = item.match(regItemLabel)[0]             // 匹配h?标签<h?>
        // let itemLabel = item.match(/<\w+?>/)[0]             // 匹配h?标签<h?>
        // let itemLabel = item

        // console.log('判断数组里有无<h?>', levelStack.indexOf(itemLabel))
        let levelIndex = levelStack.indexOf(itemLabel)   // 判断数组里有无<h?>
        // 没有找到相应<h?>标签，则将新增ul、li
        if (levelIndex === -1) {
            levelStack.unshift(itemLabel)
            // console.log('堆栈数据', levelStack)
            // 添加 ul 的开始标签
            addStartUL()
            // 添加 li 和 a
            addLI(index, itemText)
        }
        // 找到了相应<h?>标签，并且在栈顶的位置则直接将li放在此ul下
        else if (levelIndex === 0) {
            addLI(index, itemText)
        }
        // 找到了相应<h?>标签，但是不在栈顶位置，需要将之前的所有<h?>出栈并且打上闭合标签，最后新增li
        else {
            while (levelIndex--) {
                levelStack.shift()
                addEndUL()
            }
            addLI(index, itemText)
        }

    });
    // 如果栈中还有<h?>，全部出栈打上闭合标签
    while (levelStack.length) {
        levelStack.shift()
        addEndUL()
    }
    return result


}