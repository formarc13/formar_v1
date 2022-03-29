const fs = require('fs');
const path = require('path');

module.exports = {
    getProducts: JSON.parse(fs.readFileSync(path.join(__dirname, "/products.json"), "utf-8")),
    getCategories: JSON.parse(fs.readFileSync(path.join(__dirname, "/categories.json"), "utf-8")),
    getProjects: JSON.parse(fs.readFileSync(path.join(__dirname, "/projects.json"), "utf-8")),
    getUsers: JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8")),
    writeUsers: (data) => {
        fs.writeFileSync(path.join(__dirname, "/users.json"), JSON.stringify(data));
    },  
}