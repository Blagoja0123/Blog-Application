import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import { Header } from '../components/Header'
import { NavBar } from '../components/NavBar'
import NewPost from '../components/NewPost'
import { baseUrl } from '../constants'
import { Posts } from './posts/index'
const Home: NextPage = () => {
  const url = baseUrl;
  console.log(url);
  return (

    
    <>
    <NavBar/>
    <Header/>
    <div className="flex h-screen w-screen font-serif  ">
      <Posts/>
    </div>
    <NewPost/>
    <Footer/>
  </>
  )
}

export default Home
