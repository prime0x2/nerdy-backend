import fs from 'fs';
import Handlebars from 'handlebars';

export interface ActivationTemplateData {
  firstName: string;
  activationLink: string;
}

const templateParser = async (data: ActivationTemplateData) => {
  try {
    const source = fs.readFileSync(__dirname + '/templates/activationMail.html', 'utf8');
    const sourceCode = Handlebars.compile(source);
    const template = sourceCode(data);

    console.log('✅ Template parsed successfully');

    return template;
  } catch (error) {
    console.log('❌ Error parsing template: ', error);
    throw error;
  }
};

export default templateParser;
