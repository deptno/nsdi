export class Group {
  title: string
  items: GroupItem[] = []
}
export class GroupItem {
  title: string
  files: File[] = []
}
export class File {
  title: string
  code: string
}
