import {parseDownloadArgs} from './lib/parse-download-args'
import fs from 'fs'
import path from 'path'
import {waitDownload} from './lib/wait-download'
import {createDocument} from 'domino'
import {parseMain} from './lib/parser'
import {Page} from 'puppeteer'
import {GroupItem} from './model'

declare const go_filedownload

export const download = async (page: Page, {type, file, startsWith}) => {
  const html = await page.evaluate(() => document.body.innerHTML)
  const dom = createDocument(html)
  const groups = parseMain(dom)
  const items = groups.reduce((a, g) => a.concat(g.items), [] as GroupItem[])
  const item = items.find(t => t.title === type)

  if (!item) {
    throw new Error(`지원되지 않는 타입 ${type}`)
  }

  const fileItem = item.files.find(f => f.title === file.toUpperCase())
  await page.evaluate((code) => eval(code), fileItem.code)
  await page.waitForNavigation({waitUntil: 'networkidle2'})

  const codes = await page.evaluate(
    (file) =>
      Array.from(document.getElementsByClassName(`btndown_${file}`))
        .map((btn: HTMLButtonElement) => btn.onclick.toString().split('\n')[1]),
    file.toLowerCase(),
  )
  const targets = codes
    .map(parseDownloadArgs)
    .filter(([code, date, type, _, filename, years]) => date > startsWith && type === 'CH')

  console.log(`대상 파일 수: ${targets.length}`)

  for (let i = 0; i < targets.length; i++) {
    await page.evaluate(target => go_filedownload(...target), targets[i])
    await waitDownload(() => process.stdout.write('.'))

    console.log(`${i + 1}/${targets.length} 완료, ${targets[i][4]}(${fs.statSync(path.resolve(targets[i][4])).size} 바이트)`)
  }
}
