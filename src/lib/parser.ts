import {createDocument} from 'domino'

export const parseMain = (html: string): Group[] => {
  const body = createDocument(html)
  const contents = body.querySelectorAll('.sub-content')
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

class Group {
  title: string
  items: GroupItem[] = []
}
class GroupItem {
  title: string
  files: File[] = []
}
class File {
  title: string
  code: string
}
