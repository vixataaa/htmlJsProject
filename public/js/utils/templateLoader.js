import {genericRequester} from 'genericRequester';
import Handlebars from 'handlebars';

const templateLoader = function () {
    function loadTemplate(templateName) {
        return genericRequester()
            .get(`templates/${templateName}.handlebars`)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);

                return Promise.resolve(compiledTemplate);
            });
    }

    return {
        loadTemplate: loadTemplate
    };
};

export { templateLoader };