import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useStartupContent } from '@/hooks/useStartupContent'
import { resolveAssetUrl } from '@/services/contentApi'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { testimonialData, TestimonialType } from '../data'

const TestimonialCard = ({ description, image, name, role, star }: TestimonialType) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardBody>
        <Row className="justify-content-between">
          <Col lg={4}>
            <img src={image} alt="avatar" className="img-fluid rounded" height={150} width={150} />
          </Col>
          <Col lg={8}>
            <div className="d-flex gap-4">
              <Link to="" className="text-dark fw-semibold">
                {name}
              </Link>
              <span className="text-muted">|</span>
              <span className="text-muted f-14">{role}</span>
            </div>
            <div className="d-flex align-items-center gap-2 my-2">
              <h4 className="text-muted fw-semibold m-0">{star}</h4>
              <ul className="p-0 m-0 ms-2 fs-6 d-flex text-warning">
                <li>
                  <IconifyIcon icon="tabler:star-filled" />
                </li>
                <li>
                  <IconifyIcon icon="tabler:star-filled" />
                </li>
                <li>
                  <IconifyIcon icon="tabler:star-filled" />
                </li>
                <li>
                  <IconifyIcon icon="tabler:star-filled" />
                </li>
                <li>
                  <IconifyIcon icon="tabler:star-half-filled" />
                </li>
              </ul>
            </div>
            <p className="mb-0 text-muted">{description}</p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const Testimonial = () => {
  const { data } = useStartupContent()
  const testimonials = data?.testimonials?.length
    ? data.testimonials.map((testimonial, index) => ({
        image: resolveAssetUrl(testimonial.image_url) || testimonialData[index % testimonialData.length].image,
        name: testimonial.name,
        description: testimonial.description,
        role: testimonial.role || '',
        star: Number(testimonial.rating),
      }))
    : testimonialData

  return (
    <section className="section bg-light" id="testimonial">
      <Container>
        <Row className="justify-content-center">
          <Col lg={7}>
            <div className="title text-center mb-5">
              <p className="d-flex align-items-center justify-content-center mb-4">
                <span className="icon bg-primary rounded d-flex justify-content-center align-items-center">
                  <IconifyIcon icon="tabler:messages" className="text-white f-18" />
                </span>
                <IconifyIcon icon="tabler:line-dashed" className="text-primary fs-5" />
                <span className="badge bg-light border text-primary py-2 px-3 f-14">Testimonial</span>
              </p>
              <h3>Built Around The People Who Run Schools</h3>
              <p className="text-muted">
                Temporary feedback examples for administrators, teachers, accountants, and parents ahead of live testimonial management.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="g-3">
          {testimonials.map((item, idx) => {
            return (
              <Col lg={6} key={idx}>
                <TestimonialCard {...item} />
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

export default Testimonial
