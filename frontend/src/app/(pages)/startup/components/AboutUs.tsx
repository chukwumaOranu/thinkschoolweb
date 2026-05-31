import girlBook from '@/assets/images/girl-book.png'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col, Container, Row } from 'react-bootstrap'

const AboutUs = () => {
  return (
    <section className="section pb-lg-0" id="about">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="img-part">
              <img src={girlBook} alt="girl-book" className="img-fluid" />
            </div>
          </Col>
          <Col lg={6}>
            <p className="d-flex align-items-center mb-4">
              <span className="icon bg-primary rounded d-flex justify-content-center align-items-center">
                <IconifyIcon icon="tabler:info-circle" className="text-white f-18" />
              </span>
              <IconifyIcon icon="tabler:line-dashed" className="text-primary fs-5" />
              <span className="badge bg-light border text-primary py-2 px-3 f-14">About Us </span>
            </p>
            <h3 className="lh-base">A Central Platform For Academic And Administrative Work</h3>
            <p className="text-muted">
              ThinkSchool helps schools replace manual paperwork and disconnected processes with a smart digital system for academics, examinations,
              records, attendance, fees, payroll, inventory, medical reporting, and computer-based testing. It brings administrators, teachers,
              students, parents, accountants, and school staff into one organized environment where daily operations are easier to manage, monitor,
              and report.
            </p>
            <p className="text-muted mb-0">
              With secure role-based access, real-time reporting, and scalable workflows, schools can reduce errors, save time, improve
              communication, and make better decisions from a single trusted platform.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AboutUs
