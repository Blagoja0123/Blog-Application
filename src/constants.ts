export const baseUrl = process.env.VERCEL_URL
    ? 'https://test-next-c1as4xtmq-blagoja0123.vercel.app/'
    : 'http://localhost:3000/'

export const url = `${baseUrl}/api/trpc`