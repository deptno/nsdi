import * as fs from "fs"
import * as path from "path"
import {delay} from './delay'

export const waitDownload = async (log: () => void) => {
  await delay(1)

  const count = fs.readdirSync(path.resolve())
    .map(path.extname)
    .filter(ext => ext === '.crdownload').length

  if (count > 0) {
    log()

    return waitDownload(log)
  }

  return
}
