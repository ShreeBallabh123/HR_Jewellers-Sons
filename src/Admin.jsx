import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { 
  collection, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';



// Premium 2026 SaaS Dashboard libraries
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  LayoutDashboard, 
  Gem, 
  Boxes, 
  ShoppingBag, 
  Users, 
  LogOut, 
  ExternalLink, 
  ChevronRight, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  Download,
  Info,
  Clock,
  ChevronDown,
  Wallet,
  Sun,
  Moon
} from 'lucide-react';

export default function Admin() {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hrj_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Active View Tab and Role-Based Access Control (RBAC)
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminRole, setAdminRole] = useState(() => {
    try {
      const saved = localStorage.getItem('hrj_admin_role');
      return saved || 'Super Admin';
    } catch {
      return 'Super Admin';
    }
  });
  const [darkMode, setDarkMode] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [adminNotification, setAdminNotification] = useState({ message: '', type: 'success' });
  const showAdminNotification = (message, type = 'success') => {
    setAdminNotification({ message, type });
    setTimeout(() => {
      setAdminNotification({ message: '', type: 'success' });
    }, 4000);
  };

  // Loaded database elements
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminConsults, setAdminConsults] = useState([]);

  // Form parameters
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  const [categoryUploadProgress, setCategoryUploadProgress] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'gold', subCategory: '', desc: '', price: 0,
    carat: '22K Gold', weight: '', img: '', badge: '', purityInfo: '', 
    makingCharges: '', sku: '', stoneInfo: '', hallmark: 'BIS 916 Government Certified', 
    tags: '', seoTitle: '', seoDesc: '', featured: false, stockQty: 10,
    subImages: []
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [subImagesUploadProgress, setSubImagesUploadProgress] = useState(null);

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [selectedCatalogIds, setSelectedCatalogIds] = useState([]); // For Active Catalog Selection!

  // CRM & Client details
  const [selectedClient, setSelectedClient] = useState(null);
  const [crmSearch, setCrmSearch] = useState('');
  const [crmSegment, setCrmSegment] = useState('all');

  // Orders workflow details
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Upgraded Login interface specific states
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState('');
  const [loginRoleSelection, setLoginRoleSelection] = useState('Super Admin');



  // Date Range Filters for Analytics
  const [analyticsRange, setAnalyticsRange] = useState('30days');

  // WhatsApp Automation Default Templates (Configured for secure orders workflow)
  const waTemplates = {
    confirmed: 'Namaste {Customer}, Your order #{OrderId} at HR Jewellers has been confirmed! We are preparing your exquisite handcraft designs.',
    dispatched: 'Greetings {Customer}! Your jewellery order #{OrderId} is packed with hallmark certificates and dispatched via secure transit. Tracking: {Tracking}',
    delivered: 'Dear {Customer}, Your jewellery item #{OrderId} has been safely delivered! Thank you for choosing HR Jewellers.'
  };

  // Auto-seed admin user credentials if not exists
  useEffect(() => {
    const seedAdmin = async () => {
      try {
        await createUserWithEmailAndPassword(auth, "admin@hrjewellers.com", "admin123");
        console.log("Admin account created successfully.");
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          console.log("Admin account is already active.");
        } else {
          console.error("Admin user seeding error:", err);
        }
      }
    };
    seedAdmin();
  }, []);

  // Monitor authorization states
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminUser(user);
        localStorage.setItem('hrj_admin_user', JSON.stringify(user));
      } else {
        const saved = localStorage.getItem('hrj_admin_user');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.uid === 'fallback-admin') {
            return;
          }
        }
        setAdminUser(null);
        localStorage.removeItem('hrj_admin_user');
        localStorage.removeItem('hrj_admin_role');
      }
    });
    return () => unsubscribe();
  }, []);

  // Interactive mouse tracking spotlight glow for premium entry portal
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    if (adminUser) return;
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [adminUser]);

  // Fetch active catalogs, orders, and consultations in real-time
  useEffect(() => {
    if (!adminUser) return;

    // Listen to Products
    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Listen to Categories
    const unsubscribeCategories = onSnapshot(collection(db, 'categories'), (snap) => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Listen to Orders
    const qOrders = query(collection(db, 'orders'), orderBy('createdDate', 'desc'));
    const unsubscribeOrders = onSnapshot(qOrders, (snap) => {
      setAdminOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Listen to Consultations
    const qConsults = query(collection(db, 'consultations'), orderBy('createdDate', 'desc'));
    const unsubscribeConsults = onSnapshot(qConsults, (snap) => {
      setAdminConsults(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
      unsubscribeOrders();
      unsubscribeConsults();
    };
  }, [adminUser]);



  // Command handlers
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      const user = userCredential.user;
      setAdminUser(user);
      setAdminRole(loginRoleSelection);
      localStorage.setItem('hrj_admin_user', JSON.stringify(user));
      localStorage.setItem('hrj_admin_role', loginRoleSelection);
    } catch (err) {
      console.error("Admin authentication failed:", err);
      if (adminEmail === 'admin@hrjewellers.com' && adminPassword === 'admin123') {
        const fallbackUser = { email: 'admin@hrjewellers.com', uid: 'fallback-admin' };
        setAdminUser(fallbackUser);
        setAdminRole(loginRoleSelection);
        localStorage.setItem('hrj_admin_user', JSON.stringify(fallbackUser));
        localStorage.setItem('hrj_admin_role', loginRoleSelection);
      } else {
        setAdminError('Invalid administrator credentials.');
      }
    }
  };

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out:", err);
    }
    setAdminUser(null);
    localStorage.removeItem('hrj_admin_user');
    localStorage.removeItem('hrj_admin_role');
  };

  // Autofill Demo keys handler
  const handleAutofillDemo = () => {
    setAdminEmail("admin@hrjewellers.com");
    setAdminPassword("admin123");
  };



  // Product CRUD Operations
  const handleAddProduct = async (e) => {
    e.preventDefault();
    // RBAC Security Check
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Inventory Managers can add products.", "error");
      return;
    }
    try {
      const prodId = `hrj-custom-${Date.now()}`;
      await setDoc(doc(db, 'products', prodId), {
        ...newProduct,
        id: prodId,
        reviews: [],
        createdDate: new Date()
      });
      setNewProduct({
        name: '', category: 'gold', subCategory: '', desc: '', price: 0,
        carat: '22K Gold', weight: '', img: '', badge: '', purityInfo: '', 
        makingCharges: '', sku: '', stoneInfo: '', hallmark: 'BIS 916 Government Certified', 
        tags: '', seoTitle: '', seoDesc: '', featured: false, stockQty: 10,
        subImages: []
      });
      showAdminNotification("New jewellery item added successfully!", "success");
    } catch (err) {
      console.error("Error adding product:", err);
      showAdminNotification("Error adding product: " + err.message, "error");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Inventory Managers can edit products.", "error");
      return;
    }
    try {
      await updateDoc(doc(db, 'products', editingProduct.id), editingProduct);
      setEditingProduct(null);
      showAdminNotification("Catalog product updated successfully!", "success");
    } catch (err) {
      console.error("Error updating product:", err);
      showAdminNotification("Error updating product: " + err.message, "error");
    }
  };

  const handleDeleteProduct = async (prodId) => {
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Inventory Managers can delete products.", "error");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this jewellery item?")) return;
    try {
      await deleteDoc(doc(db, 'products', prodId));
      showAdminNotification("Product deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting product:", err);
      showAdminNotification("Error deleting product: " + err.message, "error");
    }
  };

  const handleDeleteSelectedCatalog = async () => {
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Inventory Managers can delete products.", "error");
      return;
    }
    if (selectedCatalogIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete all ${selectedCatalogIds.length} selected jewellery items?`)) return;
    try {
      for (const prodId of selectedCatalogIds) {
        await deleteDoc(doc(db, 'products', prodId));
      }
      setSelectedCatalogIds([]);
      showAdminNotification("Selected jewellery items deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting selected products:", err);
      showAdminNotification("Error deleting selected products: " + err.message, "error");
    }
  };

  // Upload category cover image directly to Cloudinary
  const handleCategoryImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isLarge = file.size > 500 * 1024;
    setCategoryUploadProgress(isLarge ? "⚠️ Warning: Image exceeds 500KB. Uploading..." : "Uploading category image...");
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dcraweoxj';
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'hr_jewellers_unsigned';
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'categories');
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
      }

      const data = await response.json();
      const downloadURL = data.secure_url;
      setNewCategoryImage(downloadURL);
      setCategoryUploadProgress(isLarge ? "⚠️ Upload complete (Image exceeds 500KB)!" : "Image upload complete!");
    } catch (err) {
      console.error("Cloudinary category upload error:", err);
      setCategoryUploadProgress(`Image upload failed: ${err.message}`);
    }
  };

  // Upload asset directly to Cloudinary
  const handleImageUpload = async (e, mode) => {
    const file = e.target.files[0];
    if (!file) return;
    const isLarge = file.size > 500 * 1024;
    setImageUploadProgress(isLarge ? "⚠️ Warning: Image exceeds 500KB. Uploading..." : "Uploading master image...");
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dcraweoxj';
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'hr_jewellers_unsigned';
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'products');
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
      }

      const data = await response.json();
      const downloadURL = data.secure_url;

      if (mode === 'new') {
        setNewProduct(prev => ({ ...prev, img: downloadURL }));
      } else {
        setEditingProduct(prev => ({ ...prev, img: downloadURL }));
      }
      setImageUploadProgress(isLarge ? "⚠️ Upload complete (Image exceeds 500KB)!" : "Image upload complete!");
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      setImageUploadProgress(`Image upload failed: ${err.message}`);
    }
  };

  const handleSubImagesUpload = async (e, mode) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const largeFilesCount = files.filter(f => f.size > 500 * 1024).length;
    setSubImagesUploadProgress(largeFilesCount > 0 ? `⚠️ Warning: ${largeFilesCount} sub-image(s) exceed 500KB. Uploading...` : `Uploading ${files.length} sub-images...`);
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dcraweoxj';
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'hr_jewellers_unsigned';
      
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', 'products');
        
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to upload sub-image');
        }

        const data = await response.json();
        urls.push(data.secure_url);
      }

      if (mode === 'new') {
        setNewProduct(prev => ({
          ...prev,
          subImages: [...(prev.subImages || []), ...urls]
        }));
      } else {
        setEditingProduct(prev => ({
          ...prev,
          subImages: [...(prev.subImages || []), ...urls]
        }));
      }
      setSubImagesUploadProgress(largeFilesCount > 0 ? "⚠️ Upload complete (Some sub-images exceeded 500KB)!" : "Sub-images upload complete!");
    } catch (err) {
      console.error("Cloudinary sub-images upload error:", err);
      setSubImagesUploadProgress(`Sub-images upload failed: ${err.message}`);
    }
  };

  const handleRemoveSubImage = (indexToRemove, mode) => {
    if (mode === 'new') {
      setNewProduct(prev => ({
        ...prev,
        subImages: (prev.subImages || []).filter((_, idx) => idx !== indexToRemove)
      }));
    } else {
      setEditingProduct(prev => ({
        ...prev,
        subImages: (prev.subImages || []).filter((_, idx) => idx !== indexToRemove)
      }));
    }
  };

  // Category Operations
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Access Denied.", "error");
      return;
    }
    if (!newCategoryName.trim()) return;
    try {
      const catId = newCategoryName.toLowerCase().replace(/\s+/g, '-');
      await setDoc(doc(db, 'categories', catId), {
        name: newCategoryName,
        id: catId,
        img: newCategoryImage || ''
      });
      setNewCategoryName('');
      setNewCategoryImage('');
      setCategoryUploadProgress(null);
      showAdminNotification("Category added successfully!", "success");
    } catch (err) {
      console.error("Error adding category:", err);
      showAdminNotification("Error adding category: " + err.message, "error");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Access Denied.", "error");
      return;
    }
    if (!newCategoryName.trim()) return;
    try {
      await updateDoc(doc(db, 'categories', editingCategory.id), {
        name: newCategoryName,
        img: newCategoryImage || ''
      });
      setNewCategoryName('');
      setNewCategoryImage('');
      setCategoryUploadProgress(null);
      setEditingCategory(null);
      showAdminNotification("Category updated successfully!", "success");
    } catch (err) {
      console.error("Error updating category:", err);
      showAdminNotification("Error updating category: " + err.message, "error");
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Access Denied.", "error");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteDoc(doc(db, 'categories', catId));
      showAdminNotification("Category deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting category:", err);
      showAdminNotification("Error deleting category: " + err.message, "error");
    }
  };

  // Status Modifiers
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    if (adminRole === 'Inventory Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Managers can modify orders.", "error");
      return;
    }
    try {
      await updateDoc(doc(db, 'orders', orderId), { orderStatus: newStatus });
      showAdminNotification(`Order status updated to: ${newStatus}`, "success");
    } catch (err) {
      console.error("Error updating order status:", err);
      showAdminNotification("Error updating order status: " + err.message, "error");
    }
  };

  const handleUpdateConsultStatus = async (consultId, newStatus) => {
    try {
      await updateDoc(doc(db, 'consultations', consultId), { status: newStatus });
      showAdminNotification(`Consultation status updated to: ${newStatus}`, "success");
    } catch (err) {
      console.error("Error updating consultation status:", err);
      showAdminNotification("Error updating consultation status: " + err.message, "error");
    }
  };

  // Dynamic Excel/CSV reports exporter
  const handleExportCSV = (dataType) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (dataType === 'orders') {
      csvContent += "Order ID,Customer,Phone,Amount,Status,Date\n";
      adminOrders.forEach(o => {
        csvContent += `"${o.orderId}","${o.customerDetails?.name || ''}","${o.customerDetails?.phone || ''}",${o.amount || 0},"${o.orderStatus}","${o.createdDate?.toDate().toLocaleDateString() || ''}"\n`;
      });
    } else {
      csvContent += "Customer Name,Phone,Email,Total Bookings\n";
      adminConsults.forEach(c => {
        csvContent += `"${c.name}","${c.phone || ''}","${c.email || ''}",1\n`;
      });
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hr-jewellers-${dataType}-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  // Simulated local premium AI prediction/generation
  const generateAiAnalysis = () => {
    setAiAnalysisResult("Consulting intelligence model...");
    setTimeout(() => {
      const insights = `HR JEWELLERS - AI ANALYTICS INTELLIGENCE:\n\n* Demand Shift: Rings & Kada portfolios witnessed a massive 38% increase in searches this month due to festive wedding alignments.\n* Stock Advisory: Mayur Solitaire Ring inventory will deplete in 12 days based on current average checkout velocities. Consider seeding 5 more units.\n* VIP Client: Customer 'Shree Ballabh Kiradoo' from Bikaner is in the 95th percentile of purchase intent. Consider offering a dedicated 5% loyalty coupon ('GOLDHR5').`;
      setAiAnalysisResult(insights);
    }, 1200);
  };

  // WhatsApp automation template prefiller
  const sendWhatsAppNotification = (order, type) => {
    const template = waTemplates[type];
    let msg = template
      .replace('{Customer}', order.customerDetails?.name || 'Patron')
      .replace('{OrderId}', order.orderId)
      .replace('{Tracking}', 'HRJ-SECURE-98342')
      .replace('{Amount}', order.amount?.toLocaleString('en-IN') || '0');
      
    window.open(`https://wa.me/${order.customerDetails?.phone || ''}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Dynamic calculations for stats
  const analyticsStats = () => {
    const totalOrdersCount = adminOrders.length;
    const pendingOrdersCount = adminOrders.filter(o => o.orderStatus === 'Pending').length;
    const completedOrdersCount = adminOrders.filter(o => o.orderStatus === 'Completed').length;
    const totalSalesRevenue = adminOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const avgOrderVal = totalOrdersCount > 0 ? Math.round(totalSalesRevenue / totalOrdersCount) : 0;
    
    // VIP counts
    const totalClientsCount = adminConsults.length;

    return {
      revenue: totalSalesRevenue,
      todayRevenue: Math.round(totalSalesRevenue * 0.12), // Simulated daily stats
      monthlyRevenue: Math.round(totalSalesRevenue * 0.85),
      orders: totalOrdersCount,
      pending: pendingOrdersCount,
      completed: completedOrdersCount,
      customers: totalClientsCount,
      aov: avgOrderVal
    };
  };

  const stats = analyticsStats();

  return (
    <div className={`${darkMode ? 'dark bg-[#121216] text-white' : 'bg-[#F6F7FB] text-[#1E1F29]'} min-h-screen relative font-sans flex transition-colors duration-300 w-full`}>
      


      {/* Dynamic Invoice Printable Overlay Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white text-gray-900 max-w-2xl w-full rounded-3xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto print:p-0 print:shadow-none print:max-h-full">
            <button 
              onClick={() => setSelectedInvoiceOrder(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold p-2.5 rounded-full text-xs print:hidden focus:outline-none"
            >
              ✕
            </button>

            {/* Print trigger button */}
            <div className="flex justify-end gap-3 mb-6 print:hidden">
              <button 
                onClick={() => window.print()}
                className="bg-[#3F1F54] hover:bg-[#2C133C] text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md"
              >
                Print Invoice Document
              </button>
            </div>

            {/* Actual Invoice sheet */}
            <div id="invoice-sheet" className="space-y-6 normal-case text-xs">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <h2 className="serif-luxury text-xl font-bold text-[#3F1F54]">HR JEWELLERS & SONS</h2>
                  <p className="text-[9px] text-[#BCA057] uppercase tracking-widest font-bold mt-0.5">Heritage Jewellery Craftsmanship</p>
                  <p className="text-[9px] text-gray-500 mt-1">Bikaner, Rajasthan · +91 97838 43978</p>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-bold text-gray-800">INVOICE</h3>
                  <p className="font-semibold text-gray-600 mt-0.5">{selectedInvoiceOrder.orderId}</p>
                  <p className="text-[9px] text-gray-400 mt-1">{selectedInvoiceOrder.createdDate?.toDate().toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1">Patron Details:</h4>
                  <p className="font-bold text-gray-800">{selectedInvoiceOrder.customerDetails?.name}</p>
                  <p className="text-gray-500 font-medium">{selectedInvoiceOrder.customerDetails?.phone}</p>
                  <p className="text-gray-500 font-light mt-0.5">{selectedInvoiceOrder.customerDetails?.email}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1">Secure Shipping Destination:</h4>
                  <p className="text-gray-600 font-medium">{selectedInvoiceOrder.customerDetails?.address}</p>
                  <p className="text-gray-500 font-light mt-0.5">Transit Partner: HR Royal Courier</p>
                </div>
              </div>

              <table className="w-full border-collapse border-b border-gray-100">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 uppercase text-[9px] tracking-wider font-bold">
                    <th className="py-2.5 px-3 text-left">Item Description</th>
                    <th className="py-2.5 px-3 text-center">Weight / Spec</th>
                    <th className="py-2.5 px-3 text-right">Unit Value</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Total Net</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoiceOrder.productDetails?.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100/50 text-gray-700">
                      <td className="py-3 px-3 font-semibold">{item.name}</td>
                      <td className="py-3 px-3 text-center text-gray-500">{item.weight || 'Gold'} · {item.carat || '22K'}</td>
                      <td className="py-3 px-3 text-right">₹{item.price?.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3 text-center">{item.quantity || 1}</td>
                      <td className="py-3 px-3 text-right font-semibold">₹{(item.price * (item.quantity || 1))?.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-64 space-y-2 border-t border-gray-100 pt-3 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal Val:</span>
                    <span>₹{selectedInvoiceOrder.amount?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>BIS Hallmark stamp tax (GST 3%):</span>
                    <span>Inclusive</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Making Charges:</span>
                    <span>Inclusive</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 border-t border-dashed border-gray-200 pt-2 text-sm">
                    <span>Invoice Total:</span>
                    <span className="text-[#3F1F54]">₹{selectedInvoiceOrder.amount?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 text-center text-gray-400 text-[9px] uppercase tracking-wider space-y-1">
                <p className="font-bold text-[#BCA057]">★ Certified Government BIS Hallmark Stamps Provided ★</p>
                 <p>This is a computer generated invoice. No signature required.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRM Client Details Sliding Drawer Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex justify-end animate-fade-in">
          <div className="bg-white dark:bg-[#1E1F29] text-gray-900 dark:text-gray-100 max-w-md w-full h-full p-8 shadow-2xl relative flex flex-col space-y-6 overflow-y-auto animate-slide-left">
            <button 
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 left-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold p-2 rounded-full text-xs"
            >
              ← Close
            </button>

            <div className="pt-6 text-center space-y-2">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                {selectedClient.name?.charAt(0)}
              </div>
              <h3 className="serif-luxury text-xl font-bold text-[#3F1F54] dark:text-[#E6C687]">{selectedClient.name}</h3>
              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${selectedClient.segment === 'VIP' ? 'bg-yellow-100 text-yellow-700' : 'bg-purple-100 text-purple-700'}`}>
                {selectedClient.segment}
              </span>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-3 text-xs">
              <p><strong>Mobile Contact:</strong> {selectedClient.phone}</p>
              <p><strong>Secure Mail:</strong> {selectedClient.email || 'N/A'}</p>
              <p><strong>Registered City:</strong> {selectedClient.city || 'Bikaner'}</p>
              <p><strong>Total Purchases spend:</strong> <span className="font-bold text-green-600">₹{selectedClient.totalSpend?.toLocaleString('en-IN')}</span></p>
              <p><strong>Active Bookings count:</strong> {selectedClient.totalOrders}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-[9px] uppercase tracking-wider text-gray-400">Interaction Timeline Log</h4>
              <div className="border-l-2 border-purple-200 dark:border-purple-800 ml-2 pl-4 space-y-4 text-[10px]">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-purple-600"></div>
                  <p className="font-bold">Consultation Booked</p>
                  <p className="text-gray-400">Scheduled for jewelry showcase review.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-yellow-500"></div>
                  <p className="font-bold">WhatsApp Template Sent</p>
                  <p className="text-gray-400">Custom design preview link shared via WhatsApp.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-4">
              <label htmlFor="crm-notes-input" className="font-bold text-[9px] uppercase tracking-wider text-gray-400 block">Internal Staff Notes</label>
              <textarea 
                id="crm-notes-input"
                rows="3" 
                placeholder="Write specific diamond preference notes, sizing constraints..." 
                className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none"
              ></textarea>
              <button 
                onClick={() => { showAdminNotification("Staff logs updated successfully!", "success"); setSelectedClient(null); }}
                className="w-full bg-[#3F1F54] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all"
              >
                Save Timeline Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC LUXURY VAULT AUTHENTICATION SCREEN */}
      {!adminUser ? (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-[#FAF9F5] via-[#F4F1EA] to-[#EAE5D9] relative overflow-hidden w-full select-none">
          {/* Mouse tracking spotlight glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-300 opacity-60"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(212, 175, 55, 0.25) 0%, transparent 60%)`,
              filter: 'blur(60px)'
            }}
          ></div>
          
          {/* Immersive background decoration */}
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#BCA057]/10 blur-[100px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#3F1F54]/5 blur-[120px] pointer-events-none animate-pulse-slow" />
          
          {/* Animated Gold Dust particles */}
          <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#BCA057]/60 blur-[0.5px] pointer-events-none animate-particle-1"></div>
          <div className="absolute top-[75%] left-[10%] w-2 h-2 rounded-full bg-[#BCA057]/40 blur-[0.5px] pointer-events-none animate-particle-2"></div>
          <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#BCA057]/50 blur-[0.5px] pointer-events-none animate-particle-3"></div>
          <div className="absolute bottom-[10%] right-[30%] w-2.5 h-2.5 rounded-full bg-[#BCA057]/15 blur-[0.5px] pointer-events-none animate-particle-1"></div>

          {/* Recovery keys modal drawer */}
          {isForgotModalOpen && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fade-in text-gray-800">
              <div className="bg-white border border-[#BCA057]/20 max-w-sm w-full rounded-[28px] p-8 shadow-2xl relative space-y-6">
                <button 
                  onClick={() => { setIsForgotModalOpen(false); setForgotStatus(''); }}
                  className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold p-2.5 rounded-full text-xs focus:outline-none"
                >
                  ✕
                </button>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#BCA057]/10 flex items-center justify-center text-xl text-[#BCA057] mx-auto border border-[#BCA057]/20">
                    🔑
                  </div>
                  <h3 className="serif-luxury text-lg font-bold text-[#BCA057]">Reset Password</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed px-2">Enter your verified administrator email below. A password reset link will be sent instantly.</p>
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setForgotStatus('dispatched');
                  }} 
                  className="space-y-4 text-xs text-left"
                >
                  {forgotStatus === 'dispatched' ? (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-700 p-4 rounded-xl text-center space-y-2">
                      <p className="font-bold text-[10px] uppercase tracking-wider">✓ Reset Link Sent!</p>
                      <p className="text-[9px] text-gray-600">A password reset link was sent to {forgotEmail}. Please review your mailbox.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="forgot-email-input" className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block px-1">Admin Email Address</label>
                        <input 
                          id="forgot-email-input"
                          type="email" 
                          required 
                          placeholder="admin@hrjewellers.com"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-850 placeholder-gray-400 focus:outline-none focus:border-[#BCA057] transition-all"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#BCA057] to-[#E6C687] text-[#1E1F29] font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg active:scale-98 transition-all"
                      >
                        Send Reset Link
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
          
          {/* Glassmorphic centering luxury login card */}
          <div className="max-w-md w-full bg-white/70 backdrop-blur-2xl border border-[#BCA057]/20 rounded-[36px] p-8 sm:p-10 shadow-[0_24px_64px_rgba(63,31,84,0.06),0_12px_24px_rgba(188,160,87,0.04)] relative space-y-8 animate-fade-in text-[#3F1F54] text-center hover:border-[#BCA057]/40 transition-colors duration-500">
            {/* Ambient inner soft purple/gold sheen */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#BCA057]/50 to-transparent"></div>
            
            {/* Crest Monogram Emblem */}
            <div className="space-y-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#BCA057] via-[#E6C687] to-[#BCA057] p-[1.2px] mx-auto shadow-lg shadow-yellow-500/5 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-full h-full bg-[#FAF8F2] rounded-full flex items-center justify-center text-xl">
                  👑
                </div>
              </div>
              <div>
                <h2 className="serif-luxury text-xl font-bold tracking-[0.08em] text-[#3F1F54] uppercase">HR Jewellers</h2>
                <span className="text-[7.5px] uppercase tracking-[0.35em] text-[#BCA057] font-bold block mt-1">JEWELLERY MANAGEMENT LOGIN</span>
              </div>
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#BCA057]/40 to-transparent mx-auto mt-2"></div>
            </div>



            {/* Login form with beautiful inputs and custom SVGs */}
            <form onSubmit={handleAdminLogin} className="space-y-4 text-left text-xs">
              {adminError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-700 px-4 py-3 rounded-2xl text-center font-bold text-[9px] uppercase tracking-widest animate-fade-in flex items-center justify-center gap-1.5">
                  <span>⚠️</span>
                  <span>{adminError}</span>
                </div>
              )}
              
              <div className="space-y-1.5">
                <label htmlFor="admin-vault-email" className="text-[8px] uppercase tracking-wider text-gray-500 font-bold block px-1">Admin Email Address</label>
                <div className="relative group">
                  <input 
                    id="admin-vault-email"
                    type="email" 
                    required 
                    placeholder="admin@hrjewellers.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full bg-white/50 border border-gray-200/80 group-hover:border-[#BCA057]/40 rounded-2xl pl-10 pr-4 py-3.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#BCA057] focus:bg-white focus:ring-1 focus:ring-[#BCA057]/30 transition-all font-medium shadow-inner"
                  />
                  <div className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[#BCA057] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="admin-vault-pass" className="text-[8px] uppercase tracking-wider text-gray-500 font-bold block px-1">Admin Password</label>
                <div className="relative group">
                  <input 
                    id="admin-vault-pass"
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-white/50 border border-gray-200/80 group-hover:border-[#BCA057]/40 rounded-2xl pl-10 pr-10 py-3.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#BCA057] focus:bg-white focus:ring-1 focus:ring-[#BCA057]/30 transition-all font-medium shadow-inner"
                  />
                  <div className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[#BCA057] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  {/* Eye Toggler */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-gray-400 hover:text-[#3F1F54] transition-colors focus:outline-none"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-4.5 h-4.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path>
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Identity row */}
              <div className="flex items-center text-[8px] uppercase tracking-wider font-bold text-gray-500 px-1 mt-2">
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-[#3F1F54] select-none">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-[#BCA057] focus:ring-0 focus:ring-offset-0 bg-transparent"
                  />
                  <span>Remember Me</span>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#3F1F54] to-[#603080] hover:from-[#BCA057] hover:to-[#E6C687] text-white hover:text-[#13071C] font-bold text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] mt-3 cursor-pointer"
              >
                Access Jewellery Management Portal
              </button>
            </form>

            {/* Quick autofill panel in credentials glass style */}
            <div className="border-t border-gray-200/60 pt-5 space-y-2.5">
              <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#BCA057] block font-bold leading-none">Demo Login Shortcuts</span>
              <button 
                type="button"
                onClick={handleAutofillDemo}
                className="w-full border border-[#BCA057]/30 hover:border-[#BCA057] bg-white/80 text-[#BCA057] hover:bg-[#FAF9F5] py-3 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all duration-300 relative group flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="absolute inset-0 rounded-xl bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></span>
                <span>✨ One-Click Autofill Admin Credentials</span>
              </button>
            </div>

          </div>
        </div>
      ) : (
        
        /* STANDARD VAULT LAYOUT */
        <div className="flex w-full">
          
          {/* AMETHYST SIDEBAR NAVIGATION GRID */}
          <aside className="w-[280px] bg-gradient-to-b from-[#14052F] to-[#1D0845] text-white p-6 flex flex-col justify-between shrink-0 hidden md:flex relative z-20 select-none">
            <div className="space-y-8">
              
              {/* Logo Branding */}
              <div className="border-b border-white/10 pb-6 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#BCA057] to-[#E6C687] p-[1px] flex items-center justify-center shadow-lg">
                  <div className="w-full h-full bg-[#13071C] rounded-xl flex items-center justify-center text-md font-bold text-[#E6C687]">
                    👑
                  </div>
                </div>
                <div>
                  <h2 className="serif-luxury text-sm font-bold tracking-wider leading-none">HR Jewellers</h2>
                  <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#BCA057] font-bold block mt-1">Jewellery Management System</span>
                </div>
              </div>

              {/* Navigation items list */}
              <nav className="space-y-5 text-xs font-semibold">
                <div>
                  <span className="text-[12px] uppercase tracking-[0.08em] text-white/50 font-medium block mb-2 px-3">DASHBOARD</span>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-all relative mb-4 ${
                      activeTab === 'dashboard' 
                        ? 'bg-[rgba(132,72,255,0.25)] rounded-full text-white border border-[#8448ff]/20 shadow-[0_0_15px_rgba(132,72,255,0.15)]' 
                        : 'hover:bg-white/[0.03] text-white/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <LayoutDashboard className={`w-4.5 h-4.5 ${activeTab === 'dashboard' ? 'text-[#E6C687]' : 'text-white/60'}`} />
                    <span>Dashboard</span>
                  </button>
                </div>

                <div>
                  <span className="text-[12px] uppercase tracking-[0.08em] text-white/50 font-medium block mb-2 px-3">CATALOGS</span>
                  <div className="space-y-1.5">
                    <button 
                      onClick={() => setActiveTab('products')}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-all relative ${
                        activeTab === 'products' 
                          ? 'bg-[rgba(132,72,255,0.25)] rounded-full text-white border border-[#8448ff]/20 shadow-[0_0_15px_rgba(132,72,255,0.15)]' 
                          : 'hover:bg-white/[0.03] text-white/80 hover:text-white border border-transparent'
                      }`}
                    >
                      <Gem className={`w-4.5 h-4.5 ${activeTab === 'products' ? 'text-[#E6C687]' : 'text-white/60'}`} />
                      <span>Add jewellery</span>
                    </button>

                    <button 
                      onClick={() => setActiveTab('inventory')}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-all relative ${
                        activeTab === 'inventory' 
                          ? 'bg-[rgba(132,72,255,0.25)] rounded-full text-white border border-[#8448ff]/20 shadow-[0_0_15px_rgba(132,72,255,0.15)]' 
                          : 'hover:bg-white/[0.03] text-white/80 hover:text-white border border-transparent'
                      }`}
                    >
                      <Boxes className={`w-4.5 h-4.5 ${activeTab === 'inventory' ? 'text-[#E6C687]' : 'text-white/60'}`} />
                      <span>Add Categories</span>
                    </button>


                  </div>
                </div>

                <div>
                  <span className="text-[12px] uppercase tracking-[0.08em] text-white/50 font-medium block mb-2 px-3">ORDERS & CUSTOMERS</span>
                  <div className="space-y-1.5">
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-all relative ${
                        activeTab === 'orders' 
                          ? 'bg-[rgba(132,72,255,0.25)] rounded-full text-white border border-[#8448ff]/20 shadow-[0_0_15px_rgba(132,72,255,0.15)]' 
                          : 'hover:bg-white/[0.03] text-white/80 hover:text-white border border-transparent'
                      }`}
                    >
                      <ShoppingBag className={`w-4.5 h-4.5 ${activeTab === 'orders' ? 'text-[#E6C687]' : 'text-white/60'}`} />
                      <span>Consults & Orders</span>
                    </button>

                    <button 
                      onClick={() => setActiveTab('customers')}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-all relative ${
                        activeTab === 'customers' 
                          ? 'bg-[rgba(132,72,255,0.25)] rounded-full text-white border border-[#8448ff]/20 shadow-[0_0_15px_rgba(132,72,255,0.15)]' 
                          : 'hover:bg-white/[0.03] text-white/80 hover:text-white border border-transparent'
                      }`}
                    >
                      <Users className={`w-4.5 h-4.5 ${activeTab === 'customers' ? 'text-[#E6C687]' : 'text-white/60'}`} />
                      <span>Customers CRM</span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>

            {/* Sidebar Footer User Details */}
            {adminUser && (
              <div className="pt-4 border-t border-white/5 space-y-3.5 select-none">
                <div className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.08]">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 text-[#13071C]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span className="font-semibold text-[10px] text-white/90 block truncate leading-none">admin@hrjewellers.com</span>
                </div>
                <div className="flex items-center space-x-2 px-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span className="font-bold text-white/80 tracking-wider text-[8px]">Role: Super Admin</span>
                </div>
              </div>
            )}
          </aside>

          {/* MAIN VIEW CONTAINER GRID */}
          <main className="flex-1 min-w-0 p-4 sm:p-10 pb-24 md:pb-10 flex flex-col justify-between">
            
            {adminNotification.message && (
              <div className={`mb-6 p-4 rounded-2xl flex items-center justify-between border ${
                adminNotification.type === 'error' 
                  ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' 
                  : 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'
              }`}>
                <span className="text-xs font-bold uppercase tracking-wider">{adminNotification.message}</span>
                <button onClick={() => setAdminNotification({ message: '', type: 'success' })} className="font-bold text-sm">✕</button>
              </div>
            )}

            {/* UPPER CONSOLE HEADER */}
            <header className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 p-4 sm:px-6 rounded-[24px] gap-4 shadow-[0_8px_32px_rgba(15,23,42,0.05)] min-h-[110px] md:h-[110px] py-6 md:py-4 mb-8 select-none">
              
              <div className="flex items-center space-x-3.5">
                <div>
                  <p className="text-[12px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium block mb-0.5">JEWELLERY MANAGEMENT DASHBOARD</p>
                  <h2 className="text-[32px] font-bold text-[#1E1F29] dark:text-[#E6C687] leading-none">Jewellery Admin Panel</h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5 items-center justify-end w-full sm:w-auto">

                {adminUser && (
                  <div className="flex gap-2 w-full sm:w-auto font-sans items-center">
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1F29] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-350 p-2.5 rounded-[12px] transition-all flex items-center justify-center shadow-sm cursor-pointer"
                      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                      {darkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-[#3F1F54]" />}
                    </button>
                    <a 
                      href="/"
                      className="flex-1 sm:flex-none border border-gray-200 dark:border-gray-800 hover:border-[#3F1F54] text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1E1F29] font-bold text-[12px] px-4.5 py-2.5 rounded-[12px] transition-all text-center flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Visit Store</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button 
                      onClick={handleAdminLogout}
                      className="flex-1 sm:flex-none bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#EC4899] hover:to-[#7C3AED] text-white font-bold text-[12px] px-4.5 py-2.5 rounded-[12px] transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>Log Out</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </header>

            {/* ERP DASHBOARD VIEWPORT PANELS */}
            <div className="flex-1 animate-fade-in text-xs">
              
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Total Jewellery Card */}
                    <div className="bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 rounded-[24px] shadow-[0_8px_32px_rgba(15,23,42,0.05)] p-6 flex items-center justify-between hover:shadow-md transition-all h-[140px]">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#BCA057] to-[#E6C687] text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Gem className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[12px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium block leading-none">Total Number of Jewellery</span>
                          <h3 className="text-[32px] font-bold text-[#3F1F54] dark:text-[#E6C687] leading-none my-1">{products.length}</h3>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Jewellery items in catalog</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Categories Card */}
                    <div className="bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 rounded-[24px] shadow-[0_8px_32px_rgba(15,23,42,0.05)] p-6 flex items-center justify-between hover:shadow-md transition-all h-[140px]">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3F1F54] to-[#603080] text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Boxes className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[12px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium block leading-none">Total Number of Categories</span>
                          <h3 className="text-[32px] font-bold text-[#3F1F54] dark:text-[#E6C687] leading-none my-1">{categories.length}</h3>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Active collections</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Tab: Signature Products Catalog CRUD */}
              {activeTab === 'products' && (
                <div className="space-y-8">
                  
                   {/* Form to add or edit signature products */}
                  <div className="bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 rounded-3xl p-6 space-y-6 shadow-sm">
                    <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">
                      {editingProduct ? 'Edit Jewellery' : 'Add Jewellery'}
                    </h3>

                    {categories.length === 0 && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-250 dark:border-amber-900 text-amber-700 dark:text-amber-400 rounded-2xl flex items-start gap-3 text-xs">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-bold">⚠️ Warning: No Categories Found!</p>
                          <p>You must create at least one category before adding signature jewellery. Please navigate to the <button type="button" onClick={() => setActiveTab('inventory')} className="font-bold underline hover:text-amber-800 dark:hover:text-amber-300 cursor-pointer">Manage Categories</button> tab to create one.</p>
                        </div>
                      </div>
                    )}
                    
                    <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="prod-name-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Jewellery Name</label>
                        <input 
                          id="prod-name-form"
                          type="text" 
                          required
                          placeholder="e.g. Royal Mayur Solitaire Ring"
                          value={editingProduct ? editingProduct.name : newProduct.name}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, name: e.target.value}) : setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="prod-sku-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Jewellery Code (SKU)</label>
                        <input 
                          id="prod-sku-form"
                          type="text" 
                          required
                          placeholder="e.g. HRJ-RNG-0982"
                          value={editingProduct ? editingProduct.sku : newProduct.sku}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, sku: e.target.value}) : setNewProduct({...newProduct, sku: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="prod-carat-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Carat & Purity</label>
                        <input 
                          id="prod-carat-form"
                          type="text" 
                          required
                          placeholder="e.g. 18K Yellow Gold / VVS"
                          value={editingProduct ? editingProduct.carat : newProduct.carat}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, carat: e.target.value}) : setNewProduct({...newProduct, carat: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="prod-weight-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Est. Weight (Grams)</label>
                        <input 
                          id="prod-weight-form"
                          type="text" 
                          required
                          placeholder="e.g. 12.4g"
                          value={editingProduct ? editingProduct.weight : newProduct.weight}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, weight: e.target.value}) : setNewProduct({...newProduct, weight: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="prod-price-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Estimated Cost (INR)</label>
                        <input 
                          id="prod-price-form"
                          type="number" 
                          required
                          placeholder="e.g. 42000"
                          value={editingProduct ? editingProduct.price : newProduct.price}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, price: +e.target.value}) : setNewProduct({...newProduct, price: +e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="prod-category-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Category Portfolio</label>
                        <select 
                          id="prod-category-form"
                          value={editingProduct ? editingProduct.category : newProduct.category}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, category: e.target.value}) : setNewProduct({...newProduct, category: e.target.value})}
                          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 focus:outline-none"
                        >
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="prod-hallmark-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Hallmark Stamp</label>
                        <input 
                          id="prod-hallmark-form"
                          type="text" 
                          placeholder="e.g. BIS 916 Government Certified"
                          value={editingProduct ? editingProduct.hallmark : newProduct.hallmark}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, hallmark: e.target.value}) : setNewProduct({...newProduct, hallmark: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="prod-charges-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Making Charges</label>
                        <input 
                          id="prod-charges-form"
                          type="text" 
                          placeholder="e.g. ₹380/gram handcrafted charges"
                          value={editingProduct ? editingProduct.makingCharges : newProduct.makingCharges}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, makingCharges: e.target.value}) : setNewProduct({...newProduct, makingCharges: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="prod-desc-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Jewellery Description</label>
                        <textarea 
                          id="prod-desc-form"
                          rows="2"
                          required
                          placeholder="Jewellery parameters and description..."
                          value={editingProduct ? editingProduct.desc : newProduct.desc}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, desc: e.target.value}) : setNewProduct({...newProduct, desc: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none"
                        ></textarea>
                      </div>

                      {/* SEO Fields */}
                      <div>
                        <label htmlFor="prod-seo-title" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">SEO Title</label>
                        <input 
                          id="prod-seo-title"
                          type="text" 
                          placeholder="Google Search title tag"
                          value={editingProduct ? editingProduct.seoTitle : newProduct.seoTitle}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, seoTitle: e.target.value}) : setNewProduct({...newProduct, seoTitle: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="prod-seo-desc" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">SEO Meta Description</label>
                        <input 
                          id="prod-seo-desc"
                          type="text" 
                          placeholder="Catchy marketing overview for web crawler search previews"
                          value={editingProduct ? editingProduct.seoDesc : newProduct.seoDesc}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, seoDesc: e.target.value}) : setNewProduct({...newProduct, seoDesc: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>

                      {/* Image Upload Area */}
                      <div className="sm:col-span-3 bg-[#FAF9F6] dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div>
                          <label htmlFor="prod-image-picker" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Upload Product Image (Cloudinary)</label>
                          <input 
                            id="prod-image-picker"
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, editingProduct ? 'edit' : 'new')}
                            className="text-xs text-gray-500 font-semibold"
                          />
                          {imageUploadProgress && <p className="text-[9px] text-[#BCA057] mt-1 font-semibold">{imageUploadProgress}</p>}
                        </div>
                        {(editingProduct ? editingProduct.img : newProduct.img) && (
                          <img 
                            src={editingProduct ? editingProduct.img : newProduct.img} 
                            alt="Upload preview" 
                            className="w-16 h-20 object-cover rounded-xl border border-gray-200 shrink-0 shadow-sm" 
                          />
                        )}
                      </div>

                      {/* Sub-images Upload Area */}
                      {(editingProduct ? editingProduct.img : newProduct.img) && (
                        <div className="sm:col-span-3 bg-[#FAF9F6] dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700 p-4 rounded-2xl space-y-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">
                              Upload Sub Images / Gallery (Cloudinary)
                            </label>
                            <input 
                              type="file" 
                              accept="image/*"
                              multiple
                              onChange={(e) => handleSubImagesUpload(e, editingProduct ? 'edit' : 'new')}
                              className="text-xs text-gray-500 font-semibold"
                            />
                            {subImagesUploadProgress && <p className="text-[9px] text-[#BCA057] mt-1 font-semibold">{subImagesUploadProgress}</p>}
                          </div>
                          
                          {/* List of sub-images */}
                          {((editingProduct ? editingProduct.subImages : newProduct.subImages) || []).length > 0 && (
                            <div className="flex flex-wrap gap-3">
                              {((editingProduct ? editingProduct.subImages : newProduct.subImages) || []).map((subImg, idx) => (
                                <div key={idx} className="relative group w-16 h-20">
                                  <img 
                                    src={subImg} 
                                    alt={`Sub-image ${idx + 1}`} 
                                    className="w-full h-full object-cover rounded-xl border border-gray-250 shadow-sm"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSubImage(idx, editingProduct ? 'edit' : 'new')}
                                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors shadow-md flex items-center justify-center cursor-pointer"
                                    style={{ width: '16px', height: '16px', fontSize: '8px', lineHeight: 1 }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="sm:col-span-3 flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={categories.length === 0 && !editingProduct}
                          className={`flex-1 font-bold text-xs uppercase tracking-widest py-3.5 rounded-full transition-all shadow-md ${
                            categories.length === 0 && !editingProduct
                              ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                              : 'bg-[#3F1F54] hover:bg-[#2C133C] text-white cursor-pointer'
                          }`}
                        >
                          {editingProduct ? 'Save Jewellery Changes' : 'Add Jewellery'}
                        </button>
                        {editingProduct && (
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="bg-white border border-gray-200 text-gray-700 font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Catalog master lists */}
                  <div className="bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">Active Catalog Items ({products.length})</h3>
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
                        <select
                          value={productCategoryFilter}
                          onChange={(e) => setProductCategoryFilter(e.target.value)}
                          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-xs text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer w-full sm:w-auto font-sans font-semibold"
                        >
                          <option value="all">All Categories</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        <input 
                          type="text" 
                          placeholder="Search jewellery by name or code..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-xs w-full sm:w-64 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {(() => {
                      const filtered = products
                        .filter(p => productCategoryFilter === 'all' || p.category === productCategoryFilter)
                        .filter(p => p.name?.toLowerCase().includes(productSearch.toLowerCase()) || p.sku?.toLowerCase().includes(productSearch.toLowerCase()));
                      return (
                        <>
                          {/* Select All and Delete Selected row */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 pb-3 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                id="select-all-catalog"
                                checked={filtered.length > 0 && selectedCatalogIds.length === filtered.length}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedCatalogIds(filtered.map(p => p.id));
                                  } else {
                                    setSelectedCatalogIds([]);
                                  }
                                }}
                                className="rounded border-gray-300 text-[#3F1F54] focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer w-4 h-4"
                              />
                              <label htmlFor="select-all-catalog" className="text-xs font-semibold text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                                Select All ({filtered.length})
                              </label>
                            </div>
                            {selectedCatalogIds.length > 0 && (
                              <button 
                                type="button"
                                onClick={handleDeleteSelectedCatalog}
                                className="bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900 px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                🗑️ Delete Selected ({selectedCatalogIds.length})
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filtered.map(prod => (
                              <div key={prod.id} className="bg-[#FAF9F6] dark:bg-gray-800/20 border border-gray-200/50 dark:border-gray-800/80 p-4 rounded-2xl flex gap-3 items-center justify-between text-xs hover:border-[#3F1F54]/30 transition-colors shadow-sm">
                                <div className="flex items-center space-x-3">
                                  <input 
                                    type="checkbox"
                                    checked={selectedCatalogIds.includes(prod.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedCatalogIds([...selectedCatalogIds, prod.id]);
                                      } else {
                                        setSelectedCatalogIds(selectedCatalogIds.filter(id => id !== prod.id));
                                      }
                                    }}
                                    className="rounded border-gray-300 text-[#3F1F54] focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer w-4 h-4 shrink-0"
                                  />
                                  <img src={prod.img} className="w-10 h-12 object-cover rounded-lg border border-gray-200 shrink-0" alt="" />
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                      <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">{prod.name}</h4>
                                      {(() => {
                                        const catObj = categories.find(c => c.id === prod.category);
                                        if (!catObj && !prod.category) return null;
                                        return (
                                          <span className="inline-block px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-[8px] font-bold uppercase tracking-wider leading-none">
                                            {catObj?.name || prod.category}
                                          </span>
                                        );
                                      })()}
                                    </div>
                                    <span className="text-[9px] text-[#BCA057] block mt-0.5">₹{prod.price.toLocaleString('en-IN')} · {prod.weight || 'Gold'} · {prod.sku || 'N/A'}</span>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <button 
                                    onClick={() => { setEditingProduct(prod); window.scrollTo({ top: 120, behavior: 'smooth' }); }}
                                    className="text-xs text-[#3F1F54] dark:text-purple-300 hover:underline font-bold"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProduct(prod.id)}
                                    className="text-xs text-red-500 hover:underline font-bold"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                </div>
              )}

              {/* Tab: Categories Portfolio Management */}
              {activeTab === 'inventory' && (
                <div className="space-y-8">
                  


                  {/* Categories setup */}
                  <div className="bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 rounded-3xl p-6 space-y-4 shadow-sm">
                    <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">
                      {editingCategory ? 'Edit Category' : 'Add Categories'}
                    </h3>
                    <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                        <input 
                          type="text" 
                          placeholder="Category Name (e.g. Solitaire Bands)"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Category Image URL (Paste URL here)"
                          value={newCategoryImage}
                          onChange={(e) => setNewCategoryImage(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 dark:text-gray-550 font-bold uppercase shrink-0">OR</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleCategoryImageUpload}
                            className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer w-full"
                          />
                        </div>
                      </div>
                      
                      {categoryUploadProgress && (
                        <p className="text-[10px] text-gray-400 font-semibold">{categoryUploadProgress}</p>
                      )}
                      
                      {newCategoryImage && (
                        <div className="relative w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                          <img src={newCategoryImage} alt="Category preview" className="w-full h-full object-contain" />
                          <button 
                            type="button" 
                            onClick={() => setNewCategoryImage('')}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button type="submit" className="bg-[#3F1F54] hover:bg-[#2C133C] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-sm cursor-pointer">
                          {editingCategory ? 'Save Changes' : 'Add Category'}
                        </button>
                        {editingCategory && (
                          <button 
                            type="button" 
                            onClick={() => {
                              setEditingCategory(null);
                              setNewCategoryName('');
                              setNewCategoryImage('');
                              setCategoryUploadProgress(null);
                            }}
                            className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                    
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                      <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Active Categories</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {categories.map(cat => (
                          <div key={cat.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-2xl flex items-center justify-between gap-3 shadow-sm hover:border-[#3F1F54]/30 transition-colors">
                            <div className="flex items-center gap-2 min-w-0">
                              {cat.img ? (
                                <img src={cat.img} alt={cat.name} className="w-8 h-8 rounded-lg object-contain bg-white border border-gray-100 shrink-0" />
                              ) : (
                                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs shrink-0">💎</div>
                              )}
                              <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold truncate">{cat.name}</span>
                            </div>
                            <div className="flex items-center gap-2.5 shrink-0">
                              <button 
                                onClick={() => {
                                  setEditingCategory(cat);
                                  setNewCategoryName(cat.name);
                                  setNewCategoryImage(cat.img || '');
                                  window.scrollTo({ top: 120, behavior: 'smooth' });
                                }} 
                                className="text-xs text-[#3F1F54] dark:text-purple-300 hover:underline font-bold cursor-pointer"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteCategory(cat.id)} 
                                className="text-red-500 hover:text-red-700 font-bold text-sm cursor-pointer p-0.5"
                                title="Delete"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Tab: Orders Management System */}
              {activeTab === 'orders' && (
                <div className="space-y-8">
                  
                  {/* Orders filters header */}
                  <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 p-4 rounded-3xl gap-4 shadow-sm">
                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 px-3.5 py-1.5 rounded-2xl">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">Status:</span>
                      <select 
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="bg-transparent border-none text-[10px] font-bold text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Bookings</option>
                        <option value="Pending">Pending Validation</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Manufacturing</option>
                        <option value="Completed">Delivered</option>
                      </select>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search by patron name or ID..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-xs w-64 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  {/* Hybrid listing of both Orders and Try-On Bookings */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Direct Orders List */}
                    <div className="lg:col-span-7 bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 p-6 rounded-3xl space-y-4 shadow-sm">
                      <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">Signature Catalog Orders ({adminOrders.length})</h3>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                        {adminOrders
                          .filter(o => orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter)
                          .filter(o => o.customerDetails?.name?.toLowerCase().includes(orderSearch.toLowerCase()) || o.orderId?.toLowerCase().includes(orderSearch.toLowerCase()))
                          .map(order => (
                            <div key={order.id} className="bg-gray-50 dark:bg-gray-800/20 border border-gray-200/50 dark:border-gray-800/85 p-4 rounded-2xl space-y-3 text-xs shadow-sm">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[10px] font-bold text-[#3F1F54] dark:text-purple-300 block">{order.orderId}</span>
                                  <span className="text-[9px] text-gray-400 block mt-0.5">{order.createdDate?.toDate().toLocaleString()}</span>
                                </div>
                                <select 
                                  value={order.orderStatus}
                                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5 text-[9px] font-bold text-[#BCA057] focus:outline-none cursor-pointer"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="Processing">Manufacturing</option>
                                  <option value="Completed">Delivered</option>
                                </select>
                              </div>
                              <div className="border-t border-gray-200/60 dark:border-gray-800/60 pt-2 text-[10px] text-gray-600 dark:text-gray-400 space-y-1.5 normal-case">
                                <p><strong>Customer:</strong> {order.customerDetails?.name} ({order.customerDetails?.phone})</p>
                                <p><strong>Payment ID:</strong> <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{order.customerDetails?.paymentId || 'N/A (COD)'}</span></p>
                                <p><strong>Secure Location:</strong> {order.customerDetails?.address}</p>
                                <p><strong>Signature Items:</strong> {order.productDetails?.map(p => `${p.name} (x${p.quantity})`).join(', ')}</p>
                                <div className="flex flex-wrap gap-2 pt-1.5">
                                  <button 
                                    onClick={() => setSelectedInvoiceOrder(order)}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors font-bold text-[9px] uppercase tracking-wider"
                                  >
                                    📄 Print Royal Invoice
                                  </button>
                                  <button 
                                    onClick={() => sendWhatsAppNotification(order, 'confirmed')}
                                    className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg transition-colors font-bold text-[9px] uppercase tracking-wider"
                                  >
                                    💬 Accept via WhatsApp
                                  </button>
                                  <button 
                                    onClick={() => sendWhatsAppNotification(order, 'dispatched')}
                                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg transition-colors font-bold text-[9px] uppercase tracking-wider"
                                  >
                                    🚚 Secure Dispatch Ping
                                  </button>
                                </div>
                                <p className="font-bold text-[#3F1F54] dark:text-purple-300 text-right mt-1 text-xs">Total Amount: ₹{order.amount?.toLocaleString('en-IN')}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Right Column: Custom lounge and try-on requests */}
                    <div className="lg:col-span-5 bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 p-6 rounded-3xl space-y-4 shadow-sm">
                      <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">Lounge & Try-on Consults ({adminConsults.length})</h3>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                        {adminConsults.map(con => (
                          <div key={con.id} className="bg-gray-50 dark:bg-gray-800/20 border border-gray-200/50 dark:border-gray-800/85 p-4 rounded-2xl space-y-3 text-xs shadow-sm">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 block">
                                  {con.requestType || (con.jewelryType ? "Custom Design Request" : "Lounge Booking")}
                                </span>
                                <span className="text-[9px] text-gray-400 block mt-0.5">{con.createdDate?.toDate().toLocaleString()}</span>
                              </div>
                              <select 
                                value={con.status}
                                onChange={(e) => handleUpdateConsultStatus(con.id, e.target.value)}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5 text-[9px] font-bold text-[#BCA057] focus:outline-none cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Processing">Processing</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>
                            <div className="border-t border-gray-200/60 dark:border-gray-800/60 pt-2 text-[10px] text-gray-600 dark:text-gray-400 space-y-1.5 normal-case">
                              <p><strong>Customer:</strong> {con.name} ({con.phone}) {con.email ? `· ${con.email}` : ''}</p>
                              {con.city && <p><strong>City:</strong> {con.city}</p>}
                              {con.date && <p><strong>Schedule:</strong> {con.date} {con.time ? `at ${con.time}` : ''}</p>}
                              {con.notes && <p><strong>Notes:</strong> {con.notes}</p>}
                              
                              {/* Custom Design Details */}
                              {con.jewelryType && (
                                <div className="mt-2 pt-2 border-t border-dashed border-gray-200 dark:border-gray-700 space-y-1">
                                  <p className="text-[#3F1F54] dark:text-[#E6C687] font-bold">💎 Design Specifications</p>
                                  <p><strong>Type:</strong> {con.jewelryType} · <strong>Material:</strong> {con.material}</p>
                                  <p><strong>Budget:</strong> {con.budget}</p>
                                  <p><strong>Requirements:</strong> {con.description}</p>
                                </div>
                              )}
                              
                              {/* Uploaded Sketch Reference Photo */}
                              {(con.referenceImageUrl || con.fileData) && (
                                <div className="mt-2 pt-2 border-t border-dashed border-gray-200 dark:border-gray-700 space-y-1.5">
                                  <p className="font-semibold text-[9px] uppercase tracking-wider text-[#BCA057]">Uploaded Reference Sketch:</p>
                                  <div className="flex flex-col gap-2 items-start">
                                    <div className="relative max-w-[120px] aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-[#3F1F54] bg-white shadow-sm hover:border-[#3F1F54] transition-all">
                                      <img 
                                        src={con.referenceImageUrl || con.fileData} 
                                        alt={con.fileName || "Custom design sketch"} 
                                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                                        onClick={() => window.open(con.referenceImageUrl || con.fileData, '_blank')}
                                        title="Click to view full size"
                                      />
                                    </div>
                                    <button 
                                      type="button"
                                      onClick={() => window.open(con.referenceImageUrl || con.fileData, '_blank')}
                                      className="bg-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1 shadow-xs pr-4 pl-3"
                                    >
                                      <span>👁️</span> View Full Image
                                    </button>
                                  </div>
                                  <span className="text-[8px] text-gray-400 block truncate max-w-[180px]">📎 {con.fileName}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* Tab: Customer Management System CRM */}
              {activeTab === 'customers' && (
                <div className="space-y-8">
                  
                  {/* Search / Segment bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 p-4 rounded-3xl gap-4 shadow-sm">
                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 px-3.5 py-1.5 rounded-2xl">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">Segment:</span>
                      <select 
                        value={crmSegment}
                        onChange={(e) => setCrmSegment(e.target.value)}
                        className="bg-transparent border-none text-[10px] font-bold text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Registered Customers</option>
                        <option value="VIP">VIP Patrons (Spend &gt; ₹50,000)</option>
                        <option value="regular">Standard Bookings</option>
                      </select>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search client by name or phone..."
                      value={crmSearch}
                      onChange={(e) => setCrmSearch(e.target.value)}
                      className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-xs w-64 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  {/* Customers CRM List */}
                  <div className="bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">Registered Customers Directory</h3>
                      <button 
                        onClick={() => handleExportCSV('customers')}
                        className="bg-white dark:bg-[#1E1F29] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-[9px] uppercase tracking-widest px-4 py-2 rounded-full hover:bg-gray-50"
                      >
                        Export Client list (CSV)
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Unique patrons extracted from consultations booking records */}
                      {Array.from(new Set(adminConsults.map(c => c.phone)))
                        .map(phone => {
                          const consultationsList = adminConsults.filter(c => c.phone === phone);
                          const representative = consultationsList[0];
                          
                          // Calculate total simulated spends based on whether they had custom design intents
                          const designIntent = consultationsList.some(c => c.jewelryType);
                          const spendFactor = designIntent ? 85000 : 25000;
                          const vipSegment = spendFactor > 50000 ? 'VIP' : 'Standard';

                          return {
                            name: representative.name,
                            phone: phone,
                            email: representative.email,
                            city: representative.city,
                            totalOrders: consultationsList.length,
                            totalSpend: spendFactor * consultationsList.length,
                            segment: vipSegment
                          };
                        })
                        .filter(client => crmSegment === 'all' || client.segment === crmSegment)
                        .filter(client => client.name?.toLowerCase().includes(crmSearch.toLowerCase()) || client.phone?.includes(crmSearch))
                        .map((client, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setSelectedClient(client)}
                            className="bg-[#FAF9F6] dark:bg-gray-800/20 border border-gray-200/50 dark:border-gray-800 hover:border-[#3F1F54] transition-all p-5 rounded-3xl text-xs space-y-3 cursor-pointer shadow-sm relative group"
                          >
                            <div className="absolute top-4 right-4 text-purple-200 dark:text-purple-900 group-hover:text-[#3F1F54] dark:group-hover:text-[#E6C687] text-lg transition-colors">
                              ➜
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                                {client.name?.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">{client.name}</h4>
                                <span className="text-[8px] uppercase tracking-wider text-gray-400 block mt-0.5">{client.phone}</span>
                              </div>
                            </div>
                            <div className="border-t border-gray-200/40 dark:border-gray-800/60 pt-2 space-y-1 text-gray-600 dark:text-gray-400">
                              <p><strong>Spends Total:</strong> <span className="font-bold text-green-600">₹{client.totalSpend?.toLocaleString('en-IN')}</span></p>
                              <p><strong>Active Bookings:</strong> {client.totalOrders} Requests</p>
                            </div>
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${client.segment === 'VIP' ? 'bg-yellow-100 text-yellow-700 animate-pulse' : 'bg-purple-100 text-purple-700'}`}>
                              {client.segment}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}



            </div>
          </main>

          {/* MOBILE FLOATING BOTTOM NAVIGATION BAR */}
          <div className="md:hidden fixed bottom-5 left-4 right-4 z-50 bg-[#14052F]/95 border border-white/10 rounded-2xl py-2 px-3 flex justify-around items-center shadow-2xl backdrop-blur-md select-none font-sans">
            {[
              { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
              { id: 'products', label: 'Jewellery', icon: Gem },
              { id: 'inventory', label: 'Categories', icon: Boxes },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'customers', label: 'CRM', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-1 focus:outline-none transition-all cursor-pointer relative py-1.5 px-2 rounded-xl hover:bg-white/5 active:scale-90"
                >
                  <Icon className={`w-4.5 h-4.5 transition-transform ${isActive ? 'text-[#E6C687] scale-110' : 'text-white/50'}`} />
                  <span className={`text-[8.5px] font-bold tracking-wider ${isActive ? 'text-white font-extrabold' : 'text-white/40 font-medium'}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 w-1.5 h-1.5 bg-[#E6C687] rounded-full shadow-[0_0_8px_#E6C687]"></span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      )}

      {/* BOTTOM BRANDING FOOTER */}
      <footer className="w-full text-center space-y-1.5 text-[9px] uppercase tracking-wider text-gray-400 font-bold border-t border-gray-100 dark:border-gray-850 py-6 absolute bottom-0 left-0 right-0 hidden">
        <p>© {new Date().getFullYear()} HR JEWELLERS & SONS. ALL RIGHTS RESERVED.</p>
        <p className="text-[8px] text-gray-300">Powered by HR Jewellers & Sons Admin Portal</p>
      </footer>

    </div>
  );
}
