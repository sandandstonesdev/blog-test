import Image from 'next/image'
import Navbar from './navbar'
import Link from 'next/link'

const Header = () => {
  return (
    <div>        
        <header className="flex item-center justify-between p-4 border-b border-blue-500 
                          bg-gray-700 text-white text-sm sm:text-base md:text-lg">
            <h1 className="font-bold text-base sm:text-lg md:text-xl">
              <Link href="/" aria-label="Home">
              <Image src="/favicon.ico" alt="Logo" width={40} height={40} className="opacity-75" />
              </Link>
            </h1>
            <Navbar />
        </header>
    </div>
  )
}

export default Header
