import imgTV from "figma:asset/f6bf54674f21492fd52c21ef0b5138d741ff03a3.png";
import imgPrimer from "figma:asset/b747ff2195bef13cf42fb78b18c3b6e74635fdae.png";
import imgVita from "figma:asset/1343c63da0d3b4a419e334fa9733836094a23385.png";
import imgHD from "figma:asset/2194e21dd9c9fdb6e528bc6296dab0a33a46fc8a.png";
import imgFix from "figma:asset/ab6aa8b71f00b3f1389a63f7cae4c2a6cea5b5fa.png";
import imgSupra from "figma:asset/7fa5e18eb2b6f979aa3521de51777eb038c9b1e6.png";
import imgUltra from "figma:asset/b1c9a4f9cea635c3f8ca3cfdea41d1065d9d18d4.png";

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export const products: Product[] = [
  { 
    id: 1, 
    name: "Digital Complexion Primer", 
    price: "", 
    image: imgPrimer 
  },
  { 
    id: 2, 
    name: "TV Paint Stick", 
    price: "", 
    image: imgTV 
  },
  { 
    id: 3, 
    name: "Vitacolor Puder", 
    price: "", 
    image: imgVita 
  },
  { 
    id: 4, 
    name: "HD Cream Liner", 
    price: "", 
    image: imgHD 
  },
  { 
    id: 5, 
    name: "Sprej za fiksiranje", 
    price: "", 
    image: imgFix 
  },
  { 
    id: 6, 
    name: "Supracolor Puder", 
    price: "", 
    image: imgSupra 
  },
  { 
    id: 7, 
    name: "Ultra podbaza", 
    price: "", 
    image: imgUltra 
  }
];
