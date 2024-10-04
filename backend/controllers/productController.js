import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel.js";
// add product
const addProduct = async (req, res) => {
    try {
        // Log req.files to check if files are coming in
        console.log("Received Files: ", req.files);

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Process images if they exist in the request
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // Log individual image to check if they are correctly identified
        console.log("Image 1: ", image1);
        console.log("Image 2: ", image2);
        console.log("Image 3: ", image3);
        console.log("Image 4: ", image4);

        const images = [image1, image2, image3, image4].filter(image => image !== undefined);

        let imagesUrl = [];

        // Check if images exist, then upload to Cloudinary
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    console.log("Uploading image to Cloudinary: ", item.path);
                    let result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image',
                    });
                    console.log("Uploaded image URL: ", result.secure_url);
                    return result.secure_url;
                })
            );
        }

        // Log the collected URLs to make sure they're being captured
        console.log("Image URLs: ", imagesUrl);

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes,
            bestseller: bestseller === "true" ? true : false,
            images: imagesUrl,
            date: Date.now(),
        };

        console.log("Product Data: ", productData); // For debugging

        // Create and save the product to the database
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product Added', product });
    } catch (error) {
        console.error("Error adding product: ", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)

        res.json({ success: true, message: 'Product removed' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);

        res.json({ success: true, product })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export { addProduct, listProducts, removeProduct, singleProduct };