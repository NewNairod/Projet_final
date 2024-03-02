import mongoose from 'mongoose';

const reviewsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }], // Ajout d'un tableau pour gérer plusieurs images.
    brand: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true }, // ajouté en supposant que le type est une chaîne
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 }, // quantité en stock
    numReviews: { type: Number, required: true, default: 0 }, // nombre de revues
    rating: { type: Number, required: true, default: 0 }, // note moyenne des revues
    reviews: [reviewsSchema], // tableau des revues
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
