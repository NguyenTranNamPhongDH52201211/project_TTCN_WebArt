const cloudinary = require("../config/CloudinaryConfig");
const ProductImagesModel = require("../models/ProductImagesModel");

class ImagesService {
    static async uploadMultiple(productId, files) {

        const uploads = files.map(file => new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: `products/${productId}` },
                async (err, result) => {
                    if (err) return reject(err);

                    await ProductImagesModel.create({
                        image_product_id: productId,
                        image_url: result.secure_url
                    });

                    resolve(result.secure_url);
                }
            );
            stream.end(file.buffer);

        }));
        return await Promise.all(uploads);

        //const uploaded = [];

        /* for (const file of files) {
             const imageUrl = await new Promise((resolve, reject) => {
                 cloudinary.uploader.upload_stream(
                     { folder: `products/${productId}` },
                     async (err, result) => {
                         if (err) return reject(err);
 
                         await ProductImagesModel.create({
                             image_product_id: productId,
                             image_url: result.secure_url
                         });
 
 
                         resolve(result.secure_url);
                     }
                 ).end(file.buffer);
             });
 
             uploaded.push(imageUrl);
         }
 
         return uploaded;*/
    }

    static async deleteByProductId(productId) {
        return await ProductImagesModel.deleteByProductId(productId);
    }

}

module.exports = ImagesService;
