const TextNodeListSchema = require('../models/index');
const DtrContentSchema = require('../models/index');
exports.index = async function (req, res) {
    // take this from req.body instead

    // const dtrContent = [
    //     {
    //         type: 'static',
    //         tag: {
    //             tagName: '',
    //             defaultValue: 'bxhvjdfn',
    //         },
    //     },
    //     {
    //         type: 'dynamic',
    //         tag: {
    //             tagName: 'name',
    //             defaultValue: ' sdnksv ',
    //         },
    //     },
    //     {
    //         type: 'dynamic',
    //         tag: {
    //             tagName: 'location',
    //             defaultValue: 'Earth',
    //         },
    //     },
    //     {
    //         type: 'dynamic',
    //         tag: {
    //             tagName: 'haircolor',
    //             defaultValue: ' black ',
    //         },
    //     },
    // ];
    const { query } = req;
    let result = {};
    try {
        result = await TextNodeListSchema.findById('6012d0714510d4a57a969e7a');
        const { textNodesList } = result;
        res.render('app', { query, textNodesList });

        // res.json({
        //     msg: textNodesList,
        // });
        // console.log(result);
    } catch (e) {
        console.log(e);
        res.send('error');
    }

    // res.send(JSON.stringify(res));
    // res.render('app', { query, textNodesList });
};

exports.indexPost = async (req, res) => {
    const {
        body: { textNodesList },
    } = req;

    console.log(textNodesList);

    //     let textNodesListDocument = new TextNodeListSchema({
    //         textNodesList: textNodesList,
    //     });

    //     const filter = { _id :  };
    // const update = { age: 59 };

    // console.log(textNodesListDocument);
    try {
        // const res =
        await TextNodeListSchema.findByIdAndUpdate('6012d0714510d4a57a969e7a', {
            textNodesList,
        });
        // await textNodesListDocument.save();
    } catch (e) {}

    res.status(200).json({ msg: 'body received' });
};
