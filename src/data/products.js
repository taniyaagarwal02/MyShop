const products = [
  {
    id: "p1",
    title: "Classic Sneakers",
    price: 2499,
    image:
      "https://images-wp.stockx.com/news/wp-content/uploads/2023/09/Skip_The_Hype-English-Editorial_BannerBlog-Twitter-1200x1200.jpg",
    description: "Comfortable sneakers for everyday wear.",

    category: "footwear",
  },
  {
    id: "p2",
    title: "Leather Wallet",
    price: 799,
    image:
      "https://urbanforest.co.in/cdn/shop/files/A7402041.jpg?v=1733571068&width=1946",
    description: "Genuine leather slim wallet.",
    category: "accessories",
  },
  {
    id: "p3",
    title: "Denim Jacket",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1537465978529-d23b17165b3b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D",
    description: "Stylish denim jacket.",
    category: "apparel",
  },
  {
    id: "p4",
    title: "Sports Watch",
    price: 3499,
    image:
      "https://www.carlington.in/cdn/shop/products/18-a.jpg?v=1694331128&width=2700",
    description: "Durable watch with chrono features.",
    category: "accessories",
  },
  {
    id: "p5",
    title: "Sunglasses",
    price: 899,
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/sunglass/k/i/3/-original-imahfv2gp4b8asck.jpeg?q=90",
    description: "UV-protected sunglasses.",
    category: "accessories",
  },
  {
    id: "p6",
    title: "Backpack",
    price: 1299,
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/backpack/o/e/s/12-stylish-backpack-boys-girls-office-college-travel-21-m-123-original-imahc7nvpd76tnhs.jpeg?q=90",
    description: "Spacious backpack for daily use.",
    category: "accessories",
  },
  {
    id: "p7",
    title: "Wireless Earbuds",
    price: 2199,
    image:
      "https://img.freepik.com/free-photo/wireless-earbuds-with-neon-cyberpunk-style-lighting_23-2151074297.jpg?semt=ais_hybrid&w=740&q=80",
    description: "Noise-cancelling Bluetooth earbuds with long battery life.",
    category: "electronics",
  },
  {
    id: "p8",
    title: "Casual T-Shirt",
    price: 599,
    image:
      "https://www.technosport.in/cdn/shop/files/OR81IronGrey_1.jpg?v=1738839831&width=1946",
    description: "Soft cotton unisex t-shirt available in multiple colors.",
    category: "apparel",
  },
  {
    id: "p9",
    title: "Laptop Sleeve",
    price: 999,
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/bag/5/2/8/-original-imahfskbxceqjhng.jpeg?q=90",
    description: "Protective slim-fit laptop sleeve.",
    category: "accessories",
  },
  {
    id: "p10",
    title: "Running Shoes",
    price: 2799,
    image:
      "https://paragonfootwear.com/cdn/shop/products/k1015g_blk_1.jpg?v=1756716011&width=1920",
    description: "Lightweight running shoes designed for performance.",
    category: "footwear",
  },
  {
    id: "p11",
    title: "Formal Shirt",
    price: 1399,
    image:
      "https://images.meesho.com/images/products/204307799/pd2lf_512.webp?width=512",
    description: "Slim-fit formal shirt perfect for office wear.",
    category: "fashion",
  },
  {
    id: "p12",
    title: "Bluetooth Speaker",
    price: 1899,
    image:
      "https://www.shutterstock.com/image-photo/black-portable-mini-speaker-colorful-600nw-2561079163.jpg",
    description: "Portable waterproof Bluetooth speaker with deep bass.",
    category: "electronics",
  },

  {
    id: 13,
    title: "Fitness Tracker",
    price: 1599,
    image:
      "https://pyxis.nymag.com/v1/imgs/921/c0c/d56eeaa21522d8918ee1cedde9dea91293.rsquare.w600.jpg",
    description: "Track your daily activity and health metrics.",
    category: "electronics",
  },
  {
    id: 14,
    title: "Travel Mug",
    price: 499,
    image:
      "https://www.thewalletstore.in/cdn/shop/products/Untitled-12_6466b07a-0330-4132-91c8-3562d913a44f.jpg?v=1680528425&width=2048",
    description: "Insulated travel mug to keep your drinks hot or cold.",
    category: "accessories",
  },
  {
    id: 15,
    title: "Portable Charger",
    price: 1299,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/gh-best-portable-chargers-662275e268106.png?crop=0.388xw:0.776xh;0.311xw,0.103xh&resize=640:*",
    description: "High-capacity portable charger for your devices.",
    category: "electronics",
  },
  {
    id: 16,
    title: "Graphic Hoodie",
    price: 1799,
    image:
      "https://img.kwcdn.com/product/fancy/9628a8bf-7f40-4c05-8c76-8bb1fc24e13d.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
    description: "Comfortable hoodie with unique graphic designs.",
    category: "fashion",
  },
  {
    id: 17,
    title: "Digital Camera",
    price: 4999,
    image:
      "https://5.imimg.com/data5/UM/HB/MY-13169908/sony-digital-camera.jpg",
    description: "Capture high-quality photos and videos.",
    category: "electronics",
  },
  {
    id: 18,
    title: "Ankle Boots",
    price: 3299,
    image: "",
    description: "Stylish ankle boots for all seasons.",
    category: "footwear",
  },
  {
    id: 19,
    title: "Beanie Hat",
    price: 399,
    image: "",
    description: "Warm beanie hat for cold weather.",
    category: "accessories",
  },
];

export default products;
