import {readdirSync, unlinkSync} from 'fs'
import {promisify} from 'util'

export const removeCrDownloads = () =>
  Promise.all(
    readdirSync('.')
      .filter(f => f.endsWith('.crdownload'))
      .map(promisify(unlinkSync)))
