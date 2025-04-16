//ໃຊ້ງານ mongoose
const mongoose = require("mongoose");

//ເຊື່ອມຕໍ່ໄປຍັງ mongodb
// let dbUrl = 'mongodb://localhost:27017/productDB'
let dbUrl = "mongodb://127.0.0.1:27017/productDB"; //ເຮົາບໍ່ສາມາດໃຊ້ localhost: ໄດ້ໃຫ້ມາໃຊ້ 127.0.0.1: ເເທນ
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

// ສ້າງ schema
let productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

// ສ້າງ model
let Product = mongoose.model("products", productSchema);
// ສົ່ງອອກ module
module.exports = Product;

//ອອກເເບບ function ສຳລັບບັນທືກຂໍ້ມູນ
module.exports.saveProduct =  function  (model, data) {
 model.save(data);
};
