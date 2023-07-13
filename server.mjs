import { createServer } from 'http'
import { parse } from 'url'
import next  from 'next'
import { CACHE_CONTROL_HEADER } from './next.config.mjs'
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)

    const setHeader = res.setHeader
    let cacheControlOverwritten = false
    res.setHeader = function(header, value) {
      if (header.toLowerCase() === CACHE_CONTROL_HEADER) {
        cacheControlOverwritten = true
        return setHeader.call(this, 'Cache-Control', value)
      }

      if (header.toLowerCase() === 'cache-control') {
        if (cacheControlOverwritten) {
          return this
        }

        // patch default next.js cache
        const match = value.match(/s-maxage=(\d+), stale-while-revalidate/)
        if (match) {
          const maxAge = match[1]
          return setHeader.call(this, header, `public, s-maxage=${maxAge}, stale-if-error=1200, stale-while-revalidate=30`)
        }
      }

      return setHeader.call(this, header, value); 
    }

    await handle(req, res, parsedUrl)
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
