import startupSlide1 from '@/assets/images/startup-slide-1.png'
import startupSlide2 from '@/assets/images/startup-slide-2.png'
import NavTopBar from '@/components/navTopbar/NavTopBar'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { CSSProperties } from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Navigate, useLocation } from 'react-router-dom'
import { LegalPageKey, legalPages } from './legalContent'

const LegalPage = () => {
  const { pathname } = useLocation()
  const page = pathname === '/privacy-policy' ? 'privacy' : pathname === '/data-protection' ? 'data-protection' : 'terms'
  const legalPage = legalPages[page as LegalPageKey]
  const heroSlides = [startupSlide1, startupSlide2]

  if (!legalPage) {
    return <Navigate to="/terms" replace />
  }

  return (
    <>
      <NavTopBar isDark />
      <section className="section feature-page-hero">
        <div className="feature-page-hero-slider" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              className="feature-page-hero-slide"
              key={`${slide}-${index}`}
              style={
                {
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.72)), url(${slide})`,
                  animationDelay: `${index * 5}s`,
                  '--slide-count': heroSlides.length,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <p className="d-flex align-items-center justify-content-center mb-4">
                <span className="icon bg-primary rounded d-flex justify-content-center align-items-center">
                  <IconifyIcon icon="tabler:file-certificate" className="text-white f-18" />
                </span>
                <IconifyIcon icon="tabler:line-dashed" className="text-primary fs-5" />
                <span className="badge bg-white border text-primary py-2 px-3 f-14">{legalPage.badge}</span>
              </p>
              <h1 className="text-dark fw-semibold">{legalPage.title}</h1>
              <p className="text-muted f-16 mb-0">{legalPage.summary}</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
              <Card className="feature-article-card border-0">
                <CardBody className="p-4 p-lg-5">
                  <p className="dashboard-kicker mb-3">ThinkSchool App</p>
                  {legalPage.sections.map((section) => (
                    <div className="legal-section" key={section.title}>
                      <h4 className="text-dark mb-3">{section.title}</h4>
                      <p className="text-muted mb-0">{section.body}</p>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default LegalPage
