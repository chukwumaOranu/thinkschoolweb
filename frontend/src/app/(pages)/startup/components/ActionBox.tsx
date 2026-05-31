import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ActionBox = () => {
  return (
    <section className="section-sm bg-dark bg-shape">
      <Container>
        <Row className="justify-content-center">
          <Col md={9}>
            <div className="cta-content text-white mb-3">
              <h4 className="mb-0 mt-2">Ready to simplify school operations with ThinkSchool?</h4>
            </div>
          </Col>
          <Col md={3}>
            <div className="text-lg-end">
              <Button as={Link as any} to="/plans#contact" variant="primary">
                Request a Demo
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ActionBox
