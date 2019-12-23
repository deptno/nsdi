import {parseMain} from './lib/parser'
import {Page} from 'puppeteer'
import {createDocument} from 'domino'

export const list = async (page: Page) => {
  const html = await page.evaluate(() => document.body.innerHTML)
  const dom = createDocument(html)
  const text = parseMain(dom)
    .map(g => `
${g.title}
${g.items
      .map(i => `    # ${i.title} [${i.files.map(f => `${f.title}`).join(', ')}]`)
      .join('\n')}`,
    )
    .join('\n')

  console.log(text)
}