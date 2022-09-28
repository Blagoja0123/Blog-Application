
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { trpc } from '../utils/trpc'
import '../styles/Home.module.css'
import superjson from 'superjson'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { withTRPC } from '@trpc/next';
import { AppRouter } from '../backend/router/app.routes';
import { UserContextProvider } from '../context/user.context'
import "@fortawesome/fontawesome-svg-core/styles.css"




function MyApp({ Component, pageProps }: AppProps) {
  const { data, error, isLoading } = trpc.useQuery(['users.me'])

  if (isLoading) {
    return <>Loading user...</>
  }

  return (
    <><UserContextProvider value={data}>
        <main>
          <Component {...pageProps} />
        </main> 
      </UserContextProvider>   
    </>    
  )
}  





export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url: 'http://localhost:3000/api/trpc',
      }),
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          }
        }
        return {}
      },
      links,
      transformer: superjson,
    }
  },
  ssr: false,
})(MyApp)
