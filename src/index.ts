import {page} from './lib/page'
import {download} from './download'
import {assertDate8, assertFile, assertString} from './lib/asserts'
import {removeCrDownloads} from './lib/remove-crdownload'

async function nsdi({type, file, startsWith}) {
  const [b, p] = await page()

  try {
    assertDate8(startsWith)
    assertFile(file)
    assertString(type)

    await removeCrDownloads()
    await download(p, {
      startsWith: startsWith + ' ',
      file,
      type,
    })
  } catch (e) {
    console.error(e)
  } finally {
    await b.close()
  }
}

