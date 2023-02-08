const express = require('express')

const router = express.Router();

router.get("/add-product", (req, resp, next) => {
    console.log('in the middleware');
    resp.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Add Product<button/></form>');
})

router.post("/product", (req, res, next) => {
    console.log(req.body);
    console.log('entrou aqui')
    // console.log(req.body.title);
    res.redirect("/");
})

module.exports = router;