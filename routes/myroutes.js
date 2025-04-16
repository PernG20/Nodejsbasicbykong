const express = require("express");
const router = express.Router();
const path = require("path");
const Product = require("../models/products");

//upload file by multer
const multer = require("multer");
const { rejects } = require("assert");

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./public/images/products"); //ຕຳເເໜ່ງຈັດເກັບ file
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + ".jpg"); // ປ່ຽນຊື່ file ປ້ອງກັນຊື່ຊ້ຳກັນ
  },
});


router.get('/favicon.ico', (req, res) => res.status(204).end());

// start upload
const upload = multer({
  storage: storage,
});

router.get("/", (req, res) => {
  // const products = ['shirt ','fan ','ear phone ','keyboard ','mouse '] //array
  //object
  // const products = [
  //   { name: "Notebook", price: 50000, image: "images/products/product1.png" },
  //   { name: "Shirt", price: 5000, image: "images/products/product2.png" },
  //   { name: "headphone", price: 15000, image: "images/products/product3.png" },
  // ];
  // res.render("index.ejs", { products: products });
  getData()
    .then((doc) => {
      // console.log(doc),
      res.render("index", { products: doc });
    })
    .catch((err) => console.log(err));
});

router.get("/manage", (req, res) => {
  if(req.cookies.login){
    getData()
    .then((doc) => {
      // console.log(doc),
      res.render("manage", { products: doc });
    })
    .catch((err) => console.log(err));
  }else{
    res.render("admin");
  }
});

router.get("/delete/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    const product = await Product.findByIdAndDelete(_id);
    if (!product) return res.sendStatus(404);
    console.log("Delete", _id, "Complete");
    return res.redirect("/manage");
  } catch (e) {
    return res.sendStatus(400);
  }
});

router.get("/addForm", (req, res) => {
  if(req.cookies.login){
    res.render("form");
  }else{
    res.render("admin");
  }
});

router.post("/login", (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;
  const timpeEpire = 15000 // 15 second
  // ສ້າງ Cookie
  if(user === 'admin' && pass === '123'){
    //ส้าง cookie
    res.cookie('username',user,{maxAge:timpeEpire})
    res.cookie('password',pass,{maxAge:timpeEpire})
    res.cookie('login',true,{maxAge:timpeEpire})
    res.redirect("/manage");
  }else{
    res.render("404");
  }
});
 
router.get('/logout', (req, res) => {
  console.log('Test LogOut')
  res.clearCookie('username')
  res.clearCookie('password')
  res.clearCookie('login')
  res.redirect('/')
})

//ສອບຖາມຂໍ້ມູນ ຫຼື ຄົ້ນຫາຂໍ້ມູນ
router.get("/:id", (req, res) => {
  const product_id = req.params.id;
  console.log(product_id);
  Product.findOne({ _id: product_id })
    .exec()
    .then((doc) => {
      console.log(doc);
      res.render("product", { product: doc });
    })
    .catch((err) => console.log(err));
});

router.post("/insert", upload.single("image"), (req, res) => {
  console.log(req.file);
  let data = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
    description: req.body.description,
  });

  save(data)
    .then((data) => {
      console.log(data), res.redirect("/");
    })
    .catch((err) => console.log(err));
});

function save(data) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(Product.saveProduct(data), 2000));
  });
}

// ເເກ້ໄຂຂໍ້ມູນສິນຄ້າ ເເລະ ເອົາຂໍ້ມູນສິນຄ້າໄປສະເເດງໜ້າຟອມເເກ້ໄຂ.
router.post("/edit", (req, res) => {
  const edit_id = req.body.edit_id;
  console.log("Received edit_id:", edit_id);
  Product.findOne({ _id: edit_id })
    .exec()
    .then((doc) => {
      console.log(doc);
      res.render("edit", { product: doc });
    })
    .catch((err) => console.log(err));
});

function getData(doc) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(Product.find().exec(doc, 2000)));
  });
}
// ອັບເດດຂໍ້ມູນໃນຖານຂໍ້ມູນ
router.post("/update", (req, res) => {
  const update_id = req.body.update_id;
  let data = {
    name: req.body.name,
    price: req.body.price,
    // image: req.body.image,
    description: req.body.description,
  };
  console.log("ຂໍ້ມູນທີສົ່ງຈາກຟອມ = ", data);
  console.log("ລະຫັດອັບເດດ = ", update_id);
  Product.findByIdAndUpdate(update_id, data, { useFindAndModify: false })
    .exec()
    .then(() => {
      res.redirect("manage");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
