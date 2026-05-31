import { Col, Container, Row } from 'react-bootstrap'

const State = () => {
  return (
    <section className="py-5 counter-section bg-primary bg-shape">
      <Container>
        <Row className="align-items-center justify-content-between g-3">
          <Col lg={12}>
            <Row className="align-items-center g-4">
              <Col lg={3}>
                <div className="d-flex align-items-center gap-4">
                  <h2 className="fw-bold text-white mb-0"> 9 </h2>
                  <p className="mb-0 text-white f-16">Core School Modules</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="d-flex align-items-center gap-4">
                  <h2 className="fw-bold text-white mb-0"> 6 </h2>
                  <p className="mb-0 text-white f-16">User Groups Supported</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="d-flex align-items-center gap-4">
                  <h2 className="fw-bold text-white mb-0"> 24/7 </h2>
                  <p className="mb-0 text-white f-16">Digital Access</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="d-flex align-items-center gap-4">
                  <h2 className="fw-bold text-white mb-0"> 1 </h2>
                  <p className="mb-0 text-white f-16">Integrated Platform</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default State
