const publicContentService = require('../services/publicContent.service')

const header = async (_req, res, next) => {
  try {
    const data = await publicContentService.getHeader()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const startup = async (_req, res, next) => {
  try {
    const data = await publicContentService.getStartup()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const features = async (_req, res, next) => {
  try {
    const data = await publicContentService.getFeatures()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const featureBySlug = async (req, res, next) => {
  try {
    const data = await publicContentService.getFeatureBySlug(req.params.slug)
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const submitContact = async (req, res, next) => {
  try {
    const { name, email, plan, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(422).json({ message: 'Name, email, subject, and message are required' })
    }

    const submission = await publicContentService.createContactSubmission({ name, email, plan, subject, message })
    return res.status(201).json({ submission })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  featureBySlug,
  features,
  header,
  startup,
  submitContact,
}
