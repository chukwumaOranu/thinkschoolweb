import { Col, Container, Row } from 'react-bootstrap'

const ActionBox2 = () => {
  return (
    <section className="section-sm bg-primary bg-shape">
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col lg={5}>
            <div className="title text-white">
              <h3>Stay up to date with ThinkSchool</h3>
              <p className="text-light mb-0">
                Get product updates, implementation notes, and school management insights from the ThinkSchool team.
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="subscribe">
              <form>
                <Row className="justify-content-end g-3">
                  <Col md={8}>
                    <p className="text-white mb-4">Join Our Mailing List</p>
                    <div>
                      <input type="text" className="form-control rounded-pill" placeholder="Enter your E-mail address" />
                    </div>
                  </Col>
                  <Col md={8}>
                    <div>
                      <button type="submit" className="btn btn-outline-light w-100">
                        Subscribe
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ActionBox2
