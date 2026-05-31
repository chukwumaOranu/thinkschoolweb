const adminContentService = require('../services/adminContent.service')

const list = async (req, res, next) => {
  try {
    const items = await adminContentService.list(req.params.resource)
    res.json({ items })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const item = await adminContentService.getById(req.params.resource, req.params.id)
    res.json({ item })
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const item = await adminContentService.create(req.params.resource, req.body)
    res.status(201).json({ item })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const item = await adminContentService.update(req.params.resource, req.params.id, req.body)
    res.json({ item })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const result = await adminContentService.remove(req.params.resource, req.params.id)
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const summary = async (_req, res, next) => {
  try {
    const counts = await adminContentService.summary()
    res.json({ counts })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  create,
  getById,
  list,
  remove,
  summary,
  update,
}
