// Master catalog data for HR Jewellers & Sons.
import emeraldBridalSuite from './assets/emerald_bridal_suite.png';
import citrineFloralSet from './assets/citrine_floral_set.png';
import sapphireHeritageSet from './assets/sapphire_heritage_set.png';
import diamondEmeraldChoker from './assets/diamond_emerald_choker.png';
import royalWeddingBands from './assets/royal_wedding_bands.jpg';
import royalChitaiKadas from './assets/royal_chitai_kadas.png';
import udaipurFiligreeSolitaire from './assets/udaipur_filigree_solitaire.jpg';
import emeraldSovereignRing from './assets/emerald_sovereign_ring.png';
import emeraldLaurelPendant from './assets/emerald_laurel_pendant.png';
import silverPoojaThali from './assets/silver_pooja_thali.png';
import silverPayals from './assets/silver_payals.png';
import familySignet from './assets/family_signet.png';
import basraNath from './assets/basra_nath.png';
import solitaireMangalsutra from './assets/solitaire_mangalsutra.png';
import mayuraMangalsutra from './assets/mayura_mangalsutra.png';
import diamondBracelet from './assets/diamond_bracelet.png';
import goldKada from './assets/gold_kada.png';
import laxmiGoldCoin from './assets/laxmi_gold_coin.png';

const BASE_PRODUCTS = [
  {
    id: 'hrj-gold-1',
    category: 'gold',
    subCategory: 'Chokers & Necklaces',
    name: 'Royal Rajputi Kundan Aad',
    desc: 'An iconic Rajasthani wedding masterpiece. Elaborate 22K yellow gold choker loaded with premium uncut diamonds (Polki) and intricate Meenakari work on the reverse.',
    price: 185000,
    carat: '22K Hallmarked',
    weight: '68.5g',
    img: emeraldBridalSuite,
    fallback: '✨',
    badge: 'BESTSELLER',
    purityInfo: 'BIS 916 Government Certified gold purity',
    makingCharges: '₹420/gram handcrafting charges',
    reviews: [
      { patron: 'Suryaveer Singh', stars: 5, comment: 'Exceptional details on reverse Meenakari.' },
      { patron: 'Pranjal R.', stars: 5, comment: 'A centerpiece for my bridal attire.' }
    ]
  },
  {
    id: 'hrj-gold-2',
    category: 'gold',
    subCategory: 'Rings',
    name: 'Atelier Royal Emerald Sovereign Ring',
    desc: 'A heavy, intricately chiseled 22K yellow gold sovereign ring featuring a magnificent square-cut natural Colombian emerald center framed by a filigree floral lattice and micro-diamonds.',
    price: 58000,
    carat: '22K Gold & Emerald',
    weight: '14.5g',
    img: emeraldSovereignRing,
    fallback: '💍',
    badge: 'NEW',
    purityInfo: 'BIS 916 Government Certified gold purity',
    makingCharges: 'Micro-carving & setting charges included',
    reviews: [
      { patron: 'Divya Ojha', stars: 5, comment: 'Fits like a dream. The emerald centerpiece looks incredibly rich!' }
    ]
  },
  {
    id: 'hrj-gold-3',
    category: 'gold',
    subCategory: 'Bangles & Kadas',
    name: 'Imperial Royal Chitai Kadas Set',
    desc: 'A pair of heavy, solid 22K yellow gold kadas masterfully chiseled with traditional Bikaneri Chitai floral motifs. Featuring a secure vintage spring-pin clasp.',
    price: 135000,
    carat: '22K Solid Gold',
    weight: '52.5g',
    img: royalChitaiKadas,
    fallback: '💫',
    badge: 'LIMITED EDITION',
    purityInfo: 'BIS 916 Government Certified gold purity',
    makingCharges: 'Bikaneri Royal Chitai work included',
    reviews: [
      { patron: 'Komal Vyas', stars: 5, comment: 'Absolute masterpiece. The hand-chiseled details on the gold are majestic!' }
    ]
  },
  {
    id: 'hrj-diamond-1',
    category: 'diamond',
    subCategory: 'Bridal Chokers',
    name: 'Imperial Emerald Choker Collet',
    desc: 'A breathtaking masterpiece of high-fashion jewellery. Composed of over 60 carats of pear-shaped brilliant diamonds in a dense layered collar, culminating in a colossal natural forest-green emerald teardrop centerpiece.',
    price: 485000,
    carat: 'VVS Diamond / White Gold',
    weight: '142g',
    img: diamondEmeraldChoker,
    fallback: '💎',
    badge: 'BESTSELLER',
    purityInfo: 'IGI Certified Natural Diamonds & Colombian Emerald',
    makingCharges: 'Bespoke setting and micro-forging included',
    reviews: [
      { patron: 'Meenakshi D.', stars: 5, comment: 'Spectacular sparkle. The emerald depth is incredible!' }
    ]
  },
  {
    id: 'hrj-diamond-2',
    category: 'diamond',
    subCategory: 'Earrings',
    name: 'Devika Royal Peacock Jhumkas',
    desc: 'Majestic drops with uncut diamonds and drop emeralds. Mirroring legacy jewelry worn by royal princesses in the Rajputana dynasty.',
    price: 125000,
    carat: '18K Gold & Polki',
    weight: '24.5g',
    img: sapphireHeritageSet,
    fallback: '✨',
    badge: 'NEW',
    purityInfo: '18K Hallmark Gold with premium Polki settings',
    makingCharges: 'Bespoke design forge included',
    reviews: [
      { patron: 'Nandini Rathore', stars: 5, comment: 'Beautiful movement and lightweight on the ear.' }
    ]
  },
  {
    id: 'hrj-silver-1',
    category: 'silver',
    subCategory: 'Royal Silverware',
    name: 'Nakshtra Silver Pooja Thali Set',
    desc: 'An authentic premium sterling silver 92.5 puja thali featuring fine floral hand-hammering (Chitai work). Includes silver katori, diya, and incense holder.',
    price: 18500,
    carat: '92.5 Sterling',
    weight: '450g',
    img: silverPoojaThali,
    fallback: '🍽️',
    badge: 'BESTSELLER',
    purityInfo: '92.5% Pure Sterling Silver certified',
    makingCharges: 'Traditional hammering charges included',
    reviews: [
      { patron: 'Devki Nandan Soni', stars: 5, comment: 'Chitai work is pristine. Perfect for family events.' }
    ]
  },
  {
    id: 'hrj-silver-2',
    category: 'silver',
    subCategory: 'Anklets & Payals',
    name: 'Bikaneri Ghungroo Payal Duo',
    desc: 'Luxurious heavy sterling silver anklets detailed with traditional musical ghungroos and oxidized royal patterns.',
    price: 8500,
    carat: '92.5 Silver',
    weight: '120g',
    img: silverPayals,
    fallback: '👣',
    badge: 'NEW',
    purityInfo: '92.5 Sterling Silver hallmark verified',
    makingCharges: '₹45/gram handcrafting charges',
    reviews: []
  },
  {
    id: 'hrj-platinum-1',
    category: 'platinum',
    subCategory: 'Rings',
    name: 'Imperial Heritage Filigree Diamond Ring',
    desc: 'A magnificent heritage masterpiece featuring a certified brilliant-cut solitaire diamond held high within a highly filigreed solid yellow gold band, paired with a matching beaded eternity wedding band.',
    price: 165000,
    carat: '18K Yellow Gold / VVS1',
    weight: '12.4g',
    img: udaipurFiligreeSolitaire,
    fallback: '💍',
    badge: 'LIMITED EDITION',
    purityInfo: '18K BIS Hallmarked Solid Gold & VVS Diamond',
    makingCharges: 'Laser micro-engraving & setting included',
    reviews: [
      { patron: 'Arjun K.', stars: 5, comment: 'The filigree detail is mindblowing. Fits the heritage luxury brand beautifully!' }
    ]
  },
  {
    id: 'hrj-bridal-1',
    category: 'bridal',
    subCategory: 'Complete Bridal Suites',
    name: 'Bikaner Maharaja Emerald Suite',
    desc: 'An extraordinary royal heritage bridal compilation. Hand-forged in solid 22K white gold, featuring a magnificent deep forest-green emerald center surrounded by brilliant-cut VVS syndicate diamonds, with matching royal earrings, ring, and kadas.',
    price: 750000,
    carat: '22K Gold / VVS Diamond',
    weight: '280g',
    img: emeraldBridalSuite,
    fallback: '👰',
    badge: 'BESTSELLER',
    purityInfo: 'BIS 916 Hallmark & Certified Precious Stones',
    makingCharges: 'Heirloom velvet showcase box included',
    reviews: [
      { patron: 'Rani Padmini Devi', stars: 5, comment: 'An unmatched royal masterpiece. The green suede stand matches my palace suite perfectly.' }
    ]
  },
  {
    id: 'hrj-custom-1',
    category: 'custom',
    subCategory: 'Bespoke Forge',
    name: 'Heritage Family Tree Signet',
    desc: 'Custom heirloom ring carrying traditional Indian ancestral seals. Hand-forged directly in our Tilak Nagar workshops by Devkishan Soni.',
    price: 35000,
    carat: '22K Solid Gold',
    weight: '16.5g',
    img: familySignet,
    fallback: '👑',
    badge: 'LIMITED EDITION',
    purityInfo: '22K Solid Gold hand-engraved custom dye stamp',
    makingCharges: 'Bespoke craftsmanship included',
    reviews: [
      { patron: 'Gopal Soni', stars: 5, comment: 'Brought our family seal back to life perfectly.' }
    ]
  },
  {
    id: 'hrj-added-1',
    category: 'gold',
    subCategory: 'Necklaces',
    name: 'Imperial Golden Jasmine Garland Set',
    desc: 'An exquisite hand-forged 22K yellow gold floral neckpiece set with massive oval-cut citrine gemstones and fine-cut diamond accents. Inspired by the royal gardens of Udaipur.',
    price: 320000,
    carat: '22K Gold & Citrine',
    weight: '115g',
    img: citrineFloralSet,
    fallback: '✨',
    badge: 'BESTSELLER',
    purityInfo: 'BIS 916 Government Certified gold purity',
    makingCharges: 'Floral forging and polish included',
    reviews: []
  },
  {
    id: 'hrj-added-2',
    category: 'gold',
    subCategory: 'Rings',
    name: 'Royal Patron Engraved Bands Set',
    desc: 'A matching set of two solid 18K yellow gold wedding bands. One features a sleek brushed-matte finish, and the other is hand-engraved with a delicate floral lattice pattern and set with brilliant micro-diamonds.',
    price: 85000,
    carat: '18K Yellow Gold',
    weight: '12.4g',
    img: royalWeddingBands,
    fallback: '💍',
    badge: 'NEW',
    purityInfo: '18K BIS Hallmarked Solid Gold',
    makingCharges: 'Traditional hand-chiseled engraving included',
    reviews: []
  },
  {
    id: 'hrj-added-3',
    category: 'diamond',
    subCategory: 'Earrings & Chokers',
    name: 'Royal Blue Sapphire Double Collar',
    desc: 'A magnificent double-tiered necklace showcasing premium oval-cut royal blue sapphires clustered with brilliant-cut round diamonds, complete with matching sapphire drop earrings.',
    price: 380000,
    carat: 'VVS Diamond & Sapphire',
    weight: '62g',
    img: sapphireHeritageSet,
    fallback: '✨',
    badge: 'LIMITED EDITION',
    purityInfo: 'GIA Certified Natural Sapphires',
    makingCharges: 'Royal channel setting charges included',
    reviews: []
  },
  {
    id: 'hrj-added-4',
    category: 'gold',
    subCategory: 'Bangles & Kadas',
    name: 'Classic Gold Kada',
    desc: 'Heavy 22K yellow gold kada depicting authentic traditional Bikaneri screw closures.',
    price: 110000,
    carat: '22K Hallmarked Gold',
    weight: '42.5g',
    img: goldKada,
    fallback: '💫',
    badge: 'NEW',
    purityInfo: 'BIS 916 Government Certified gold purity',
    makingCharges: '₹390/gram handcrafting charges',
    reviews: []
  },
  {
    id: 'hrj-pendant-1',
    category: 'diamond',
    subCategory: 'Pendants',
    name: 'The Heritage Emerald Medallion',
    desc: 'An exquisite royal heritage pendant showcasing a colossal oval natural forest-green emerald center enclosed within a solid 18K gold laurel wreath encrusted with micro-diamonds.',
    price: 78000,
    carat: '18K Gold & Colombian Emerald',
    weight: '9.2g',
    img: emeraldLaurelPendant,
    fallback: '💎',
    badge: 'BESTSELLER',
    purityInfo: '18K Hallmarked Gold with IGI certified Emerald & Diamonds',
    makingCharges: 'Laurel filigree carving charges included',
    reviews: [
      { patron: 'Aishwarya Sen', stars: 5, comment: 'The olive laurel frame is extremely detailed. An heirloom pendant!' }
    ]
  },
  {
    id: 'hrj-pendant-2',
    category: 'gold',
    subCategory: 'Pendants',
    name: 'Aishwaryam Lakshmi Gold Pendant',
    desc: 'Exquisitely hand-carved solid 22K gold temple medallion showcasing Goddess Lakshmi seated on a lotus flower, signifying pure prosperity.',
    price: 49000,
    carat: '22K Hallmarked',
    weight: '14.2g',
    img: emeraldLaurelPendant,
    fallback: '✨',
    badge: 'NEW',
    purityInfo: 'BIS 916 Government Certified gold purity',
    makingCharges: '₹390/gram handcrafting charges',
    reviews: []
  },
  {
    id: 'hrj-bracelet-1',
    category: 'diamond',
    subCategory: 'Bracelets',
    name: 'Valkyrie Brilliant Diamond Bracelet',
    desc: 'A continuous channel of brilliant-cut VVS-clarity solitaire diamonds set in a sleek, lightweight 18K white gold tennis bracelet frame.',
    price: 195000,
    carat: '18K White Gold & VVS',
    weight: '16.8g',
    img: diamondBracelet,
    fallback: '💫',
    badge: 'LIMITED EDITION',
    purityInfo: 'IGI certified natural VVS clarity diamonds',
    makingCharges: 'Bespoke laser craftsmanship included',
    reviews: [
      { patron: 'Rohit Mehta', stars: 5, comment: 'Bought as a wedding anniversary gift. Absolute perfection.' }
    ]
  },
  {
    id: 'hrj-bracelet-2',
    category: 'gold',
    subCategory: 'Bracelets',
    name: 'The Vintage Royal Bangle Bracelet',
    desc: 'A flexible interlocking chain-mesh designer bracelet crafted in high-purity yellow gold with a security slide lock and dual accent safety chains.',
    price: 89000,
    carat: '22K Gold',
    weight: '28.4g',
    img: goldKada,
    fallback: '💫',
    badge: 'BESTSELLER',
    purityInfo: 'BIS 916 Government Certified gold purity',
    makingCharges: '₹380/gram handcrafting charges',
    reviews: []
  },
  {
    id: 'hrj-mangalsutra-1',
    category: 'diamond',
    subCategory: 'Mangalsutra',
    name: 'Sacred Diamond Solitaire Mangalsutra',
    desc: 'A contemporary take on the sacred union. High-grade central brilliant solitaire drop suspended on a modern 18K gold chain accented with authentic black onyx beads.',
    price: 78000,
    carat: '18K Gold / VVS1',
    weight: '7.2g',
    img: solitaireMangalsutra,
    fallback: '👑',
    badge: 'NEW',
    purityInfo: 'IGI certified central solitaire with 18K hallmark',
    makingCharges: 'Artisanal hand-strung beadwork included',
    reviews: []
  },
  {
    id: 'hrj-mangalsutra-2',
    category: 'gold',
    subCategory: 'Mangalsutra',
    name: 'Mayura Heritage Kundan Mangalsutra',
    desc: 'Traditional gold mangalsutra showcasing twin peacock motifs hand-painted with green enamel (Meenakari) and set with fine Kundan stones on double-layered holy black bead strands.',
    price: 95000,
    carat: '22K Gold',
    weight: '22.5g',
    img: mayuraMangalsutra,
    fallback: '👑',
    badge: 'BESTSELLER',
    purityInfo: 'BIS 916 Government Certified gold purity',
    makingCharges: '₹410/gram handcrafting charges',
    reviews: [
      { patron: 'Sneha Sharma', stars: 5, comment: 'The peacock detail is beautifully ethnic and clean.' }
    ]
  },
  {
    id: 'hrj-nose-1',
    category: 'diamond',
    subCategory: 'Nose Pins',
    name: 'Devika Diamond Nose Pin Atelier',
    desc: 'A single sparkling star-cut diamond set in a minimalist 18K yellow gold prong setting with a secure screw backing. Elegantly highlights traditional Indian grace.',
    price: 12500,
    carat: '18K Gold & VVS',
    weight: '0.8g',
    img: basraNath,
    fallback: '✨',
    badge: 'BESTSELLER',
    purityInfo: '100% certified VVS natural diamond pin',
    makingCharges: 'Micro-setting charges included',
    reviews: []
  },
  {
    id: 'hrj-nose-2',
    category: 'gold',
    subCategory: 'Nose Pins',
    name: 'Bikaneri Pearl Nose Ring (Nath)',
    desc: 'Delicate traditional nose hoop detailed with a central basra pearl bead, miniature gold granules, and red ruby accents. Featuring a light, comfortable wire fitting.',
    price: 18500,
    carat: '22K Gold',
    weight: '2.4g',
    img: basraNath,
    fallback: '✨',
    badge: 'NEW',
    purityInfo: '22K BIS Hallmarked gold purity',
    makingCharges: 'Crafted by Bikaneri master micro-goldsmiths',
    reviews: [
      { patron: 'Pooja Kanwar', stars: 5, comment: 'Super lightweight. Fits perfectly for functions.' }
    ]
  },
  {
    id: 'hrj-pooja-1',
    category: 'pooja',
    subCategory: 'Pooja Thalis',
    name: 'Nakshtra Silver Pooja Thali Set',
    desc: 'An authentic premium sterling silver 92.5 puja thali featuring fine floral hand-hammering (Chitai work). Includes silver katori, diya, and incense holder.',
    price: 18500,
    carat: '92.5 Sterling',
    weight: '450g',
    img: silverPoojaThali,
    fallback: '🍽️',
    badge: 'BESTSELLER',
    purityInfo: '92.5% Pure Sterling Silver certified',
    makingCharges: 'Traditional hammering charges included',
    reviews: [
      { patron: 'Devki Nandan Soni', stars: 5, comment: 'Chitai work is pristine. Perfect for family events.' }
    ]
  },
  {
    id: 'hrj-pooja-2',
    category: 'pooja',
    subCategory: 'Silver Coins',
    name: '24K Devotion Laxmi Ganesha Silver Coin',
    desc: 'Pure sterling silver coin pressed with high-relief portraits of Goddess Lakshmi and Lord Ganesha. Perfect for Diwali puja, wealth creation, and sacred family holdings.',
    price: 3200,
    carat: '999 Fine Silver',
    weight: '50g',
    img: silverPoojaThali,
    fallback: '🪙',
    badge: 'NEW',
    purityInfo: 'NABL Accredited Refinery Certified',
    makingCharges: 'Tamper-proof blister card casing included',
    reviews: []
  },
  {
    id: 'hrj-pooja-3',
    category: 'pooja',
    subCategory: 'Gold Coins',
    name: '24K Shubh Labh Ganesha Gold Coin',
    desc: 'Bespoke 24K solid gold coin carrying the auspicious "Shubh Labh" scripts and Lord Ganesha illustration. Struck with 999.9 purity assay validation.',
    price: 12500,
    carat: '24K Pure Gold',
    weight: '2g',
    img: laxmiGoldCoin,
    fallback: '🪙',
    badge: 'FESTIVE SPECIAL',
    purityInfo: 'Government Certified 100% BIS Hallmarked',
    makingCharges: 'Standard mint charges included',
    reviews: []
  },
  {
    id: 'hrj-pooja-4',
    category: 'pooja',
    subCategory: 'Idols',
    name: 'Sterling Silver Lakshmi Ganesha Idols Set',
    desc: 'Heavy solid sterling silver idols of Goddess Lakshmi and Lord Ganesha sitting gracefully on carved pedestals. Meticulously hand-detailed with antique royal polishing.',
    price: 24000,
    carat: '925 Sterling Silver',
    weight: '320g',
    img: silverPoojaThali,
    fallback: '✨',
    badge: 'LIMITED EDITION',
    purityInfo: 'BIS Hallmarked Precious Silver Alloy',
    makingCharges: 'Artisanal handcrafting charges included',
    reviews: [
      { patron: 'Sneha Vyas', stars: 5, comment: 'Stunning expressions on both idols. Very divine.' }
    ]
  },
  {
    id: 'hrj-pooja-5',
    category: 'pooja',
    subCategory: 'Silver Diyas',
    name: 'Mayur Royal Silver Diya Stand Set',
    desc: 'A pair of magnificent silver diyas adorned with peacock figurines and traditional floral carvings. Designed with deep wells for prolonged oil burning.',
    price: 9500,
    carat: '92.5 Sterling Silver',
    weight: '150g',
    img: silverPoojaThali,
    fallback: '🪔',
    badge: 'NEW',
    purityInfo: '92.5% pure silver certified',
    makingCharges: 'Fine peacock molding charges included',
    reviews: []
  },
  {
    id: 'hrj-pooja-6',
    category: 'pooja',
    subCategory: 'Religious Gifts',
    name: 'Saraswati Yantra Silver Medallion',
    desc: 'A high-purity sterling silver yantra medallion depicting sacred geometric engravings of Goddess Saraswati, signifying education, arts, and supreme wisdom.',
    price: 5800,
    carat: '999 Fine Silver',
    weight: '80g',
    img: silverPoojaThali,
    fallback: '✨',
    badge: 'NEW',
    purityInfo: '99.9% Pure Silver certified',
    makingCharges: 'Laser micro-engraving included',
    reviews: []
  },
  {
    id: 'hrj-pooja-7',
    category: 'pooja',
    subCategory: 'Wedding Gifts',
    name: 'Chitai Oxidized Silver Wedding Box',
    desc: 'An exquisite hand-chiseled dry fruit/jewelry utility box with traditional oxidized patterns and Rajasthani wedding lattice engravings. A timeless wedding keepsake.',
    price: 14500,
    carat: '925 Sterling Silver',
    weight: '280g',
    img: silverPoojaThali,
    fallback: '🎁',
    badge: 'WEDDING SPECIAL',
    purityInfo: '92.5% Pure Sterling Silver authenticated',
    makingCharges: 'Bikaneri Chitai work included',
    reviews: []
  },
  {
    id: 'hrj-pooja-8',
    category: 'pooja',
    subCategory: 'Festive Gifts',
    name: 'Royal Heritage Silver Kalash Token',
    desc: 'A beautiful miniature solid silver kalash token accented with sacred mango leaves and coconut carving. Traditionally gifted during housewarmings and milestone pujas.',
    price: 8200,
    carat: '92.5 Sterling Silver',
    weight: '120g',
    img: silverPoojaThali,
    fallback: '🪙',
    badge: 'BESTSELLER',
    purityInfo: 'Bureau of Indian Standards hallmarked',
    makingCharges: 'Traditional sculpting charges included',
    reviews: []
  }
];

const geminiImages = [
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=500&auto=format&fit=crop'
];

const subcategories = ['Earrings', 'Rings', 'Pendants', 'Necklaces', 'Bangles', 'Bracelets', 'Mangalsutra', 'Chains', 'Nose Pins'];
const categories = ['gold', 'diamond', 'silver', 'platinum', 'bridal', 'pooja'];
const names = {
  Earrings: ['Aura Gold Studs', 'Chandelier Diamond Drops', 'Shubham Pearl Jhumkas', 'Mayur Peacock Tops', 'Elegant Hoop Earrings'],
  Rings: ['Solitaire Diamond Promise Ring', 'Classic Gold Wedding Band', 'Royal Ruby Signet Ring', 'Valkyrie Platinum Ring', 'Heritage Filigree Ring'],
  Pendants: ['Ganesha Gold Medallion', 'Sovereign Sapphire Pendant', 'Teardrop Emerald Pendant', 'Classic Solitaire Pendant'],
  Necklaces: ['Kundan Bridal Choker', 'Glimmering Diamond Collar', 'Temple Gold Haram', 'Delicate Chain Necklace'],
  Bangles: ['Classic Gold Kada', 'Filigree Gold Bangles', 'Silver Kada Set', 'Diamond Accent Bangles'],
  Bracelets: ['Brilliant Diamond Tennis Bracelet', 'Intricate Gold Mesh Bracelet', 'Sterling Silver Link Bracelet'],
  Mangalsutra: ['Sacred Solitaire Mangalsutra', 'Kundan Floral Mangalsutra', 'Traditional Gold Bead Mangalsutra'],
  Chains: ['Solid Gold Rope Chain', 'Sleek Platinum Chain', 'Elegant Silver Link Chain'],
  'Nose Pins': ['Single Diamond Nose Stud', 'Pearl Hoop Nath', 'Kundan Nose Ring']
};

const descriptions = [
  'Exquisite design featuring fine 18k gold details, perfect for women looking for standard elegance.',
  'Crafted in premium 22k gold and set with certified diamonds, designed for weddings and special occasions.',
  'Featuring high-grade natural gemstones like rubies and sapphires in a luxury rose gold frame.',
  'Traditional Indian design with kundan work and meenakari polish, perfect for festive unisex wear.',
  'Simple, elegant everyday wear accessory crafted in 14k gold, ideal for kids and young girls.',
  'A masterpiece of design from our Tilak Nagar workshops. Certified by BIS Government standards.',
  'Solid platinum alloy ring with VVS clarity diamond accents, for men looking for contemporary styles.',
  'Sterling silver 92.5 purity, featuring hand-carved floral patterns (Chitai work) and antique polish.'
];

// Generate 50 extra items to reach a total of 75 products
const generatedProducts = [];
for (let i = 1; i <= 50; i++) {
  const subCat = subcategories[i % subcategories.length];
  const cat = categories[i % categories.length];
  const nameList = names[subCat];
  const name = nameList[i % nameList.length] + ' ' + (100 + i);
  const desc = descriptions[i % descriptions.length];
  const price = 8000 + (i * 9700) % 250000;
  const carat = cat === 'diamond' ? '18K Gold & VVS' : cat === 'silver' ? '92.5 Sterling' : cat === 'platinum' ? '950 Platinum' : '22K Hallmarked';
  const weight = (3 + (i * 2.3) % 45).toFixed(1) + 'g';
  const img = geminiImages[i % geminiImages.length];
  const fallback = cat === 'gold' ? '✨' : cat === 'diamond' ? '💎' : '💍';
  const badge = i % 5 === 0 ? 'BESTSELLER' : i % 7 === 0 ? 'NEW' : '';

  generatedProducts.push({
    id: `hrj-gen-${i}`,
    category: cat,
    subCategory: subCat,
    name,
    desc,
    price,
    carat,
    weight,
    img,
    fallback,
    badge,
    purityInfo: 'BIS Government Hallmarked and Certified',
    makingCharges: 'Craftsmanship and forging charges included',
    reviews: []
  });
}

export const PRODUCTS = [...BASE_PRODUCTS, ...generatedProducts];

