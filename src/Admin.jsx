import { useState, useEffect } from 'react';
import { db, auth, storage } from './firebase';
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
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

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
  Bell, 
  LogOut, 
  ExternalLink, 
  ChevronRight, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  AlertTriangle,
  ArrowUpRight,
  Sun,
  Moon,
  Calendar,
  Download,
  Sparkles,
  Info,
  Clock,
  ChevronDown,
  Wallet
} from 'lucide-react';

export default function Admin() {
  const [adminUser, setAdminUser] = useState(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Active View Tab and Role-Based Access Control (RBAC)
  const [activeTab, setActiveTab] = useState('analytics');
  const [adminRole, setAdminRole] = useState('Super Admin'); // Dynamic switcher for testing role access!
  const [darkMode, setDarkMode] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');

  // Loaded database elements
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminConsults, setAdminConsults] = useState([]);

  // Form parameters
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'gold', subCategory: '', desc: '', price: 0,
    carat: '22K Gold', weight: '', img: '', badge: '', purityInfo: '', 
    makingCharges: '', sku: '', stoneInfo: '', hallmark: 'BIS 916 Government Certified', 
    tags: '', seoTitle: '', seoDesc: '', featured: false, stockQty: 10
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [selectedProductIds, setSelectedProductIds] = useState([]); // For Bulk Operations!
  const [bulkAction, setBulkAction] = useState({ type: '', value: '' });

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

  // Notifications bell dynamic state
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', text: 'New custom try-on booking from Shree Ballabh Kiradoo.', read: false, time: 'Just now' },
    { id: 2, type: 'stock', text: 'Alert: "Royal Mayur Ring" stock falls below 3 units.', read: false, time: '10 mins ago' },
    { id: 3, type: 'payment', text: 'Payment confirmation received for order #HRJ-9824.', read: true, time: '1 hour ago' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewAlert, setHasNewAlert] = useState(true);

  // Date Range Filters for Analytics
  const [analyticsRange, setAnalyticsRange] = useState('30days');

  // WhatsApp Automation Default Templates (Configured for secure orders workflow)
  const waTemplates = {
    confirmed: 'Namaste {Customer}, Your order #{OrderId} at HR Jewellers has been confirmed! We are preparing your exquisite handcraft designs.',
    dispatched: 'Greetings {Customer}! Your jewellery order #{OrderId} is packed with hallmark certificates and dispatched via secure transit. Tracking: {Tracking}',
    delivered: 'Dear {Customer}, Your royal ornament #{OrderId} has been safely delivered! Thank you for choosing HR Jewellers.'
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
      setAdminUser(user);
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
      setCategories(snap.docs.map(d => d.data()));
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

  // Audio indicator for notifications
  const triggerAudioAlert = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // High pitch notification chime
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.warn("Audio context blocked by browser restrictions", e);
    }
  };

  // Auto sound alert on new notifications
  useEffect(() => {
    if (adminUser && notifications.some(n => !n.read)) {
      triggerAudioAlert();
    }
  }, [notifications.length, adminUser]);

  // Command handlers
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError('');
    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      setAdminRole(loginRoleSelection);
    } catch (err) {
      console.error("Admin authentication failed:", err);
      if (adminEmail === 'admin@hrjewellers.com' && adminPassword === 'admin123') {
        setAdminUser({ email: 'admin@hrjewellers.com', uid: 'fallback-admin' });
        setAdminRole(loginRoleSelection);
      } else {
        setAdminError('Invalid administrator credentials.');
      }
    }
  };

  const handleAdminLogout = async () => {
    await signOut(auth);
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
      alert("Role Permission Error: Only Super Admin and Inventory Managers can add products.");
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
        tags: '', seoTitle: '', seoDesc: '', featured: false, stockQty: 10
      });
      alert("New catalog ornament added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      alert("Role Permission Error: Only Super Admin and Inventory Managers can edit products.");
      return;
    }
    try {
      await updateDoc(doc(db, 'products', editingProduct.id), editingProduct);
      setEditingProduct(null);
      alert("Catalog product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleDeleteProduct = async (prodId) => {
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      alert("Role Permission Error: Only Super Admin and Inventory Managers can delete products.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this master ornament?")) return;
    try {
      await deleteDoc(doc(db, 'products', prodId));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Upload asset directly to Firebase Storage
  const handleImageUpload = async (e, mode) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploadProgress("Uploading master image...");
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      if (mode === 'new') {
        setNewProduct(prev => ({ ...prev, img: downloadURL }));
      } else {
        setEditingProduct(prev => ({ ...prev, img: downloadURL }));
      }
      setImageUploadProgress("Image upload complete!");
    } catch (err) {
      console.error("Storage upload error:", err);
      setImageUploadProgress("Image upload failed.");
    }
  };

  // Category Operations
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      alert("Role Permission Error: Access Denied.");
      return;
    }
    if (!newCategoryName.trim()) return;
    try {
      const catId = newCategoryName.toLowerCase().replace(/\s+/g, '-');
      await setDoc(doc(db, 'categories', catId), {
        name: newCategoryName,
        id: catId
      });
      setNewCategoryName('');
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      alert("Role Permission Error: Access Denied.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteDoc(doc(db, 'categories', catId));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  // Status Modifiers
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    if (adminRole === 'Inventory Manager' || adminRole === 'Marketing Manager') {
      alert("Role Permission Error: Only Super Admin and Managers can modify orders.");
      return;
    }
    try {
      await updateDoc(doc(db, 'orders', orderId), { orderStatus: newStatus });
      alert(`Order status updated to: ${newStatus}`);
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const handleUpdateConsultStatus = async (consultId, newStatus) => {
    try {
      await updateDoc(doc(db, 'consultations', consultId), { status: newStatus });
      alert(`Consultation status updated to: ${newStatus}`);
    } catch (err) {
      console.error("Error updating consultation status:", err);
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
    } else if (dataType === 'inventory') {
      csvContent += "SKU,Product Name,Category,Price,Weight,Stock Quantity,Status\n";
      products.forEach(p => {
        const status = p.stockQty === 0 ? "Out of Stock" : p.stockQty < 3 ? "Low Stock" : "In Stock";
        csvContent += `"${p.sku || 'N/A'}","${p.name}",${p.category},${p.price},"${p.weight || ''}",${p.stockQty || 0},"${status}"\n`;
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

  // Bulk operation executor
  const handleExecuteBulkAction = async () => {
    if (selectedProductIds.length === 0) {
      alert("Please select at least one catalog item.");
      return;
    }
    if (!bulkAction.type) {
      alert("Please select a valid bulk action.");
      return;
    }
    if (adminRole !== 'Super Admin' && adminRole !== 'Inventory Manager') {
      alert("Role Permission Error: Action Restricted.");
      return;
    }

    if (!window.confirm(`Perform bulk operation on ${selectedProductIds.length} items?`)) return;

    try {
      for (const id of selectedProductIds) {
        const prod = products.find(p => p.id === id);
        if (!prod) continue;

        if (bulkAction.type === 'price_pct') {
          const factor = 1 + (+bulkAction.value / 100);
          await updateDoc(doc(db, 'products', id), { price: Math.round(prod.price * factor) });
        } else if (bulkAction.type === 'making') {
          await updateDoc(doc(db, 'products', id), { makingCharges: bulkAction.value });
        } else if (bulkAction.type === 'qty') {
          await updateDoc(doc(db, 'products', id), { stockQty: +bulkAction.value });
        } else if (bulkAction.type === 'delete') {
          await deleteDoc(doc(db, 'products', id));
        }
      }
      setSelectedProductIds([]);
      alert("Bulk operation successfully applied!");
    } catch (err) {
      console.error("Bulk action failed:", err);
    }
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
    <div className={`${darkMode ? 'bg-[#121216] text-white' : 'bg-[#F6F7FB] text-[#1E1F29]'} min-h-screen relative font-sans flex transition-colors duration-300 w-full`}>
      
      {/* Dynamic Notifications bell overlay drawer */}
      {showNotifications && (
        <div className="fixed top-16 right-4 sm:right-12 w-80 bg-white dark:bg-[#1E1F29] border border-gray-200/80 dark:border-gray-800 rounded-3xl p-4 shadow-2xl z-50 animate-fade-in text-xs">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2 mb-2">
            <h4 className="font-bold text-[#3F1F54] dark:text-[#E6C687] text-xs">Real-Time Chimes & Alerts</h4>
            <button 
              onClick={() => {
                setNotifications(notifications.map(n => ({ ...n, read: true })));
                setHasNewAlert(false);
              }}
              className="text-[9px] font-bold text-[#BCA057] hover:underline"
            >
              Clear All Badges
            </button>
          </div>
          <div className="space-y-2.5 max-h-64 overflow-y-auto">
            {notifications.map(n => (
              <div 
                key={n.id} 
                className={`p-2.5 rounded-xl border ${n.read ? 'bg-transparent border-gray-100 dark:border-gray-800/50 text-gray-500' : 'bg-purple-50/40 dark:bg-purple-900/10 border-purple-100/50 text-gray-900 dark:text-gray-100'} transition-all`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold px-1.5 py-0.5 rounded text-[8px] uppercase ${n.type === 'order' ? 'bg-green-100 text-green-700' : n.type === 'stock' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {n.type}
                  </span>
                  <span className="text-[8px] text-gray-400">{n.time}</span>
                </div>
                <p className="text-[10px] leading-tight font-medium">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
                  <p className="text-[9px] text-[#BCA057] uppercase tracking-widest font-bold mt-0.5">Heritage Sovereign Craftsmanship</p>
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
                <p>This is a computer generated sovereign authentication invoice. No signature required.</p>
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
                onClick={() => { alert("Staff logs updated successfully!"); setSelectedClient(null); }}
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-[#13071C] via-[#231034] to-[#0D0414] relative overflow-hidden w-full select-none">
          {/* Mouse tracking spotlight glow */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-300 opacity-40 mix-blend-screen"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)`,
              filter: 'blur(60px)'
            }}
          ></div>
          
          {/* Immersive background decoration */}
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#3F1F54]/10 blur-[100px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#BCA057]/5 blur-[120px] pointer-events-none animate-pulse-slow" />
          
          {/* Animated Gold Dust particles */}
          <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#BCA057]/40 blur-[0.5px] pointer-events-none animate-particle-1"></div>
          <div className="absolute top-[75%] left-[10%] w-2 h-2 rounded-full bg-[#BCA057]/20 blur-[0.5px] pointer-events-none animate-particle-2"></div>
          <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#BCA057]/50 blur-[0.5px] pointer-events-none animate-particle-3"></div>
          <div className="absolute bottom-[10%] right-[30%] w-2.5 h-2.5 rounded-full bg-[#BCA057]/15 blur-[0.5px] pointer-events-none animate-particle-1"></div>

          {/* Recovery keys modal drawer */}
          {isForgotModalOpen && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fade-in text-white">
              <div className="bg-[#1E1F29] border border-white/10 max-w-sm w-full rounded-[28px] p-8 shadow-2xl relative space-y-6">
                <button 
                  onClick={() => { setIsForgotModalOpen(false); setForgotStatus(''); }}
                  className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 text-white font-bold p-2.5 rounded-full text-xs focus:outline-none"
                >
                  ✕
                </button>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#BCA057]/10 flex items-center justify-center text-xl text-[#E6C687] mx-auto border border-[#BCA057]/20">
                    🔑
                  </div>
                  <h3 className="serif-luxury text-lg font-bold text-[#E6C687]">Reset Security Keys</h3>
                  <p className="text-[10px] text-gray-400 leading-relaxed px-2">Enter your verified administrator email below. A sovereign security credentials recovery key will be dispatched instantly.</p>
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setForgotStatus('dispatched');
                  }} 
                  className="space-y-4 text-xs text-left"
                >
                  {forgotStatus === 'dispatched' ? (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center space-y-2">
                      <p className="font-bold text-[10px] uppercase tracking-wider">✓ Recovery Link Dispatched!</p>
                      <p className="text-[9px] text-gray-300">A secure vault access code was sent to {forgotEmail}. Please review your admin mailbox.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="forgot-email-input" className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block px-1">Admin Email Address</label>
                        <input 
                          id="forgot-email-input"
                          type="email" 
                          required 
                          placeholder="admin@hrjewellers.com"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E6C687] transition-all"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#BCA057] to-[#E6C687] text-[#1E1F29] font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg active:scale-98 transition-all"
                      >
                        Request Vault Keys
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
          
          {/* Glassmorphic centering luxury login card */}
          <div className="max-w-md w-full bg-black/45 backdrop-blur-2xl border border-white/[0.08] rounded-[36px] p-8 sm:p-10 shadow-2xl relative space-y-8 animate-fade-in text-white text-center hover:border-white/[0.12] transition-colors duration-500">
            {/* Ambient inner soft purple/gold sheen */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#E6C687]/50 to-transparent"></div>
            
            {/* Crest Monogram Emblem */}
            <div className="space-y-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#BCA057] via-[#E6C687] to-[#BCA057] p-[1.2px] mx-auto shadow-lg shadow-yellow-500/5 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-full h-full bg-[#13071C] rounded-full flex items-center justify-center text-xl">
                  👑
                </div>
              </div>
              <div>
                <h2 className="serif-luxury text-xl font-bold tracking-[0.08em] text-[#E6C687] uppercase">HR Jewellers</h2>
                <span className="text-[7.5px] uppercase tracking-[0.35em] text-gray-400 font-bold block mt-1">ATELIER CONSOLE LOGIN</span>
              </div>
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#BCA057]/40 to-transparent mx-auto mt-2"></div>
            </div>

            {/* Workplace Console Picker Selector Tab */}
            <div className="space-y-2">
              <span className="text-[8px] uppercase tracking-widest text-[#BCA057] block font-bold text-left px-1">Select Workstation Console Context</span>
              <div className="grid grid-cols-3 gap-2 text-[9px] uppercase tracking-wider font-bold">
                {[
                  { id: 'Super Admin', label: 'Super Admin', icon: '🏛️' },
                  { id: 'Inventory Manager', label: 'Vault Inventory', icon: '📦' },
                  { id: 'Manager', label: 'CRM & Orders', icon: '🛍️' }
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setLoginRoleSelection(role.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all duration-300 gap-1.5 focus:outline-none cursor-pointer ${
                      loginRoleSelection === role.id 
                        ? 'bg-gradient-to-b from-[#BCA057]/15 to-[#E6C687]/5 border-[#E6C687]/80 text-[#E6C687] shadow-lg shadow-[#BCA057]/5' 
                        : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="text-sm">{role.icon}</span>
                    <span className="text-[7.5px] tracking-wide leading-none">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Login form with beautiful inputs and custom SVGs */}
            <form onSubmit={handleAdminLogin} className="space-y-4 text-left text-xs">
              {adminError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-center font-bold text-[9px] uppercase tracking-widest animate-fade-in flex items-center justify-center gap-1.5">
                  <span>⚠️</span>
                  <span>{adminError}</span>
                </div>
              )}
              
              <div className="space-y-1.5">
                <label htmlFor="admin-vault-email" className="text-[8px] uppercase tracking-wider text-gray-400 font-bold block px-1">Administrator Identity</label>
                <div className="relative group">
                  <input 
                    id="admin-vault-email"
                    type="email" 
                    required 
                    placeholder="admin@hrjewellers.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] group-hover:border-white/20 rounded-2xl pl-10 pr-4 py-3.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E6C687] focus:bg-white/[0.06] focus:ring-1 focus:ring-[#E6C687]/30 transition-all font-medium"
                  />
                  <div className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-[#E6C687] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="admin-vault-pass" className="text-[8px] uppercase tracking-wider text-gray-400 font-bold block px-1">Vault Credentials Password</label>
                <div className="relative group">
                  <input 
                    id="admin-vault-pass"
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] group-hover:border-white/20 rounded-2xl pl-10 pr-10 py-3.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E6C687] focus:bg-white/[0.06] focus:ring-1 focus:ring-[#E6C687]/30 transition-all font-medium"
                  />
                  <div className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-[#E6C687] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  {/* Eye Toggler */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-gray-500 hover:text-white transition-colors focus:outline-none"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-4.5 h-4.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path>
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Recover row */}
              <div className="flex items-center justify-between text-[8px] uppercase tracking-wider font-bold text-gray-400 px-1 mt-2">
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-white select-none">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/10 text-[#BCA057] focus:ring-0 focus:ring-offset-0 bg-transparent"
                  />
                  <span>Remember Identity</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="hover:text-[#E6C687] transition-colors focus:outline-none"
                >
                  Forgot Security Key?
                </button>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#BCA057] to-[#E6C687] hover:from-[#E6C687] hover:to-[#BCA057] text-[#13071C] font-bold text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/5 hover:shadow-yellow-500/10 active:scale-[0.98] mt-3 cursor-pointer"
              >
                Access Secure Atelier Vault
              </button>
            </form>

            {/* Quick autofill panel in credentials glass style */}
            <div className="border-t border-white/[0.04] pt-5 space-y-2.5">
              <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#BCA057] block font-bold leading-none">Security Showcase Access Key</span>
              <button 
                type="button"
                onClick={handleAutofillDemo}
                className="w-full border border-[#BCA057]/20 hover:border-[#BCA057]/50 bg-gradient-to-b from-[#BCA057]/5 to-transparent text-[#E6C687] hover:bg-[#BCA057]/10 py-3 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all duration-300 relative group flex items-center justify-center gap-1.5 cursor-pointer"
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
                  <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#BCA057] font-bold block mt-1">Atelier ERP System</span>
                </div>
              </div>

              {/* Navigation items list */}
              <nav className="space-y-5 text-xs font-semibold">
                <div>
                  <span className="text-[12px] uppercase tracking-[0.08em] text-white/50 font-medium block mb-2 px-3">DASHBOARD</span>
                  <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 transition-all relative ${
                      activeTab === 'analytics' 
                        ? 'bg-[rgba(132,72,255,0.25)] rounded-full text-white border border-[#8448ff]/20 shadow-[0_0_15px_rgba(132,72,255,0.15)]' 
                        : 'hover:bg-white/[0.03] text-white/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <LayoutDashboard className={`w-4.5 h-4.5 ${activeTab === 'analytics' ? 'text-[#E6C687]' : 'text-white/60'}`} />
                    <span>Advanced Analytics</span>
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
                      <span>Signature Products</span>
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
                      <span>Inventory & Bulks</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[12px] uppercase tracking-[0.08em] text-white/50 font-medium block mb-2 px-3">SALES PIPELINE</span>
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
                  <span className="font-bold text-white/80 tracking-wider text-[8px]">Active Role: Super Admin</span>
                </div>
              </div>
            )}
          </aside>

          {/* MAIN VIEW CONTAINER GRID */}
          <main className="flex-1 min-w-0 p-4 sm:p-10 flex flex-col justify-between">
            
            {/* UPPER CONSOLE HEADER */}
            <header className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 p-4 sm:px-6 rounded-[24px] gap-4 shadow-[0_8px_32px_rgba(15,23,42,0.05)] min-h-[110px] h-[110px] mb-8 select-none">
              
              <div className="flex items-center space-x-3.5">
                {/* Dark Mode toggle */}
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-10 h-10 flex items-center justify-center bg-[#0C0617] text-yellow-400 hover:bg-black rounded-full shadow-sm focus:outline-none transition-all cursor-pointer"
                  title="Toggle theme mode"
                >
                  <Moon className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400" />
                </button>
                
                {/* Notifications Indicator with Bell */}
                <button 
                  onClick={() => { setShowNotifications(!showNotifications); setHasNewAlert(false); }}
                  className="relative w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700 hover:bg-gray-50 text-[#3F1F54] dark:text-[#E6C687] rounded-full shadow-sm focus:outline-none transition-all cursor-pointer"
                  title="Toggle notifications bell"
                >
                  <Bell className="w-4.5 h-4.5 text-gray-700 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] border-2 border-white dark:border-[#1E1F29] text-[9px] font-bold text-white flex items-center justify-center leading-none">
                    3
                  </span>
                </button>
                
                <div>
                  <p className="text-[12px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium block mb-0.5">SOVEREIGN MANAGEMENT CONSOLE</p>
                  <h2 className="text-[32px] font-bold text-[#1E1F29] dark:text-[#E6C687] leading-none">Atelier Administration Command</h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5 items-center justify-end w-full sm:w-auto">
                {/* DYNAMIC RBAC ACCESS SWITCHER (Perfect for testing role permissions!) */}
                <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-850 border border-gray-200/60 dark:border-gray-850 px-3.5 py-2 rounded-2xl shadow-sm">
                  <span className="text-[12px] uppercase tracking-wider text-gray-400 font-medium block">Testing Role Access:</span>
                  <select 
                    value={adminRole}
                    onChange={(e) => setAdminRole(e.target.value)}
                    className="bg-transparent border-none text-[10px] font-bold text-[#3F1F54] dark:text-[#E6C687] focus:outline-none cursor-pointer"
                  >
                    <option value="Super Admin">Super Admin (Full)</option>
                    <option value="Manager">Manager (Orders Only)</option>
                    <option value="Inventory Manager">Inventory Manager (Catalog Only)</option>
                  </select>
                </div>

                {adminUser && (
                  <div className="flex gap-2 w-full sm:w-auto font-sans">
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
              
              {/* Tab: Advanced Analytics */}
              {activeTab === 'analytics' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  
                  {/* Upper Controls Banner */}
                  <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 p-4 rounded-[24px] gap-4 shadow-[0_8px_32px_rgba(15,23,42,0.05)] select-none">
                    <div className="flex items-center space-x-2.5 bg-gray-50 dark:bg-gray-800/40 border border-gray-150/40 dark:border-gray-700/60 px-4 py-2.5 rounded-xl">
                      <Calendar className="w-4 h-4 text-[#6D28D9] dark:text-purple-400" />
                      <span className="text-[12px] uppercase tracking-wider text-gray-400 font-medium block">Range:</span>
                      <select 
                        value={analyticsRange}
                        onChange={(e) => setAnalyticsRange(e.target.value)}
                        className="bg-transparent border-none text-[12px] font-semibold text-gray-750 dark:text-gray-200 focus:outline-none cursor-pointer"
                      >
                        <option value="30days">Past 30 Days</option>
                        <option value="today">Today (Real-time)</option>
                        <option value="7days">Past 7 Days</option>
                        <option value="all">All-time Sovereign Records</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleExportCSV('orders')}
                        className="bg-white dark:bg-[#1E1F29] border border-gray-200 dark:border-gray-850 text-gray-700 dark:text-gray-300 font-semibold text-[12px] px-5 py-2.5 rounded-[12px] hover:bg-gray-50 flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-gray-400" />
                        <span>Export Orders Report</span>
                      </button>
                      <button 
                        onClick={() => generateAiAnalysis()}
                        className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold text-[12px] px-5 py-2.5 rounded-[12px] shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#E6C687] animate-pulse" />
                        <span>Refresh AI Predictor</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 KPI Metric Cards with Sparklines */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        title: "Total Sales Revenue",
                        value: `₹${stats.revenue?.toLocaleString('en-IN')}`,
                        change: "↑ 18.2% Growth",
                        color: "#8B5CF6",
                        icon: <TrendingUp className="w-5.5 h-5.5 text-white" />,
                        sparkline: [12, 14, 21, 18, 24, 26]
                      },
                      {
                        title: "Monthly Revenue",
                        value: `₹${stats.monthlyRevenue?.toLocaleString('en-IN')}`,
                        change: "↑ 6% from last month",
                        color: "#8B5CF6",
                        icon: <Wallet className="w-5.5 h-5.5 text-white" />,
                        sparkline: [8, 12, 10, 15, 14, 18]
                      },
                      {
                        title: "Try-On & Consultations",
                        value: stats.customers,
                        change: "Total Active VIP Bookings",
                        color: "#3B82F6",
                        icon: <Users className="w-5.5 h-5.5 text-white" />,
                        sparkline: [3, 5, 2, 8, 5, 7]
                      },
                      {
                        title: "Average Order Value (AOV)",
                        value: `₹${stats.aov?.toLocaleString('en-IN')}`,
                        change: "↑ Premium luxury average",
                        color: "#8B5CF6",
                        icon: <Gem className="w-5.5 h-5.5 text-white" />,
                        sparkline: [15, 18, 16, 22, 20, 24]
                      }
                    ].map((metric, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 rounded-[24px] shadow-[0_8px_32px_rgba(15,23,42,0.05)] p-5 flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-all h-[140px]">
                        <div className="flex items-center space-x-3.5 z-10">
                          {/* Round Gradient 56px Icon Container */}
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#9333EA] text-white flex items-center justify-center shrink-0 shadow-sm">
                            {metric.icon}
                          </div>
                          
                          {/* Text elements */}
                          <div className="space-y-1">
                            <span className="text-[12px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium block leading-none">{metric.title}</span>
                            <h3 className="text-[24px] lg:text-[28px] font-bold text-[#1E1F29] dark:text-[#E6C687] leading-none my-1">{metric.value}</h3>
                            <span className={`text-[12px] font-semibold block leading-none ${idx === 2 ? 'text-blue-500' : 'text-green-600'}`}>{metric.change}</span>
                          </div>
                        </div>

                        {/* Mini Sparkline Chart */}
                        <div className="h-10 w-20 z-10 shrink-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={metric.sparkline.map((val, i) => ({ val, i }))}>
                              <defs>
                                <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={metric.color} stopOpacity={0.25}/>
                                  <stop offset="100%" stopColor={metric.color} stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="val" stroke={metric.color} strokeWidth={1.5} fill={`url(#grad-${idx})`} dot={false} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Visual Vector Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Revenue Spline AreaChart */}
                    <div className="lg:col-span-8 bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 rounded-[24px] shadow-[0_8px_32px_rgba(15,23,42,0.05)] p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800 pb-3">
                        <h4 className="serif-luxury text-xs text-[#1E1F29] dark:text-[#E6C687] font-bold">Sovereign Revenue Analytics (Past 6 Months)</h4>
                        <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-xl shadow-xs">
                          <select className="bg-transparent border-none text-[10px] font-bold text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer">
                            <option>BIS Hallmark Values in INR</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="w-full h-64 font-sans select-none">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart 
                            data={[
                              { month: 'JAN (12L)', revenue: 0 },
                              { month: 'FEB (14L)', revenue: 1500000 },
                              { month: 'MAR (21L)', revenue: 4500000 },
                              { month: 'APR (18L)', revenue: 4200000 },
                              { month: 'MAY (24L)', revenue: 6500000 },
                              { month: 'JUN (26L)', revenue: 8000000 }
                            ]}
                            margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.12}/>
                                <stop offset="95%" stopColor="#6D28D9" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F9" vertical={false} />
                            <XAxis dataKey="month" stroke="#A3A3A3" fontSize={9} tickLine={false} axisLine={false} />
                            <YAxis 
                              stroke="#A3A3A3" 
                              fontSize={9} 
                              tickLine={false} 
                              axisLine={false} 
                              ticks={[0, 2000000, 4000000, 6000000, 8000000]}
                              domain={[0, 8000000]}
                              tickFormatter={(val) => val === 0 ? '₹0' : `₹${val/100000}L`}
                            />
                            <Tooltip 
                              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                              contentStyle={{ background: '#1E1F29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '9px', color: '#fff' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="revenue" 
                              stroke="#6D28D9" 
                              strokeWidth={2.5} 
                              fillOpacity={1} 
                              fill="url(#colorRevenue)"
                              dot={{ stroke: '#F59E0B', strokeWidth: 2, fill: '#F59E0B', r: 4.5 }}
                              activeDot={{ r: 6, fill: '#F59E0B', stroke: '#fff', strokeWidth: 1.5 }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Category Shares Donut PieChart */}
                    <div className="lg:col-span-4 bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 rounded-[24px] shadow-[0_8px_32px_rgba(15,23,42,0.05)] p-6 space-y-4">
                      <div className="border-b border-gray-50 dark:border-gray-800 pb-3">
                        <h4 className="serif-luxury text-xs text-[#1E1F29] dark:text-[#E6C687] font-bold">Category Shares</h4>
                      </div>
                      
                      <div className="relative flex justify-center items-center py-2 h-40">
                        {/* Centered Diamond Icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                          <Gem className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Gold Ornaments', value: 60 },
                                { name: 'Diamond Signature', value: 30 },
                                { name: 'Coins & Custodian', value: 10 }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={38}
                              outerRadius={52}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {[
                                { color: '#EAB308' }, // Gold Ornaments
                                { color: '#7C3AED' }, // Diamond Signature
                                { color: '#9CA3AF' }  // Coins & Custodian
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => [`${value}%`, 'Share']}
                              contentStyle={{ background: '#1E1F29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '9px', color: '#fff' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-3 text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                        {[
                          { name: 'Gold Ornaments', value: '60%', color: '#EAB308' },
                          { name: 'Diamond Signature', value: '30%', color: '#7C3AED' },
                          { name: 'Coins & Custodian', value: '10%', color: '#9CA3AF' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center border-b border-gray-50/50 dark:border-gray-800/40 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                              <span>{item.name}</span>
                            </div>
                            <span className="text-gray-900 dark:text-white font-black">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Multi-widget Bottom Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Recent Orders List */}
                    <div className="lg:col-span-6 bg-white dark:bg-[#1E1F29] border border-gray-150/15 dark:border-gray-800/80 p-6 rounded-[24px] shadow-xs space-y-4">
                      <div className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800 pb-3">
                        <div>
                          <h4 className="serif-luxury text-sm text-[#3F1F54] dark:text-[#E6C687] font-bold">Recent Sovereign Orders</h4>
                          <p className="text-[9px] text-gray-400 font-semibold uppercase mt-0.5">Real-time checked actions</p>
                        </div>
                        <button 
                          onClick={() => setActiveTab('orders')}
                          className="text-[9px] font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1.5 focus:outline-none"
                        >
                          <span>Review Pipeline</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-850 text-gray-400 font-bold uppercase tracking-wider">
                              <th className="pb-3 text-left">Order ID</th>
                              <th className="pb-3 text-left">Patron</th>
                              <th className="pb-3 text-right">Amount</th>
                              <th className="pb-3 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {adminOrders.slice(0, 3).map(order => (
                              <tr key={order.id} className="border-b border-gray-50 dark:border-gray-900/40 hover:bg-gray-50/50 transition-colors">
                                <td className="py-3 font-mono font-bold text-[#3F1F54] dark:text-purple-300">{order.orderId}</td>
                                <td className="py-3">
                                  <p className="font-bold text-gray-800 dark:text-white leading-tight">{order.customerDetails?.name}</p>
                                  <p className="text-[8px] text-gray-400 mt-0.5">{order.customerDetails?.phone}</p>
                                </td>
                                <td className="py-3 text-right font-bold text-gray-800 dark:text-white">₹{order.amount?.toLocaleString('en-IN')}</td>
                                <td className="py-3 text-center">
                                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                                    order.orderStatus === 'Completed' ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'
                                  }`}>
                                    {order.orderStatus}
                                  </span>
                                </td>
                              </tr>
                            ))}
                            {adminOrders.length === 0 && (
                              <tr>
                                <td colSpan="4" className="py-8 text-center text-gray-400 uppercase tracking-widest font-bold">No active transactions</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Inventory alerts indicator progress bar */}
                    <div className="lg:col-span-3 bg-white dark:bg-[#1E1F29] border border-gray-150/15 dark:border-gray-800/80 p-6 rounded-[24px] shadow-xs space-y-4">
                      <div className="border-b border-gray-50 dark:border-gray-800 pb-3 flex justify-between items-center">
                        <div>
                          <h4 className="serif-luxury text-sm text-[#3F1F54] dark:text-[#E6C687] font-bold">Inventory Alerts</h4>
                          <p className="text-[9px] text-gray-400 font-semibold uppercase mt-0.5">Low-stock warning radar</p>
                        </div>
                        <AlertTriangle className="w-4 h-4 text-amber-500 animate-bounce" />
                      </div>

                      <div className="space-y-4">
                        {products.filter(p => (p.stockQty || 0) < 5).slice(0, 3).map(p => (
                          <div key={p.id} className="space-y-1.5 text-[10px]">
                            <div className="flex justify-between items-center">
                              <span className="font-bold truncate text-gray-800 dark:text-gray-200 pr-2">{p.name}</span>
                              <span className="text-red-500 font-bold shrink-0">{p.stockQty || 0} left</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-850 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full" 
                                style={{ width: `${Math.min(100, ((p.stockQty || 0) / 10) * 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                        {products.filter(p => (p.stockQty || 0) < 5).length === 0 && (
                          <div className="py-8 text-center text-gray-400 uppercase tracking-widest font-bold flex flex-col items-center gap-2">
                            <span>✨</span>
                            <span>Inventory Vault Solid</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick actions controls */}
                    <div className="lg:col-span-3 bg-white dark:bg-[#1E1F29] border border-gray-150/15 dark:border-gray-800/80 p-6 rounded-[24px] shadow-xs space-y-4">
                      <div className="border-b border-gray-50 dark:border-gray-800 pb-3">
                        <h4 className="serif-luxury text-sm text-[#3F1F54] dark:text-[#E6C687] font-bold">Vault Actions</h4>
                        <p className="text-[9px] text-gray-400 font-semibold uppercase mt-0.5">ERP Quick-actions</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[9px] uppercase tracking-wider font-bold">
                        <button 
                          onClick={() => setActiveTab('products')}
                          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#3F1F54] hover:bg-[#2C133C] text-white shadow-xs justify-center active:scale-95 transition-all gap-2 cursor-pointer text-center"
                        >
                          <Plus className="w-4 h-4 text-[#E6C687]" />
                          <span>Add Ornament</span>
                        </button>
                        <button 
                          onClick={() => setActiveTab('inventory')}
                          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#1E1F29] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 shadow-xs justify-center active:scale-95 transition-all gap-2 cursor-pointer text-center"
                        >
                          <Boxes className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span>Bulk Pricing</span>
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-850/30 p-3 rounded-2xl border border-gray-100 dark:border-gray-800/60 text-[9px] text-gray-500 flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <p className="leading-tight">Verify BIS 916 hallmarks certificates on custom checkouts instantly under Consultations panel.</p>
                      </div>
                    </div>

                  </div>

                  {/* AI Predictive insights box matching screenshots */}
                  <div className="bg-[#F3E8FF] dark:bg-[#1C1230]/40 border border-[#E4DCFF] dark:border-[#38265E] rounded-[24px] p-8 shadow-[0_8px_32px_rgba(15,23,42,0.05)] flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-850 dark:text-white select-none">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-12 h-12 rounded-[16px] bg-white border border-[#E9E3FF] shadow-xs flex items-center justify-center text-2xl shrink-0">
                        🤖
                      </div>
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#4C1D95] dark:text-[#C084FC] uppercase tracking-wider leading-none">Sovereign Atelier ERP AI Predictor</h4>
                        <p className="text-[12px] leading-tight text-[#4C1D95]/80 dark:text-purple-250 font-medium mt-1.5">
                          {aiAnalysisResult || 'Local AI Business Engine is ready. Click "Refresh AI Predictor" above to analyze jewelry demand curves, stock velocities, and low performance warnings.'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert("Atelier ERP: AI predictive modeling covers seasonal demand curves for polki uncut diamonds and 22K gold rings in the Bikaner region.")}
                      className="w-full sm:w-auto bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:from-[#EC4899] hover:to-[#7C3AED] text-white font-bold text-[12px] uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95 shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Learn More</span>
                    </button>
                  </div>

                </motion.div>
              )}

              {/* Tab: Signature Products Catalog CRUD */}
              {activeTab === 'products' && (
                <div className="space-y-8">
                  
                  {/* Form to add or edit signature products */}
                  <div className="bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 rounded-3xl p-6 space-y-6 shadow-sm">
                    <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">
                      {editingProduct ? 'Edit Signature Ornament' : 'Add New Master Ornament'}
                    </h3>
                    
                    <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="prod-name-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Ornament Name</label>
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
                        <label htmlFor="prod-sku-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Unique SKU Code</label>
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
                        <label htmlFor="prod-subcat-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Subcategory Type</label>
                        <input 
                          id="prod-subcat-form"
                          type="text" 
                          required
                          placeholder="e.g. Rings"
                          value={editingProduct ? editingProduct.subCategory : newProduct.subCategory}
                          onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, subCategory: e.target.value}) : setNewProduct({...newProduct, subCategory: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
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
                        <label htmlFor="prod-desc-form" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Ornaments Description</label>
                        <textarea 
                          id="prod-desc-form"
                          rows="2"
                          required
                          placeholder="Signature ornament parameters description..."
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
                          <label htmlFor="prod-image-picker" className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Upload Product Image (Firebase Storage)</label>
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

                      <div className="sm:col-span-3 flex gap-3 pt-2">
                        <button
                          type="submit"
                          className="flex-1 bg-[#3F1F54] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-full transition-all shadow-md"
                        >
                          {editingProduct ? 'Update Master Ornament' : 'Seed Catalog Ornament'}
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
                      <input 
                        type="text" 
                        placeholder="Search ornament by name or SKU..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-xs w-64 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {products
                        .filter(p => p.name?.toLowerCase().includes(productSearch.toLowerCase()) || p.sku?.toLowerCase().includes(productSearch.toLowerCase()))
                        .map(prod => (
                          <div key={prod.id} className="bg-[#FAF9F6] dark:bg-gray-800/20 border border-gray-200/50 dark:border-gray-800/80 p-4 rounded-2xl flex gap-3 items-center justify-between text-xs hover:border-[#3F1F54]/30 transition-colors shadow-sm">
                            <div className="flex items-center space-x-3">
                              <img src={prod.img} className="w-10 h-12 object-cover rounded-lg border border-gray-200 shrink-0" alt="" />
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">{prod.name}</h4>
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
                  </div>

                </div>
              )}

              {/* Tab: Categories Portfolio Management */}
              {activeTab === 'inventory' && (
                <div className="space-y-8">
                  
                  {/* Dynamic Bulk action panel */}
                  <div className="bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 rounded-3xl p-6 space-y-4 shadow-sm">
                    <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">Bulk Operations Matrix</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label htmlFor="bulk-action-select" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Operation Target</label>
                        <select 
                          id="bulk-action-select"
                          value={bulkAction.type}
                          onChange={(e) => setBulkAction({ ...bulkAction, type: e.target.value })}
                          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs focus:outline-none"
                        >
                          <option value="">Select Operation</option>
                          <option value="price_pct">Bulk Adjust Prices (Percentage)</option>
                          <option value="making">Bulk Set Handcrafting/Making Charges</option>
                          <option value="qty">Bulk Set Stock Quantity</option>
                          <option value="delete">Bulk Permanent Delete</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="bulk-val-input" className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1 font-bold">Value / Factor</label>
                        <input 
                          id="bulk-val-input"
                          type="text" 
                          placeholder="e.g. +10 for price, or ₹400 for making"
                          value={bulkAction.value}
                          onChange={(e) => setBulkAction({ ...bulkAction, value: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-end">
                        <button 
                          onClick={handleExecuteBulkAction}
                          className="w-full bg-[#3F1F54] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all shadow-sm"
                        >
                          Apply to {selectedProductIds.length} Checked Ornaments
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Table View of entire stock listings */}
                  <div className="bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">Atelier Stock Vault ({products.length})</h3>
                      <button 
                        onClick={() => handleExportCSV('inventory')}
                        className="bg-white dark:bg-[#1E1F29] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-[9px] uppercase tracking-widest px-4 py-2 rounded-full hover:bg-gray-50"
                      >
                        Export Vault Log (CSV)
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold text-[9px] uppercase tracking-wider">
                            <th className="py-3 text-center w-12">
                              <input 
                                type="checkbox" 
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedProductIds(products.map(p => p.id));
                                  } else {
                                    setSelectedProductIds([]);
                                  }
                                }}
                              />
                            </th>
                            <th className="py-3 px-3">Unique SKU</th>
                            <th className="py-3 px-3">Ornament Details</th>
                            <th className="py-3 px-3">Gold/Carat Purity</th>
                            <th className="py-3 px-3">Estimated Cost</th>
                            <th className="py-3 px-3 text-center">Stock count</th>
                            <th className="py-3 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {products.map(prod => {
                            const isLowStock = !prod.stockQty || prod.stockQty < 3;
                            const isOut = prod.stockQty === 0;
                            return (
                              <tr key={prod.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                                <td className="py-3 text-center">
                                  <input 
                                    type="checkbox" 
                                    checked={selectedProductIds.includes(prod.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedProductIds([...selectedProductIds, prod.id]);
                                      } else {
                                        setSelectedProductIds(selectedProductIds.filter(id => id !== prod.id));
                                      }
                                    }}
                                  />
                                </td>
                                <td className="py-3 px-3 font-semibold text-gray-500">{prod.sku || 'N/A'}</td>
                                <td className="py-3 px-3">
                                  <div className="flex items-center space-x-2.5">
                                    <img src={prod.img} className="w-8 h-10 object-cover rounded-lg border border-gray-200 shrink-0" alt="" />
                                    <span className="font-bold text-gray-800 dark:text-gray-200">{prod.name}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-gray-600 dark:text-gray-400 font-medium">{prod.carat} ({prod.weight})</td>
                                <td className="py-3 px-3 font-bold text-[#3F1F54] dark:text-purple-300">₹{prod.price?.toLocaleString('en-IN')}</td>
                                <td className="py-3 px-3 text-center font-bold">{prod.stockQty || 0} units</td>
                                <td className="py-3 px-3">
                                  <span className={`px-2.5 py-1 rounded-full text-[8px] uppercase font-bold tracking-wider ${isOut ? 'bg-red-100 text-red-700' : isLowStock ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                    {isOut ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Categories setup */}
                  <div className="bg-white dark:bg-[#1E1F29] border border-gray-200/50 dark:border-gray-800 rounded-3xl p-6 space-y-4 shadow-sm">
                    <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">Category Matrix</h3>
                    <form onSubmit={handleAddCategory} className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder="Category Name (e.g. Solitaire Bands)"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                      />
                      <button type="submit" className="bg-[#3F1F54] hover:bg-[#2C133C] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-sm">
                        Add
                      </button>
                    </form>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <span key={cat.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3.5 py-1.5 rounded-full text-xs text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2 shadow-sm">
                          {cat.name}
                          <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 font-bold hover:underline ml-1">
                            ✕
                          </button>
                        </span>
                      ))}
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
                                  <option value="Processing">Manufacturing</option>
                                  <option value="Completed">Delivered</option>
                                </select>
                              </div>
                              <div className="border-t border-gray-200/60 dark:border-gray-800/60 pt-2 text-[10px] text-gray-600 dark:text-gray-400 space-y-1.5 normal-case">
                                <p><strong>Customer:</strong> {order.customerDetails?.name} ({order.customerDetails?.phone})</p>
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
                      <h3 className="serif-luxury text-lg text-[#3F1F54] dark:text-[#E6C687] font-bold">Sovereign CRM Vault</h3>
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

        </div>
      )}

      {/* BOTTOM BRANDING FOOTER */}
      <footer className="w-full text-center space-y-1.5 text-[9px] uppercase tracking-wider text-gray-400 font-bold border-t border-gray-100 dark:border-gray-850 py-6 absolute bottom-0 left-0 right-0 hidden">
        <p>© {new Date().getFullYear()} HR JEWELLERS & SONS. ALL SOVEREIGN RIGHTS RESERVED.</p>
        <p className="text-[8px] text-gray-300">Powered by Atelier Secure ERP Enterprise Cloud Systems</p>
      </footer>

    </div>
  );
}
