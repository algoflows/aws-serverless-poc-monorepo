// import Image from 'next/image'

export default function LogoCard({ children }) {
  return (
    <div className="z-10 flex items-center justify-center h-20 ml-8 border w-96 rounded-tl-xxl rounded-br-xxl">
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
