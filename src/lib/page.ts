import p, {Browser, Page} from 'puppeteer'
import path from 'path'

export const page = async (): Promise<[Browser, Page]> => {
  const browser = await p.launch()
  const page = await browser.newPage()
  const url = 'http://openapi.nsdi.go.kr/nsdi/index.do'

  await page['_client'].send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.resolve(),
  })
  await page.goto(url, {waitUntil: 'networkidle2'})
  await page.goto(url, {waitUntil: 'networkidle2'})

  return [browser, page]
}
