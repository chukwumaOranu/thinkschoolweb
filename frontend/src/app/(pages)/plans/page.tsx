import startupSlide1 from '@/assets/images/startup-slide-1.png'
import startupSlide2 from '@/assets/images/startup-slide-2.png'
import ContactUs from '@/components/ContactUs'
import NavTopBar from '@/components/navTopbar/NavTopBar'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { CSSProperties } from 'react'
import { Badge, Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const plans = [
  {
    id: 1,
    name: 'Startup Package',
    anchor: 'startup-package',
    intro: [
      'The Startup Package is designed for schools seeking a simple and efficient way to digitize their core academic operations. This package provides essential tools for managing academic records and user accounts, making it ideal for small and growing institutions beginning their digital transformation journey.',
      'Schools can efficiently organize student information, manage classes and academic records, assign user roles, and maintain secure access for administrators, teachers, and students. The Startup Package helps reduce paperwork, improve record accuracy, and establish a strong digital foundation for school management.',
    ],
    features: [
      'Academic Records Management',
      'Student Registration',
      'Class & Subject Management',
      'Result & Report Management',
      'User Management',
      'Role-Based Access Control',
      'Secure Data Storage',
      'Basic Reporting Tools',
    ],
    closing: 'Perfect for schools looking for an affordable and reliable entry-level management solution.',
    billing_note: 'Quoted after school needs review',
    badge_label: null,
    theme: 'info',
  },
  {
    id: 2,
    name: 'Standard Package',
    anchor: 'standard-package',
    intro: [
      'The Standard Package is built for institutions that require more advanced academic management and digital examination capabilities. In addition to all Startup Package features, this package includes a fully integrated Computer Based Testing (CBT) system that modernizes the examination process and improves assessment efficiency.',
      'Schools can create online examinations, manage question banks, automate grading, and generate examination reports seamlessly. The Standard Package enhances academic administration while introducing a smarter, technology-driven learning and assessment environment for both students and teachers.',
    ],
    features: [
      'All Startup Package Features',
      'Computer Based Testing (CBT)',
      'Online Examinations',
      'Automated Result Processing',
      'Question Bank Management',
      'Examination Scheduling',
      'Instant Result Generation',
      'Performance Analytics & Reports',
    ],
    closing: 'Ideal for schools seeking improved examination management and enhanced academic automation.',
    billing_note: 'Best for full institution deployment',
    badge_label: null,
    theme: 'primary',
  },
  {
    id: 3,
    name: 'Premium Package',
    anchor: 'premium-package',
    intro: [
      'The Premium Package is the complete all-in-one school management solution designed for institutions that want full digital control over both academic and administrative operations. This package provides access to every feature available within the ThinkSchool platform, enabling schools to manage all departments from a single integrated system.',
      'From academics, CBT, attendance tracking, fees management, payroll, inventory, medical reports, and examination records to advanced reporting and user management, the Premium Package delivers a comprehensive and scalable solution for modern educational institutions.',
      'With powerful automation, centralized data management, and real-time operational insights, schools can improve productivity, transparency, communication, and decision-making across the entire institution.',
    ],
    features: [
      'All Standard Package Features',
      'Attendance Management',
      'Fees Management',
      'Payroll System',
      'Inventory Management',
      'Medical Report Management',
      'Advanced Reporting & Analytics',
      'Multi-Department Administration',
      'Full School Automation',
      'Priority Support & System Updates',
    ],
    closing: 'Perfect for schools that require a complete enterprise-level education management system.',
    billing_note: 'Advanced rollout and ongoing support',
    badge_label: 'Popular',
    theme: 'info',
  },
]

const heroSlides = [startupSlide1, startupSlide2]

const PlansPage = () => {
  return (
    <>
      <NavTopBar isDark />
      <section className="section feature-page-hero plans-page-hero">
        <div className="feature-page-hero-slider" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              className="feature-page-hero-slide"
              key={slide}
              style={
                {
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.72)), url(${slide})`,
                  animationDelay: `${index * 5}s`,
                  '--slide-count': heroSlides.length,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <p className="d-flex align-items-center justify-content-center mb-4">
                <span className="icon bg-primary rounded d-flex justify-content-center align-items-center">
                  <IconifyIcon icon="tabler:receipt-2" className="text-white f-18" />
                </span>
                <IconifyIcon icon="tabler:line-dashed" className="text-primary fs-5" />
                <span className="badge bg-white border text-primary py-2 px-3 f-14">Plans</span>
              </p>
              <h1 className="text-dark fw-semibold">Choose The Right ThinkSchool Package</h1>
              <p className="text-muted f-16 mb-0">
                Compare Startup, Standard, and Premium packages, then request a guided demo for the package that fits your school.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={7}>
              <p className="dashboard-kicker mb-2">Plan Details</p>
              <h3 className="text-dark">Built around your school size, workflow, and rollout needs</h3>
              <p className="text-muted mb-0">
                Each package gives your institution a clear starting point, from core academic records to full school automation.
              </p>
            </Col>
          </Row>
          <Row className="g-4 align-items-stretch">
            {plans.map((plan, index) => {
              const theme = plan.theme === 'primary' ? 'primary' : 'info'

              return (
                <Col lg={4} key={plan.id || plan.name}>
                  <Card id={plan.anchor} className={`plans-detail-card h-100 border-0 border-top border-4 border-${theme}`}>
                    <CardBody>
                      <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                        <div>
                          <p className="dashboard-kicker mb-1">Plan {index + 1}</p>
                          <h4 className={`text-${theme} mb-0`}>{plan.name}</h4>
                        </div>
                        {plan.badge_label && <Badge bg={theme}>{plan.badge_label}</Badge>}
                      </div>
                      {plan.intro.map((paragraph) => (
                        <p className="text-muted" key={paragraph}>
                          {paragraph}
                        </p>
                      ))}
                      <div className="plans-billing-box mb-4">
                        <p className="dashboard-kicker mb-1">Billing</p>
                        <h5 className="text-dark mb-0">{plan.billing_note || 'Quoted after school needs review'}</h5>
                      </div>
                      <h6 className="text-dark mb-3">Features Included:</h6>
                      <ul className="plans-feature-list">
                        {plan.features.map((feature) => (
                          <li key={`${plan.name}-${feature}`}>
                            <span className="icon-bg text-primary rounded d-flex justify-content-center align-items-center flex-shrink-0">
                              <IconifyIcon icon="tabler:circle-check" className="fs-4" />
                            </span>
                            <span className="text-muted">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-dark fw-semibold mt-4 mb-0">{plan.closing}</p>
                      <Button as={Link as any} to="/plans#contact" className="w-100 mt-4">
                        Request Demo
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      </section>

      <ContactUs />
    </>
  )
}

export default PlansPage
