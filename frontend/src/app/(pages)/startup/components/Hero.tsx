import bgImg3 from '@/assets/images/bg-img-3.png'
import google from '@/assets/images/google.png'
import linkedin from '@/assets/images/linkedin.png'
import userImg from '@/assets/images/user-msg.png'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="bg-home-2 pb-0" id="home">
      <div className="home-center">
        <div className="home-desc-center">
          <Container>
            <Row className="align-items-center justify-content-between">
              <Col lg={6}>
                <div>
                  <h5 className="mb-3 text-dark">Introduction to ThinkSchool App</h5>
                  <h1 className="text-dark display-6 fw-semibold lh-base">
                    Transform School Management With <span className="text-primary"> ThinkSchoolApp </span>
                  </h1>
                  <p className="mt-4 text-muted f-16 text-dark">
                    ThinkSchoolApp is an advanced all-in-one school management solution built to simplify, automate, and transform the daily operations
                    of modern educational institutions.
                  </p>
                  <Row className="align-items-center justify-content-start mt-2 g-3">
                    <Col lg={6}>
                      <div className="d-flex align-items-center gap-3">
                        <img src={google} alt="google" className="img-fluid" height={40} width={40} />
                        <div>
                          <div className="d-flex align-items-center">
                            <h4 className="text-dark fw-bold m-0">4.5</h4>
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
                          <p className="mt-1 mb-0 text-muted text-dark">Reliable School Operations</p>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="d-flex align-items-center gap-3">
                        <img src={linkedin} alt="linkedin" className="img-fluid" height={40} width={40} />
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h4 className="text-dark fw-bold m-0">4.7</h4>
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
                          <p className="mt-1 mb-0 text-muted text-dark">Built For Modern Institutions</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="main-btn mt-5">
                    <Button as={Link as any} to="/plans#contact" variant="primary">
                      Request a Demo
                    </Button>
                    &nbsp;
                    <Button as={Link as any} to="/#contact" variant="info" className="ms-1">
                      Contact Sales
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="main-top-img">
                  <img src={bgImg3} alt="bgImg3" className="img-fluid" />
                  <img src={userImg} alt="userImg" className="chat-img" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  )
}

export default Hero
