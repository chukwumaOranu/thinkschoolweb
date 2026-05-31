import { AdminRecord, createAdminResource, deleteAdminResource, listAdminResource, updateAdminResource } from '@/services/adminApi'
import { uploadImage } from '@/services/uploadApi'
import { useAuthStore } from '@/stores/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useMemo, useState } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Alert, Button, Card, CardBody, Form, Table } from 'react-bootstrap'
import { DashboardResource } from './config'

const defaultValue = (type?: string) => (type === 'checkbox' ? true : type === 'number' ? 0 : '')

const getUploadPreset = (resourceKey: string, fieldName: string) => {
  if (resourceKey === 'headerSettings') return 'logo'
  if (resourceKey === 'featureArticles') return 'general'
  if (resourceKey === 'testimonials') return 'testimonial'
  if (resourceKey === 'teamMembers') return 'team'
  if (resourceKey === 'pricingPlanImages') return 'avatar'
  if (fieldName.includes('icon')) return 'icon'
  if (fieldName.includes('logo')) return 'logo'
  if (fieldName.includes('avatar')) return 'avatar'
  if (fieldName.includes('image')) return 'general'
  return 'general'
}

const isUploadField = (resourceKey: string, fieldName: string) => {
  if (resourceKey === 'headerSettings') return fieldName === 'logo_light_url' || fieldName === 'logo_dark_url'
  if (resourceKey === 'featureArticles') return fieldName === 'image_url'
  if (resourceKey === 'testimonials' || resourceKey === 'teamMembers' || resourceKey === 'pricingPlanImages') return fieldName === 'image_url'
  return fieldName.includes('image') || fieldName.includes('avatar') || fieldName.includes('logo')
}

const normalizePayload = (resource: DashboardResource, form: AdminRecord) =>
  resource.fields.reduce<AdminRecord>((payload, field) => {
    const value = form[field.name]

    if (field.type === 'number') {
      payload[field.name] = value === '' || value === null ? null : Number(value)
    } else if (field.type === 'checkbox') {
      payload[field.name] = Boolean(value) ? 1 : 0
    } else {
      payload[field.name] = value ?? ''
    }

    return payload
  }, {})

const ResourcePage = ({ resource }: { resource: DashboardResource }) => {
  const token = useAuthStore((state) => state.token)
  const queryClient = useQueryClient()
  const blankForm = useMemo(
    () => Object.fromEntries(resource.fields.map((field) => [field.name, defaultValue(field.type)])) as AdminRecord,
    [resource],
  )
  const [form, setForm] = useState<AdminRecord>(blankForm)
  const [editingId, setEditingId] = useState<number | string | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  const query = useQuery({
    queryKey: ['admin', resource.key],
    queryFn: () => listAdminResource(resource.key, token),
    enabled: Boolean(token),
  })

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = normalizePayload(resource, form)
      return editingId ? updateAdminResource(resource.key, editingId, payload, token) : createAdminResource(resource.key, payload, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', resource.key] })
      setForm(blankForm)
      setEditingId(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => deleteAdminResource(resource.key, id, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', resource.key] }),
  })

  const handleUpload = async (fieldName: string, file?: File) => {
    if (!file) return

    setUploadingField(fieldName)

    try {
      const result = await uploadImage(getUploadPreset(resource.key, fieldName), file, token)
      setForm((current) => ({ ...current, [fieldName]: result.file.path }))
    } finally {
      setUploadingField(null)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveMutation.mutate()
  }

  const handleEdit = (item: AdminRecord) => {
    setEditingId(item.id as number)
    setForm({
      ...blankForm,
      ...Object.fromEntries(resource.fields.map((field) => [field.name, field.type === 'checkbox' ? Boolean(item[field.name]) : item[field.name] ?? defaultValue(field.type)])),
    })
  }

  return (
    <>
      <div className="mb-4">
        <p className="dashboard-kicker mb-2">Manage Section</p>
        <div className="d-flex align-items-center gap-3">
          <span className="dashboard-icon">
            <IconifyIcon icon={resource.icon} />
          </span>
          <div>
            <h3 className="mb-1 text-dark">{resource.title}</h3>
            <p className="text-muted mb-0">{resource.description}</p>
          </div>
        </div>
      </div>
      <Card className="dashboard-panel border-0 mb-4">
        <CardBody>
          <h5 className="text-dark mb-3">{editingId ? 'Edit Record' : 'Create Record'}</h5>
          {saveMutation.isError && <Alert variant="danger">{saveMutation.error.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="dashboard-form-grid">
              {resource.fields.map((field) => (
                <div className={field.type === 'textarea' ? 'span-full' : undefined} key={field.name}>
                  <Form.Group controlId={`${resource.key}-${field.name}`}>
                    <Form.Label>{field.label}</Form.Label>
                    {field.type === 'textarea' ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={String(form[field.name] ?? '')}
                        required={field.required}
                        onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                      />
                    ) : field.type === 'checkbox' ? (
                      <Form.Check
                        type="switch"
                        checked={Boolean(form[field.name])}
                        label="Enabled"
                        onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.checked }))}
                      />
                    ) : isUploadField(resource.key, field.name) ? (
                      <>
                        <Form.Control
                          type="text"
                          value={String(form[field.name] ?? '')}
                          required={field.required}
                          onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                        />
                        <div className="d-flex align-items-center gap-2 mt-2">
                          <Form.Control
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={(event) => handleUpload(field.name, (event.currentTarget as HTMLInputElement).files?.[0])}
                          />
                          {uploadingField === field.name && <span className="text-muted small">Uploading...</span>}
                        </div>
                      </>
                    ) : (
                      <Form.Control
                        type={field.type || 'text'}
                        value={String(form[field.name] ?? '')}
                        required={field.required}
                        onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}
                      />
                    )}
                  </Form.Group>
                </div>
              ))}
            </div>
            <div className="d-flex gap-2 mt-4">
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => {
                    setEditingId(null)
                    setForm(blankForm)
                  }}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </CardBody>
      </Card>
      <Card className="dashboard-panel border-0">
        <CardBody>
          <div className="table-responsive">
            <Table hover className="dashboard-table align-middle mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  {resource.fields.slice(0, 4).map((field) => (
                    <th key={field.name}>{field.label}</th>
                  ))}
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {query.data?.items.map((item) => (
                  <tr key={String(item.id)}>
                    <td>{String(item.id)}</td>
                    {resource.fields.slice(0, 4).map((field) => (
                      <td key={field.name} className="text-truncate" style={{ maxWidth: 220 }}>
                        {String(item[field.name] ?? '')}
                      </td>
                    ))}
                    <td className="text-end">
                      <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEdit(item)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => deleteMutation.mutate(item.id as number)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {!query.data?.items.length && (
                  <tr>
                    <td colSpan={resource.fields.slice(0, 4).length + 2} className="text-center text-muted py-4">
                      No records yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default ResourcePage
