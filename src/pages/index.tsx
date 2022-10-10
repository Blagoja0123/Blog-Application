import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Footer } from '../components/Footer'
import Header from '../components/Header'
import { NavBar } from '../components/NavBar'
import NewPost from '../components/NewPost'
import { baseUrl } from '../constants'
import { Posts } from '../components/Posts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
library.add(fab);

const Home: NextPage = () => {

  return (


    <>
      <NavBar />
      <div className=' flex w-full items-center flex-col'>
        <div className=' w-11/12'>
          <Header />
          <Posts />
        </div>
      </div>
      <NewPost />
      <Footer />
    </>
  )
}

export default Home;
