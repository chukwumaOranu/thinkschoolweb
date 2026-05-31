import logoDark from '@/assets/images/logo-dark.png'
import logoLight from '@/assets/images/logo-light.png'
import Loader from '@/components/Loader'
import { currentYear } from '@/context/constants'
import { useHeaderContent } from '@/hooks/useHeaderContent'
import { resolveAssetUrl } from '@/services/contentApi'
import { ReactNode } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AppLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const { data: headerContent } = useHeaderContent()
  const headerSettings = headerContent?.settings
  const uploadedLightLogo = resolveAssetUrl(headerSettings?.logo_light_url)
  const uploadedDarkLogo = resolveAssetUrl(headerSettings?.logo_dark_url)
  const lightLogo = uploadedLightLogo || uploadedDarkLogo || logoLight
  const darkLogo = uploadedDarkLogo || uploadedLightLogo || logoDark
  const logoAlt = headerSettings?.logo_alt || 'logo'

  return (
    <>
      <Loader />
      {children}
      <footer className="footer-part footer-light py-5 pb-4">
        <Container>
          <Row className="mt-5 pb-5 justify-content-between g-3">
            <Col lg={4}>
              <div className="footer-about">
                <div className="logo mb-4">
                  <Link className="logo text-uppercase" to="/">
                    <img width={168} height={30} src={lightLogo} alt={logoAlt} className="logo-light" style={{ height: 30, objectFit: 'contain' }} />
                    <img width={168} height={30} src={darkLogo} alt={logoAlt} className="logo-dark" style={{ height: 30, objectFit: 'contain' }} />
                  </Link>
                </div>
                <p className="text-dark mb-4">
                  ThinkSchool simplifies academics, records, finance, attendance, payroll, inventory, medical reports, and CBT for modern schools.
                </p>
                <Button variant="primary" size="sm">
                  Subscribe
                </Button>
              </div>
            </Col>
            <Col lg={2}>
              <h5 className="text-dark fw-medium">Company</h5>
              <ul className="mt-4">
                <li>
                  <Link to="">About Us</Link>
                </li>
                <li>
                  <Link to="#services">Services</Link>
                </li>
                <li>
                  <Link to="#team">Team</Link>
                </li>
                <li>
                  <Link to="#contact">Contact</Link>
                </li>
              </ul>
            </Col>
            <Col lg={2}>
              <h5 className="text-dark fw-medium">Plans</h5>
              <ul className="mt-4">
                <li>
                  <Link to="/plans#startup-package">Startup Package</Link>
                </li>
                <li>
                  <Link to="/plans#standard-package">Standard Package</Link>
                </li>
                <li>
                  <Link to="/plans#premium-package">Premium Package</Link>
                </li>
              </ul>
            </Col>
            <Col lg={3}>
              <h5 className="text-dark fw-medium">Contact Us</h5>
              <ul className="mt-4">
                <li>
                  <a href="mailto:info@thinkschoolapps.co.uk">info@thinkschoolapps.co.uk</a>
                </li>
                <li>
                  <a href="tel:+2348035089474">+2348035089474</a>
                </li>
                <li>
                  <Link to="/plans#contact">Request Demo</Link>
                </li>
              </ul>
            </Col>
          </Row>
          <hr className="border-primary" />
          <Row className="align-items-center justify-content-between g-3">
            <Col lg={5}>
              <p className="m-0 fs-6 text-dark">{currentYear} © ThinkSchool App. All rights reserved.</p>
              <p className="m-0 fs-6 text-dark">Powered by Deepflux Innovative Limited</p>
            </Col>
            <Col lg={3} className="text-lg-center">
              <Row className="g-3">
                <Col lg={6}>
                  <Link to="/terms" className="text-dark">
                    Terms Of Us
                  </Link>
                </Col>
                <Col lg={6}>
                  <Link to="/privacy-policy" className="text-dark">
                    Privacy Policy
                  </Link>
                </Col>
                <Col lg={12}>
                  <Link to="/data-protection" className="text-dark">
                    Data Protection
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default AppLayout
