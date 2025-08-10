const emailTemplateService = require('../services/EmailController');

exports.createTemplate = async (req, res) => {
  const data = req.body;
  const result = await emailTemplateService.createEmailTemplate(data);
  if (result.status === 'success') {
    return res.status(201).json(result);
  }
  return res.status(400).json(result);
};

exports.getAllTemplates = async (req, res) => {
  const result = await emailTemplateService.getAllEmailTemplates();
  if (result.status === 'success') {
    return res.json(result);
  }
  return res.status(400).json(result);
};

exports.getTemplateById = async (req, res) => {
  const id = req.params.id;
  const result = await emailTemplateService.getEmailTemplateById(id);
  if (result.status === 'success') {
    return res.json(result);
  }
  return res.status(404).json(result);
};

exports.updateTemplate = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await emailTemplateService.updateEmailTemplate(id, data);
  if (result.status === 'success') {
    return res.json(result);
  }
  return res.status(400).json(result);
};

exports.deleteTemplate = async (req, res) => {
  const id = req.params.id;
  const result = await emailTemplateService.deleteEmailTemplate(id);
  if (result.status === 'success') {
    return res.json(result);
  }
  return res.status(404).json(result);
};
