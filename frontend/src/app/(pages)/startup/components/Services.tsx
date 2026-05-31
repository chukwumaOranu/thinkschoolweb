import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useStartupContent } from '@/hooks/useStartupContent'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { servicesData } from '../data'

const Services = () => {
  const { data } = useStartupContent()
  const services = data?.services?.length
    ? data.services.map((service) => ({ icon: service.icon || 'tabler:briefcase', title: service.title, description: service.description }))
    : servicesData

  return (
    <section className="section" id="services">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col lg={6}>
            <p className="d-flex align-items-center mb-4">
              <span className="icon bg-primary rounded d-flex justify-content-center align-items-center">
                <IconifyIcon icon="tabler:devices-cog" className="text-white f-18" />
              </span>
              <IconifyIcon icon="tabler:line-dashed" className="text-primary fs-5" />
              <span className="badge bg-light border text-primary py-2 px-3 f-14">Our Services </span>
            </p>
            <h3>Product Services Built For Schools</h3>
            <p className="mb-0 text-muted">
              ThinkSchool brings the core academic, financial, administrative, and student support tools into one connected platform.
            </p>
          </Col>
          <Col lg={3}>
            <Button as={Link as any} to="/features" variant="primary">
              <IconifyIcon icon="tabler:sparkles" className="me-2 align-middle" />
              See More Added Features
            </Button>
          </Col>
        </Row>
        <hr className="my-5 border" />
        <Row className="g-4">
          {services.map((item, idx) => {
            return (
              <Col lg={4} key={idx}>
                <div className="d-flex gap-3 mb-3">
                  <span className="icon-lg text-primary rounded d-flex justify-content-center align-items-center flex-shrink-0">
                    <IconifyIcon icon={item.icon} className="fs-2" />
                  </span>
                  <div>
                    <p className="mb-1 fw-semibold f-18">{item.title}</p>
                    <p className="mb-0 f-15 text-muted">{item.description}</p>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

export default Services
