export const baseUrl = process.env.VERCEL_URL
    ? 'https://test-next-red-ten.vercel.app/'
    : 'http://localhost:3000/'

export const url = `${baseUrl}/api/trpc`