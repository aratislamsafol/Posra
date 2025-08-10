const EmailTemplateModel = require('../models/EmailTemplate');

const createEmailTemplate = async (data) => {
  try {
    const template = new EmailTemplateModel(data);
    await template.save();
    return { status: 'success', data: template };
  } catch (error) {
    return { status: 'fail', message: error.message };
  }
};

const getAllEmailTemplates = async () => {
  try {
    const templates = await EmailTemplateModel.find();
    return { status: 'success', data: templates };
  } catch (error) {
    return { status: 'fail', message: error.message };
  }
};

const getEmailTemplateById = async (id) => {
  try {
    const template = await EmailTemplateModel.findById(id);
    if (!template) {
      return { status: 'fail', message: 'Template not found' };
    }
    return { status: 'success', data: template };
  } catch (error) {
    return { status: 'fail', message: error.message };
  }
};

const updateEmailTemplate = async (id, data) => {
  try {
    const template = await EmailTemplateModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!template) {
      return { status: 'fail', message: 'Template not found' };
    }
    return { status: 'success', data: template };
  } catch (error) {
    return { status: 'fail', message: error.message };
  }
};

const deleteEmailTemplate = async (id) => {
  try {
    const template = await EmailTemplateModel.findByIdAndDelete(id);
    if (!template) {
      return { status: 'fail', message: 'Template not found' };
    }
    return { status: 'success', message: 'Template deleted successfully' };
  } catch (error) {
    return { status: 'fail', message: error.message };
  }
};

module.exports = {
  createEmailTemplate,
  getAllEmailTemplates,
  getEmailTemplateById,
  updateEmailTemplate,
  deleteEmailTemplate
};
