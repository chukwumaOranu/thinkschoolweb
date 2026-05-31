import startupSlide1 from '@/assets/images/startup-slide-1.png'
import startupSlide2 from '@/assets/images/startup-slide-2.png'
import NavTopBar from '@/components/navTopbar/NavTopBar'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useFeatureContent } from '@/hooks/useFeaturesContent'
import { resolveAssetUrl } from '@/services/contentApi'
import { CSSProperties } from 'react'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { Link, Navigate, useParams } from 'react-router-dom'

const FeaturePost = () => {
  const { slug = '' } = useParams()
  const { data, isError, isLoading } = useFeatureContent(slug)
  const article = data?.article
  const updates = data?.updates || []
  const bannerSlides = [resolveAssetUrl(article?.image_url)].filter(Boolean)
  const heroSlides = bannerSlides.length ? bannerSlides : [startupSlide1, startupSlide2]

  if (isError) {
    return <Navigate to="/features" replace />
  }

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
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${slide})`,
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
                  <IconifyIcon icon={article?.icon || 'tabler:article'} className="text-white f-18" />
                </span>
                <IconifyIcon icon="tabler:line-dashed" className="text-primary fs-5" />
                <span className="badge bg-white border text-primary py-2 px-3 f-14">Feature Post</span>
              </p>
              <h1 className="text-dark fw-semibold">{isLoading ? 'Loading feature...' : article?.title}</h1>
              <p className="text-muted f-16 mb-0">{article?.excerpt}</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="feature-article-card border-0">
                {article?.image_url && <img src={resolveAssetUrl(article.image_url)} alt={article.title} className="feature-post-image" />}
                <CardBody className="p-4 p-lg-5">
                  {article?.published_at && <p className="dashboard-kicker mb-3">{article.published_at}</p>}
                  <div className="feature-post-content text-muted">
                    {(article?.content || '').split('\n').map((paragraph, index) => (
                      <p key={`${paragraph}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button as={Link as any} to="/features">
                      Back To Features
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {!!updates.length && (
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
                    <span className="badge bg-white border text-primary py-2 px-3 f-14">Related Features</span>
                  </p>
                  <h3 className="text-dark">Related modules and updates</h3>
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
      )}
    </>
  )
}

export default FeaturePost
