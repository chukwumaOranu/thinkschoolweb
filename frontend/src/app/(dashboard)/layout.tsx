import { dashboardResources, groupMeta, type ResourceGroup } from './config'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import logoDark from '@/assets/images/logo-dark.png'
import { useHeaderContent } from '@/hooks/useHeaderContent'
import { resolveAssetUrl } from '@/services/contentApi'
import { useAuthStore } from '@/stores/authStore'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

const sidebarGroups = (Object.entries(groupMeta) as [ResourceGroup, (typeof groupMeta)[ResourceGroup]][]).map(
  ([key, meta]) => ({
    key,
    ...meta,
    resources: dashboardResources.filter((r) => r.group === key),
  }),
)

const DashboardLayout = () => {
  const navigate = useNavigate()
  const clearSession = useAuthStore((state) => state.clearSession)
  const user = useAuthStore((state) => state.user)
  const { data: headerContent } = useHeaderContent()
  const headerSettings = headerContent?.settings
  const dashboardLogo = resolveAssetUrl(headerSettings?.logo_dark_url) || resolveAssetUrl(headerSettings?.logo_light_url) || logoDark
  const logoAlt = headerSettings?.logo_alt || 'ThinkSchool'

  const initials = (user?.username ?? 'U').slice(0, 2).toUpperCase()

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <div className="dashboard-shell">
      <Navbar className="dashboard-topbar px-0">
        <Container fluid="lg" className="gap-3">
          <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center">
            <img src={dashboardLogo} alt={logoAlt} className="dashboard-brand-logo" />
          </Navbar.Brand>
          <div className="ms-auto d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <div className="dashboard-user-avatar" aria-hidden="true">{initials}</div>
              <span className="text-muted small d-none d-sm-inline">{user?.username}</span>
            </div>
            <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </Container>
      </Navbar>

      <Container fluid="lg" className="py-4">
        <div className="dashboard-grid">
          <aside className="dashboard-sidebar">
            <Nav className="flex-column">
              <Nav.Link as={NavLink} to="/dashboard" end className="dashboard-nav-overview">
                <IconifyIcon icon="tabler:layout-dashboard" />
                Overview
              </Nav.Link>
            </Nav>

            {sidebarGroups.map((group) => (
              <div key={group.key} className="dashboard-nav-section" data-group={group.key}>
                <p className="dashboard-nav-section-label">{group.label}</p>
                <Nav className="flex-column">
                  {group.resources.map((resource) => (
                    <Nav.Link key={resource.key} as={NavLink} to={resource.path}>
                      <IconifyIcon icon={resource.icon} />
                      {resource.title}
                    </Nav.Link>
                  ))}
                </Nav>
              </div>
            ))}
          </aside>

          <main className="flex-grow-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </Container>
    </div>
  )
}

export default DashboardLayout
