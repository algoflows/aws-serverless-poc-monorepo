import Image from "next/image"
import heroImage from "../../../../public/Hero_Img.png"

export default function Hero() {
  return (
    <main className="lg:relative">
      <div className="w-full pt-16 pb-20 mx-auto text-center h-100 max-w-7xl lg:py-44 lg:text-left">
        <div className="lg:w-1/2 sm:px-8 xl:pr-16">
          <h1 className="mb-10 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl">
            <span className="block xl:inline">Divers</span>
          </h1>
          <p className="max-w-md mx-auto mt-3 mb-10 text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Automated Career Tracking, Digital Logbooks, Jobs Board and applicant management
            platform for the commercial diving industry.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white border border-transparent rounded-md bg-gradient-to-r from-blue-900 to-blue-600 hover:bg-blue-500 md:py-4 md:text-lg md:px-10"
              >
                Signup for FREE
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-64 sm:h-64 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <svg
          className="absolute transform right translate-y-1/4 translate-x-1/4 lg:translate-x-1/"
          width="300"
          height="500"
          fill="none"
          viewBox="0 0 404 650"
        >
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
              x="0"
              y="0"
              width="25"
              height="25"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="5"
                height="5"
                className="text-gray-300"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="500" height="650" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
        </svg>
        <div className="flex items-center justify-center w-full h-full pl-28 right-full">
          <Image width={420} height={570} src={heroImage} />
        </div>
      </div>
    </main>
  )
}
