import { useState } from 'react'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex flex-col justify-start min-h-[100vh]'>
        <Navbar />
        <Manager />
        <Footer />
      </div>
    </>
  )
}

export default App
