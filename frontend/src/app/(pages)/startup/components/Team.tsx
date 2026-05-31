import IconifyIcon from '@/components/wrappers/IconifyIcon'
import user1Img from '@/assets/images/team/user-1.jpg'
import user4Img from '@/assets/images/team/user-4.jpg'
import { useStartupContent } from '@/hooks/useStartupContent'
import { resolveAssetUrl } from '@/services/contentApi'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Team = () => {
  const { data } = useStartupContent()
  const fallbackMembers = [
    {
      image_url: user1Img,
      name: 'Product Implementation',
      role: 'Onboarding & training',
      twitter_url: '',
      facebook_url: '',
      linkedin_url: '',
    },
    {
      image_url: user4Img,
      name: 'Customer Support',
      role: 'Schools success',
      twitter_url: '',
      facebook_url: '',
      linkedin_url: '',
    },
  ]
  const members = data?.teamMembers?.length ? data.teamMembers : fallbackMembers

  return (
    <section className="section bg-light" id="team">
      <Container>
        <Row className="align-items-center">
          <Col lg={5}>
            <p className="d-flex align-items-center mb-4">
              <span className="icon bg-primary rounded d-flex justify-content-center align-items-center">
                <IconifyIcon icon="tabler:users-group" className="text-white f-18" />
              </span>
              <IconifyIcon icon="tabler:line-dashed" className="text-primary fs-5" />
              <span className="badge bg-light border text-primary py-2 px-3 f-14">Team</span>
            </p>
            <h3 className="lh-base">A Product Team Focused On School Operations</h3>
            <p className="text-muted mb-4">
              Our team works across product strategy, implementation, support, and training to help schools adopt ThinkSchool with confidence.
            </p>
            <Button variant="primary">Meet The Team</Button>
          </Col>
          <Col lg={6} className="mt-4 mt-lg-0">
            <Row className="g-3">
              {members.slice(0, 2).map((member) => (
                <Col lg={6} key={`${member.name}-${member.role}`}>
                  <Card className="border-0">
                    <img src={resolveAssetUrl(member.image_url) || user1Img} alt={member.name} className="img-fluid rounded-top" />
                    <CardBody className="bg-primary rounded-bottom bg-shape">
                      <div className="d-flex justify-content-between">
                        <div>
                          <Link to="" className="text-white fw-semibold">
                            {member.name}
                          </Link>
                          <p className="mb-0 mt-1 text-white f-13">({member.role})</p>
                        </div>
                        <div>
                          <div className="d-flex gap-2">
                            <Link to={member.twitter_url || ''}>
                              <IconifyIcon icon="tabler:brand-twitter" className="text-white fs-5" />
                            </Link>
                            <Link to={member.facebook_url || ''}>
                              <IconifyIcon icon="tabler:brand-facebook" className="text-white fs-5" />
                            </Link>
                            <Link to={member.linkedin_url || ''}>
                              <IconifyIcon icon="tabler:brand-linkedin" className="text-white fs-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Team
