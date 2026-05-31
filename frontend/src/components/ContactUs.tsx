import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useStartupContent } from '@/hooks/useStartupContent'
import { submitContact } from '@/services/contentApi'
import { useMutation } from '@tanstack/react-query'
import { FormEvent } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'

const planOptions = ['Start up', 'Standard', 'Premium']

const ContactUs = () => {
  const { data } = useStartupContent()
  const contact = data?.contactSettings
  const plans = data?.pricingPlans?.length ? data.pricingPlans.map((plan) => plan.name) : planOptions
  const contactMutation = useMutation({
    mutationFn: submitContact,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    contactMutation.mutate({
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      plan: String(formData.get('plan') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || ''),
    })

    event.currentTarget.reset()
  }

  return (
    <section className="section bg-light" id="contact">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={6}>
            <p className="d-flex align-items-center justify-content-center mb-4">
              <span className="icon bg-primary rounded d-flex justify-content-center align-items-center">
                <IconifyIcon icon="tabler:address-book" className="text-white f-18" />
              </span>
              <IconifyIcon icon="tabler:line-dashed" className="text-dark fs-5" />
              <span className="badge bg-light border text-primary py-2 px-3 f-14">Contact</span>
            </p>
            <h3 className="text-dark">{contact?.heading || 'Contact Us'}</h3>
            <p className="text-muted">
              {contact?.description || 'We are here to help you explore ThinkSchool, request a demo, or discuss the right plan for your institution.'}
            </p>
          </Col>
        </Row>
        <Row className="mt-5 align-items-center">
          <Col lg={4}>
            <Card className="bg-primary bg-shape border-0 mb-3">
              <CardBody>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="icon-bg bg-light text-primary rounded d-flex justify-content-center align-items-center border border-primary">
                    <IconifyIcon icon="tabler:phone-call" className="fs-4" />
                  </span>
                  <p className="mb-0 fw-semibold f-16 text-white">{contact?.phone_label || 'Call Us Directly At'}</p>
                </div>
                <h5 className="text-white mt-4 mb-5">{contact?.phone || '+2348035089474'}</h5>
                <Button variant="light" size="sm" className="w-100">
                  Contact Us
                </Button>
              </CardBody>
            </Card>
            <Card className="border-0">
              <CardBody>
                <div className="d-flex align-items-center gap-3">
                  <span className="icon-bg bg-light text-primary rounded d-flex justify-content-center align-items-center border border-primary">
                    <IconifyIcon icon="tabler:mail" className="fs-4" />
                  </span>
                  <p className="mb-0 fw-semibold f-16 text-muted">{contact?.email_label || 'Email Our Team'}</p>
                </div>
                <h5 className="text-dark mt-4 mb-5">{contact?.email || 'info@thinkschoolapps.co.uk'}</h5>
                <Button variant="primary" size="sm" className="w-100">
                  Contact Us
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col lg={8}>
            <div className="custom-form p-3">
              <form onSubmit={handleSubmit}>
                <h6 className="mb-4">Send Details</h6>
                {contactMutation.isSuccess && <Alert variant="success">Thanks. Your message has been sent.</Alert>}
                {contactMutation.isError && <Alert variant="danger">{contactMutation.error.message}</Alert>}
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <input name="name" id="name" type="text" className="form-control border" placeholder="Name" required />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <input name="email" id="email" type="email" className="form-control border" placeholder="Email" required />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <select name="plan" id="plan" className="form-control border" required defaultValue="">
                        <option value="" disabled>
                          Select plan
                        </option>
                        {plans.map((plan) => (
                          <option value={plan} key={plan}>
                            {plan}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <input name="subject" type="text" className="form-control border" id="subject" placeholder="Subject" required />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="mb-3">
                      <textarea
                        name="message"
                        id="message"
                        rows={8}
                        className="form-control border"
                        required
                        placeholder="Message"
                        defaultValue={''}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <button type="submit" className="btn btn-primary" disabled={contactMutation.isPending}>
                      {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                    </button>
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

export default ContactUs
