import LandingNav from '../../landing/nav'

export default function LandingLayout({ children }) {
  return (
    <div>
      <LandingNav />
      {children}
    </div>
  )
}
