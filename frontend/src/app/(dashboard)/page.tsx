import { getAdminSummary } from '@/services/adminApi'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { dashboardResources, groupMeta, type ResourceGroup } from './config'

const Dashboard = () => {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)

  const summaryQuery = useQuery({
    queryKey: ['admin', 'summary'],
    queryFn: () => getAdminSummary(token),
    enabled: Boolean(token),
  })

  const counts = summaryQuery.data?.counts ?? {}

  return (
    <Container fluid className="p-0">
      <div className="dashboard-welcome mb-5">
        <p className="dashboard-kicker mb-1">Content Management</p>
        <h2 className="mb-1 fw-bold text-dark">Dashboard</h2>
        <p className="text-muted mb-0">
          Welcome back, <strong>{user?.username}</strong>. Manage your site content below.
        </p>
      </div>

      {(Object.entries(groupMeta) as [ResourceGroup, (typeof groupMeta)[ResourceGroup]][]).map(([groupKey, meta]) => {
        const resources = dashboardResources.filter((r) => r.group === groupKey)
        if (!resources.length) return null

        return (
          <div key={groupKey} className="dashboard-resource-group mb-5" data-group={groupKey}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="dashboard-group-icon">
                <IconifyIcon icon={meta.icon} />
              </span>
              <h6 className="mb-0 fw-bold text-dark">{meta.label}</h6>
            </div>
            <Row className="g-3">
              {resources.map((resource) => (
                <Col lg={4} md={6} key={resource.key}>
                  <Link to={resource.path} className="dashboard-resource-card d-flex flex-column">
                    <div className="dashboard-resource-card__header">
                      <span className="dashboard-resource-card__icon">
                        <IconifyIcon icon={resource.icon} />
                      </span>
                      <span className="dashboard-resource-card__count">{counts[resource.key] ?? 0}</span>
                    </div>
                    <h5 className="dashboard-resource-card__title">{resource.title}</h5>
                    <p className="dashboard-resource-card__desc">{resource.description}</p>
                    <span className="dashboard-resource-card__action">
                      Manage <IconifyIcon icon="tabler:arrow-right" />
                    </span>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )
      })}
    </Container>
  )
}

export default Dashboard
