const sg = require('smart-grid');

var options = {
    filename: 'sg',
    oldStyle: false,
    offset: '32px',
    columns: 12,
    container: {
        maxWidth: '1048px',
        fields: '16px'
    },
    breakPoints: {},
    properties: []
};

sg('./src/preproc/import', options);