import styles from './carousel.module.scss'
import LogoCard from './logo-card'
import Image from 'next/image'

import dcnLogo from '/public/logos/dcn.png'
import fugroLogo from '/public/logos/fugro.png'
import ndeLogo from '/public/logos/nde.png'
import sub7Logo from '/public/logos/nde.png'
import technip from '/public/logos/technip.png'

// testing deployment

export default function ProfileCarousel({ logos, height }) {
  const defaultLogoList = [dcnLogo, fugroLogo, ndeLogo, sub7Logo, technip]
  return (
    <div>
      <div className={styles.slider}>
        <div className={styles.slidetrack}>
          {defaultLogoList.map((logo, i) => (
            <LogoCard key={i}>
              <div className="slide">
                <Image src={logo} height={height || 50} width="120" alt="" />
              </div>
            </LogoCard>
          ))}
        </div>
      </div>
    </div>
  )
}
