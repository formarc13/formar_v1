const fs = require('fs');
const path = require('path');

module.exports = {
    products: JSON.parse(fs.readFileSync(path.join(__dirname, "/products.json"), "utf-8")),
    writeProducts: (data) => {
        fs.writeFileSync(path.join(__dirname, "/products.json"), JSON.stringify(data));
    },
    categories: JSON.parse(fs.readFileSync(path.join(__dirname, "/categories.json"), "utf-8")),
    projects: JSON.parse(fs.readFileSync(path.join(__dirname, "/projects.json"), "utf-8")),
    users: JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8")),
    writeUsers: (data) => {
        fs.writeFileSync(path.join(__dirname, "/users.json"), JSON.stringify(data));
    },  
}