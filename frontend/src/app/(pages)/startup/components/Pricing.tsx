import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useStartupContent } from '@/hooks/useStartupContent'
import { Button, Card, CardBody, CardFooter, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Pricing = () => {
  const { data } = useStartupContent()
  const fallbackPlans = [
    {
      id: 1,
      name: 'Start up',
      description: 'A focused rollout for schools beginning with core records, attendance, academics, and users.',
      billing_note: 'Quoted after school needs review',
      button_label: 'Request Quote',
      button_url: '#contact',
      badge_label: null,
      theme: 'info',
      images: [],
    },
    {
      id: 2,
      name: 'Standard',
      description: 'A broader package for schools ready to manage academic, finance, attendance, user, and reporting workflows.',
      billing_note: 'Best for full institution deployment',
      button_label: 'Request Demo',
      button_url: '#contact',
      badge_label: null,
      theme: 'primary',
      images: [],
    },
    {
      id: 3,
      name: 'Premium',
      description: 'Full institution support with advanced modules, guided implementation, staff training, reporting, and ongoing support.',
      billing_note: 'Advanced rollout and ongoing support',
      button_label: 'Contact Us',
      button_url: '#contact',
      badge_label: 'Popular',
      theme: 'info',
      images: [],
    },
  ]
  const plans = data?.pricingPlans?.length ? data.pricingPlans : fallbackPlans

  return (
    <section className="section pricing-section-2" id="pricing">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={7}>
            <p className="d-flex align-items-center justify-content-center mb-4">
              <span className="icon bg-primary rounded d-flex justify-content-center align-items-center">
                <IconifyIcon icon="tabler:receipt-2" className="text-white f-18" />
              </span>
              <IconifyIcon icon="tabler:line-dashed" className="text-dark fs-5" />
              <span className="badge bg-light border text-primary py-2 px-3 f-14">Pricing</span>
            </p>
            <h3 className="text-dark">Choose A Plan For Your Institution</h3>
            <p className="text-muted">Flexible plans for schools that want to digitize, expand, and scale their operations with ThinkSchool.</p>
          </Col>
        </Row>
        <Row className="mt-4 g-4 align-items-end">
          {plans.slice(0, 3).map((plan) => {
            const theme = plan.theme === 'primary' ? 'primary' : 'info'

            return (
              <Col lg={4} key={plan.id || plan.name}>
                <Card className={`border-top border-0 border-4 border-${theme} shadow-sm bg-light-subtle h-100`}>
                  <CardBody>
                    <div>
                      <h5 className={`mb-2 text-${theme}`}>{plan.name}</h5>
                      <span className="text-muted">{plan.description}</span>
                    </div>
                    <div className="price-number my-4">
                      <h5 className="fw-bold m-0 text-dark">Billing</h5>
                      <div className="mt-2">
                        <p className="text-muted mb-0">{plan.billing_note}</p>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="border-0 mt-5">
                    <Button as={Link as any} to="/plans" variant={theme} className="w-100">
                      {plan.button_label || 'Contact Us'}
                    </Button>
                  </CardFooter>
                  {plan.badge_label && (
                    <span className={`badge bg-${theme} px-2 py-1 f-14 text-white position-absolute top-0 end-0 rounded-top-0 rounded-end-0`}>
                      {plan.badge_label}
                    </span>
                  )}
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

export default Pricing
