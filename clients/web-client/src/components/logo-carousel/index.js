import styles from './carousel.module.scss'
import LogoCard from '../logo-card'
import Image from 'next/image'

export default function Carousel({ logos, height }) {
  const defaultLogoList = [
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png'
  ]
  return (
    <div>
      <div className={styles.slider}>
        <div className={styles.slidetrack}>
          {defaultLogoList.map((logo, i) => (
            <LogoCard key={i}>
              <div className="slide">
                <Image src={logo} height={height || 50} width="150" alt="" />
              </div>
            </LogoCard>
          ))}
        </div>
      </div>
    </div>
  )
}
