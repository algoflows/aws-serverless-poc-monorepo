import Link from "next/link"
import Image from "next/image"
import opsapLogo from "../../../../public/opsap6-white-final.png"

export default function LandingNav() {
  return (
    <div className="mb-5 rounded-b-lg bg-gradient-to-r from-blue-900 to-blue-600">
      <nav className="flex items-center justify-between max-w-6xl py-3 mx-auto text-white shadow-sm">
        <Link href="/">
          <a className="mt-1">
            <Image
              className="cursor-pointer"
              quality="100"
              width={110}
              height={25}
              src={opsapLogo}
              alt="Opsap Logo"
            />
          </a>
        </Link>
        <div>
          <Link href="/signin">
            <a className="ml-4">LOGIN</a>
          </Link>
          {/* <Link href="/protected">
            <a className="ml-4">Protected</a>
          </Link>
          <Link href="/app">
            <a className="ml-4">
              <span>App</span>
            </a>
          </Link> */}
        </div>
      </nav>
    </div>
  )
}
