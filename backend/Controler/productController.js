import productModel from "../Model/productModel.js";

//function for add product
const addProduct=async(req,res)=>{
 try {
    const {name,description,price,category,subCategory,size,bestseller}=req.body
        const image1 = req.files['image1'] ? req.files['image1'][0] : undefined;
        const image2 = req.files['image2'] ? req.files['image2'][0] : undefined;
        const image3 = req.files['image3'] ? req.files['image3'][0] : undefined;
        const image4 = req.files['image4'] ? req.files['image4'][0] : undefined;

    const images = [image1, image2, image3, image4].filter(item => item !== undefined).map(file => file.path);
    
    console.log(name,description,price,category,subCategory,size,bestseller)
    console.log(images)
       
    const productData={
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      size: JSON.parse(size),
      bestseller: bestseller==="true" ? true:false,
      image:images,
      date:Date.now()
    }
    console.log(productData)
    const product=new productModel(productData)
    await product.save()

    res.json({ success: true, message: "Product added successfully", images });
 } catch (error) {
    res.json({success:false,message:error.message})
 }
}
//function for list product
const listProduct=async(req,res)=>{
    const products=await productModel.find({});
    res.json({success:true,products})
}
//function for removing product
const removeProduct=async(req,res)=>{
    try {
      await productModel.findByIdAndDelete(req.body.id)
      res.json({success:true,message:"product deleted"})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
}
//function for single product info
const singleProduct=async(req,res)=>{
    try {
      const{productId}=req.body
      const product=await productModel.findById(productId)
      res.json({success:true,product})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
}

export {addProduct,listProduct,singleProduct,removeProduct}