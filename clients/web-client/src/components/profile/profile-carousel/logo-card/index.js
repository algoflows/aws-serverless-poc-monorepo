// import Image from 'next/image'

export default function LogoCard({children}) {
  return (
      <div className="z-10 flex items-center justify-center h-16 ml-6 border border-gray-100 w-48 rounded-xl">
        {/* <Image
        width={100}
        height={100}
        src={
          'https://th.bing.com/th/id/R.da8d00f824e9c941fab179a98c0b5031?rik=%2blCPfcMqTTD4DQ&pid=ImgRaw'
        }
      /> */}
        {children}
      </div>
  )
}
