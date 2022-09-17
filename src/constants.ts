export const baseUrl = process.env.VERCEL_URL
    ? 'http://localhost:3000'
    : 'https://test-next-red-ten.vercel.app/'

export const url = `${baseUrl}/api/trpc`