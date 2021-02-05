const mongoose = require('mongoose');

const textNodesListSchema = new mongoose.Schema({
    textNodesList: [
        {
            idOfElement: String,
            typeOfElement: String,
            shouldDtrPreviewBeVisibile: Boolean,
            dtrContent: [
                {
                    idOfSubstring: String,
                    tagNameOfSubstring: String,
                    defaultValueOfSubstring: String,
                    typeOfSubstring: String,
                },
            ],
        },
    ],
});

module.exports = mongoose.model('TextNodeListSchema', textNodesListSchema);
