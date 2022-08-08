'use strict';

function getMongoDatabaseUrls() {
    let mongoMainUrl = `mongodb+srv://koreai:koreai@cluster0.vt8ga2u.mongodb.net/?retryWrites=true&w=majority`;
    return { mongoMainUrl };
}

let { mongoMainUrl } = getMongoDatabaseUrls();
module.exports = {
    mongoMainUrl: mongoMainUrl
};

