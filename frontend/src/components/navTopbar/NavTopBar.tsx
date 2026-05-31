import logoDark from '@/assets/images/logo-dark.png'
import logoLight from '@/assets/images/logo-light.png'
import { useHeaderContent } from '@/hooks/useHeaderContent'
import useScrollEvent from '@/hooks/useScrollEvent'
import { resolveAssetUrl } from '@/services/contentApi'
import { Container, Nav, Navbar, NavbarCollapse, NavbarToggle, NavItem, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import IconifyIcon from '../wrappers/IconifyIcon'

const NavTopBar = ({ isDark }: { isDark?: boolean }) => {
  const { scrollY } = useScrollEvent()
  const { data: headerContent } = useHeaderContent()
  const headerSettings = headerContent?.settings
  const uploadedLightLogo = resolveAssetUrl(headerSettings?.logo_light_url)
  const uploadedDarkLogo = resolveAssetUrl(headerSettings?.logo_dark_url)
  const lightLogo = uploadedLightLogo || uploadedDarkLogo || logoLight
  const darkLogo = uploadedDarkLogo || uploadedLightLogo || logoDark
  const logoAlt = headerSettings?.logo_alt || 'logo'
  const sectionLinks = [
    { label: 'Home', to: '/#home' },
    { label: 'Features', to: '/#features' },
    { label: 'Services', to: '/#services' },
    { label: 'Reviews', to: '/#testimonial' },
    { label: 'Team', to: '/#team' },
    { label: 'Pricing', to: '/#pricing' },
    { label: 'Contact', to: '/#contact' },
  ]

  return (
    <Navbar
      expand={'lg'}
      className={` fixed-top navbar-custom sticky-dark ${isDark && 'navbar-dark'} ${scrollY > 50 && 'nav-sticky'} `}
      id="navbar-sticky">
      <Container>
        <Link className="logo text-uppercase" to="/">
          <img src={lightLogo} width={337} height={80} alt={logoAlt} className="logo-light" style={{ height: 80, objectFit: 'contain' }} />
          <img src={darkLogo} width={337} height={80} alt={logoAlt} className="logo-dark" style={{ height: 80, objectFit: 'contain' }} />
        </Link>
        <NavbarToggle
          aria-controls="basic-navbar-nav"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <IconifyIcon icon="tabler:menu" />
        </NavbarToggle>
        <NavbarCollapse id="basic-navbar-nav">
          <Nav as={'ul'} className="navbar-nav ms-auto navbar-center" id="mySidenav">
            {sectionLinks.map((item) => (
              <NavItem as={'li'} key={item.to}>
                <NavLink as={Link} to={item.to}>
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <Link className="btn btn-sm btn-primary ms-4" to="/features">
            View Features
          </Link>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}

export default NavTopBar
