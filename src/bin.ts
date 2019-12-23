#!/usr/bin/env node

import program from 'commander'
import {readFileSync} from 'fs'
import {list} from './list'
import {page} from './lib/page'
import {download} from './download'
import {assertDate8, assertFile, assertString} from './lib/asserts'
import {removeCrDownloads} from './lib/remove-crdownload'

async function main() {
  const pkg = JSON.parse(readFileSync('package.json').toString())

  program
    .version(pkg.version)
    .option('-l, --list', '다운로드 가능한 목록')
    .option('-t, --type <value>', '연속지적도형정보')
    .option('-f, --file <value>', 'shp OR csv')
    .option('-s, --starts-with <value>', '> yyyyMMdd')
    .parse(process.argv)

  const [b, p] = await page()

  try {
    if (program.list) {
      await list(p)
    } else if (program.type) {
      const {type, file, startsWith} = program

      assertDate8(startsWith)
      assertFile(file)
      assertString(type)

      await removeCrDownloads()
      await download(p, {
        startsWith: startsWith + ' ',
        file,
        type,
      })
    } else {
      program.help()
    }
  } catch (e) {
    console.error(e)
    program.help()
  } finally {
    await b.close()
  }
}

main()
