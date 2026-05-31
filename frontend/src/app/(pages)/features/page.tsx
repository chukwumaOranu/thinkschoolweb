import NavTopBar from '@/components/navTopbar/NavTopBar'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useFeaturesContent } from '@/hooks/useFeaturesContent'
import { resolveAssetUrl } from '@/services/contentApi'
import startupSlide1 from '@/assets/images/startup-slide-1.png'
import startupSlide2 from '@/assets/images/startup-slide-2.png'
import { CSSProperties } from 'react'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const fallbackArticles = [
  {
    id: 1,
    icon: 'tabler:apps',
    title: 'All-in-One School Management Platform',
    slug: 'all-in-one-school-management-platform',
    excerpt: 'Manage academics, examinations, attendance, fees, payroll, inventory, medical records, and CBT from one secure ThinkSchool system.',
    content: '',
    image_url: null,
    published_at: null,
    sort_order: 1,
  },
]

const fallbackUpdates = [
  {
    id: 1,
    feature_article_id: null,
    icon: 'tabler:school',
    title: 'Academics',
    description: 'Manage classes, departments, subjects, sessions, timetables, lesson planning, and teacher allocations.',
    version_label: 'Core Module',
    release_date: null,
    sort_order: 1,
  },
]

const FeaturesPage = () => {
  const { data } = useFeaturesContent()
  const articles = data?.articles?.length ? data.articles : fallbackArticles
  const updates = data?.updates?.length ? data.updates : fallbackUpdates
  const bannerSlides = articles.map((article) => resolveAssetUrl(article.image_url)).filter(Boolean)
  const heroSlides = bannerSlides.length ? bannerSlides : [startupSlide1, startupSlide2]

  return (
    <>
      <NavTopBar isDark />
      <section className="section feature-page-hero">
        <div className="feature-page-hero-slider" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              className={`feature-page-hero-slide ${heroSlides.length === 1 ? 'active' : ''}`}
              key={`${slide}-${index}`}
              style={
                {
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.68)), url(${slide})`,
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
                  <IconifyIcon icon="tabler:sparkles" className="text-white f-18" />
                </span>
                <IconifyIcon icon="tabler:line-dashed" className="text-primary fs-5" />
                <span className="badge bg-white border text-primary py-2 px-3 f-14">Features</span>
              </p>
              <h1 className="text-dark fw-semibold">ThinkSchool Features And Added Updates</h1>
              <p className="text-muted f-16 mb-0">
                A living feature library for the tools that help schools manage academics, records, finance, attendance, payroll, inventory, medical
                reporting, and CBT.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row className="align-items-end justify-content-between mb-4">
            <Col lg={7}>
              <p className="dashboard-kicker mb-2">Feature Articles</p>
              <h3 className="text-dark mb-0">Product notes you can manage from the dashboard</h3>
            </Col>
            <Col lg={3} className="text-lg-end mt-3 mt-lg-0">
              <Button as={Link as any} to="/dashboard/feature-articles">
                Manage Articles
              </Button>
            </Col>
          </Row>
          <Row className="g-4">
            {articles.map((article) => (
              <Col lg={6} key={article.id} id={article.slug} className="feature-anchor-target">
                <Card className="feature-article-card border-0 h-100">
                  {article.image_url && <img src={resolveAssetUrl(article.image_url)} alt={article.title} className="feature-article-image" />}
                  <CardBody>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <span className="icon-bg text-primary rounded d-flex justify-content-center align-items-center flex-shrink-0">
                        <IconifyIcon icon={article.icon || 'tabler:article'} className="fs-4" />
                      </span>
                      <div>
                        <h5 className="mb-1 text-dark">{article.title}</h5>
                        {article.published_at && <p className="mb-0 text-muted f-14">{article.published_at}</p>}
                      </div>
                    </div>
                    <p className="text-muted mb-4">{article.excerpt || article.content}</p>
                    <Link to={`/features/${article.slug}`} className="text-primary fw-semibold">
                      Read feature <IconifyIcon icon="tabler:arrow-narrow-right" className="align-middle" />
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7}>
              <div className="title text-center mb-5">
                <p className="d-flex align-items-center justify-content-center mb-4">
                  <span className="icon bg-primary rounded d-flex justify-content-center align-items-center">
                    <IconifyIcon icon="tabler:playlist-add" className="text-white f-18" />
                  </span>
                  <IconifyIcon icon="tabler:line-dashed" className="text-primary fs-5" />
                  <span className="badge bg-white border text-primary py-2 px-3 f-14">Added Features</span>
                </p>
                <h3 className="text-dark">Modules and updates available in ThinkSchool</h3>
              </div>
            </Col>
          </Row>
          <Row className="g-4">
            {updates.map((update) => (
              <Col lg={4} md={6} key={update.id}>
                <Card className="border-0 h-100 feature-update-card">
                  <CardBody>
                    <div className="d-flex align-items-start gap-3">
                      <span className="icon-lg text-primary rounded d-flex justify-content-center align-items-center flex-shrink-0">
                        <IconifyIcon icon={update.icon || 'tabler:circle-check'} className="fs-2" />
                      </span>
                      <div>
                        {update.version_label && <p className="dashboard-kicker mb-1">{update.version_label}</p>}
                        <h5 className="text-dark mb-2">{update.title}</h5>
                        <p className="text-muted mb-0">{update.description}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default FeaturesPage
