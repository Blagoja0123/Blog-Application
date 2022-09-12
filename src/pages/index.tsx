import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
const Home: NextPage = () => {
  return (
    <>
    <NavBar/>
    <Header/>
    <div className="flex h-screen w-screen font-serif justify-center bg-slate-700 align-middle items-center">
      <div className="bg-red text-center text-white items-center justify-center border-2 rounded-lg h-3/6 w-3/6 align-middle">test test</div>
    </div>
  </>
  )
}

export default Home
