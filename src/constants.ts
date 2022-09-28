export const baseUrl = process.env.VERCEL_URL
    ? 'https://test-next-4not2qmcn-blagoja0123.vercel.app/'
    : 'http://localhost:3000'

export const url = `${baseUrl}/api/trpc`