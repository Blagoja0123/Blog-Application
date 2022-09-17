import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
import { Posts } from './posts/index'
const Home: NextPage = () => {
  return (
    <>
    <NavBar/>
    <Header/>
    <div className="flex h-screen w-screen font-serif bg-slate-700 ">
      <Posts/>
    </div>
  </>
  )
}

export default Home
