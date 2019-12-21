import * as p from 'puppeteer'
import {parseArgs} from './lib/parse-args'

async function main() {
  const browser = await p.launch()
  const page = await browser.newPage()
  const url = 'http://openapi.nsdi.go.kr/nsdi/index.do'

  await page.goto(url, {waitUntil: 'networkidle2'})
  await page.goto(url, {waitUntil: 'networkidle2'})

  const codes = await page.evaluate(() => {
    let buttons = Array.from<HTMLButtonElement>(document.querySelectorAll('.listbtn02')).concat(
      Array.from<HTMLButtonElement>(document.querySelectorAll('.listbtn03'))
    )

    return buttons.map(btn => btn.onclick.toString().split('\n')[1])
  })

  const targets = codes.map(parseArgs)

  // todo:

  await browser.close()
}

main().then(() => console.log('end'))

