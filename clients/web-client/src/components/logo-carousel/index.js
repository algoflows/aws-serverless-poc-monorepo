import Image from 'next/image'
import LogoCard from './logo-card'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


import dcnLogo from '/public/logos/dcn.png'
import fugroLogo from '/public/logos/fugro.png'
import ndeLogo from '/public/logos/nde.png'
import sub7Logo from '/public/logos/nde.png'
import technip from '/public/logos/technip.png'

export default function Carousel({height}) {
  return (
    <div className="mt-3 mb-3">
        <AliceCarousel
            autoWidth
            paddingLeft={50}
            paddingRight={50}
            autoPlayStrategy="none"
            disableDotsControls
            disableButtonsControls
            infinite={true}
            autoPlay={true}
            autoPlayInterval={0}
            animationDuration={28000}
        >
          <Image className="item" src={dcnLogo} height={height || 50} width="150" alt="company logo" />
          <Image className="item" src={fugroLogo} height={height || 50} width="150" alt="company logo" />
          <Image className="item" src={ndeLogo} height={height || 50} width="150" alt="company logo" />
          <Image className="item" src={sub7Logo} height={height || 50} width="150" alt="company logo" />
          <Image className="item" src={technip} height={height || 50} width="150" alt="company logo" />
        </AliceCarousel>
    </div>
  )
}