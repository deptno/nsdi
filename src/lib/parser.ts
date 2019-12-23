import {Group, GroupItem, File} from '../model'

export const parseMain = (dom: Document): Group[] => {
  const contents = dom.querySelectorAll('.sub-content')
  const ret = []

  for (const c of contents) {
    const title = c.querySelector('h3')
    const list = c.nextElementSibling.querySelectorAll('ul>li')
    const group = new Group()
    group.title = title.textContent.trim()

    for (const li of list) {
      const title = li.querySelector('.title')
      const buttons = li.querySelectorAll('.listbtn02, .listbtn03')
      const item = new GroupItem()
      item.title = title.textContent.trim()

      for (const b of buttons) {
        const file: File = {
          title: b.textContent.trim(),
          code: b.getAttribute('onclick')
        }
        item.files.push(file)
      }

      group.items.push(item)
    }

    ret.push(group)
  }

  return ret
}
