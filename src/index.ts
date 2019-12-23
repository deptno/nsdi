import p from 'puppeteer'
import fs from 'fs'
import path from 'path'
import {parseMain} from './lib/parser'

declare const go_serviceDetail
declare const go_filedownload

async function main(latest = '20191213 ') {
  const browser = await p.launch()
  const page = await browser.newPage()
  const url = 'http://openapi.nsdi.go.kr/nsdi/index.do'

  await page['_client'].send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.resolve(),
  })
  await page.goto(url, {waitUntil: 'networkidle2'})
  await page.goto(url, {waitUntil: 'networkidle2'})

  const html = await page.evaluate(() => document.body.innerHTML)

  try {
    const groups = parseMain(html)
    const text = groups
      .map(g => `
# ${g.title}
${g.items
        .map(i => `    ${i.title} [${i.files.map(f => `${f.title}`).join(', ')}]`)
        .join('\n')}`,
      )
      .join('\n')

    console.log(text)
  } catch (e) {
    console.error(e)
    console.log('html', html)
  }

//  await page.evaluate(() => go_serviceDetail('F002', 'F'))
//  await page.waitForNavigation({waitUntil: 'networkidle2'})
//
//  const codes = await page.evaluate(() =>
//    Array.from<HTMLButtonElement>(document.getElementsByClassName('btndown_shp') as any)
//      .map(btn => btn.onclick.toString().split('\n')[1]),
//  )
//  const targets = codes
//    .map(parseArgs)
//    .filter(([code, date, type, _, filename, years]) => date > latest)
//
//  console.log(`download ${targets.length} items`)
//
//  for (let i = 0; i < targets.length; i++) {
//    await page.evaluate(target => go_filedownload(...target), targets[i])
//    await waitDownload(() => process.stdout.write('.'))
//
//    console.log(`${i + 1}/${targets.length} complete, ${targets[i][4]}(${fs.statSync(path.resolve(targets[i][4])).size} bytes written)`)
//  }

  await browser.close()
}

const parseArgs = (fx: string) => fx
  .match(/'([\w\s_.]+)'/g)
  .map(arg => arg.replace(/\'/g, ''))
const waitDownload = async (log: () => void) => {
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
const delay = (second: number) => new Promise(resolve => setTimeout(resolve, second * 1000))

main().then(() => console.log('end'))
