// import React,{useEffect,useMemo,useState} from 'react';
// import {Routes,Route,useLocation,useNavigate,NavLink,useParams} from 'react-router-dom';
// import {AppBar,Toolbar,Box,Drawer,List,ListItemButton,ListItemIcon,ListItemText,Typography,IconButton,Button,Avatar,Divider,Chip,Snackbar,Alert,Dialog,DialogTitle,DialogContent,DialogActions,TextField,MenuItem,Select,InputLabel,FormControl,Badge,Tooltip} from '@mui/material';
// import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';import MenuRoundedIcon from '@mui/icons-material/MenuRounded';import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';import SearchRoundedIcon from '@mui/icons-material/SearchRounded';import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';import AddRoundedIcon from '@mui/icons-material/AddRounded';import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
// import {load,save,KEYS,uid} from './utils/storage';import {seedAll} from './utils/seed';
// import Dashboard from './pages/Dashboard';import MenuPage from './pages/MenuPage';import Categories from './pages/Categories';import NewOrder from './pages/NewOrder';import Orders from './pages/Orders';import OrderDetails from './pages/OrderDetails';import Customers from './pages/Customers';import Reports from './pages/Reports';

// const nav=[['/','Dashboard',DashboardRoundedIcon],['/menu','Menu',RestaurantMenuRoundedIcon],['/categories','Categories',CategoryRoundedIcon],['/new-order','New Order',PointOfSaleRoundedIcon],['/orders','Orders',ReceiptLongRoundedIcon],['/customers','Customers',PeopleRoundedIcon],['/reports','Sales Reports',AssessmentRoundedIcon]];
// const titles={'/':'Dashboard','/menu':'Menu Management','/categories':'Categories','/new-order':'New Order','/current-order':'Current Order','/orders':'Orders','/customers':'Customers','/reports':'Sales Reports'};
// export default function App(){const [drawer,setDrawer]=useState(false);const [data,setData]=useState(()=>{let s=load(KEYS.menu,null);if(!s){const x=seedAll();Object.entries({menu:x.menu,categories:x.categories,customers:x.customers,orders:x.orders,settings:x.settings}).forEach(([k,v])=>save(KEYS[k],v));return x}return{menu:s,categories:load(KEYS.categories,[]),customers:load(KEYS.customers,[]),orders:load(KEYS.orders,[]),settings:load(KEYS.settings,{taxRate:10,restaurantName:'SAVORA KITCHEN',cashier:'Alex Morgan'})}});const [toast,setToast]=useState({open:false,msg:'',severity:'success'});const [cart,setCart]=useState([]);const location=useLocation();const navigate=useNavigate();
// const persist=(key,val)=>{save(KEYS[key],val);setData(d=>({...d,[key]:val}));};const notify=(msg,severity='success')=>setToast({open:true,msg,severity});
// useEffect(()=>{document.title=`${titles[location.pathname]||'Savora POS'} · Savora Kitchen`},[location.pathname]);
// const ctx={...data,persist,cart,setCart,notify,settings:data.settings};
// return <Box className="app-shell"><AppBar position="fixed" className="topbar"><Toolbar sx={{gap:2,minHeight:'72px!important'}}><IconButton onClick={()=>setDrawer(true)} className="mobile-menu"><MenuRoundedIcon/></IconButton><Box className="brand-mini"><span className="brand-mark">S</span><Box><Typography className="brand-name">SAVORA</Typography><Typography className="brand-sub">KITCHEN POS</Typography></Box></Box><Box sx={{flex:1}}/><Tooltip title="Current order"><IconButton onClick={()=>navigate('/new-order')}><Badge badgeContent={cart.reduce((a,x)=>a+x.quantity,0)} color="primary"><ShoppingBasketRoundedIcon/></Badge></IconButton></Tooltip><IconButton><NotificationsRoundedIcon/></IconButton><Divider orientation="vertical" flexItem sx={{my:1.5}}/><Box className="cashier"><Avatar sx={{width:38,height:38,bgcolor:'primary.main',color:'#101319',fontWeight:800}}>AM</Avatar><Box sx={{display:{xs:'none',sm:'block'}}}><Typography fontWeight={700} fontSize={13}>{data.settings.cashier}</Typography><Typography variant="caption" color="text.secondary">Cashier</Typography></Box></Box></Toolbar></AppBar>
// <Drawer variant="permanent" className="desktop-drawer"><Sidebar/></Drawer><Drawer open={drawer} onClose={()=>setDrawer(false)} className="mobile-drawer"><Sidebar close={()=>setDrawer(false)}/></Drawer>
// <Box component="main" className="main-content"><Box className="page-wrap"><Box className="page-heading"><Box><Typography variant="h4" className="page-title">{titles[location.pathname]||'Order Details'}</Typography><Typography variant="body2" color="text.secondary">{location.pathname==='/new-order'?'Create and complete customer orders in seconds.':'A polished command center for your restaurant operations.'}</Typography></Box>{location.pathname==='/menu'&&<Button startIcon={<AddRoundedIcon/>} variant="contained" onClick={()=>window.dispatchEvent(new CustomEvent('open-add-menu'))}>Add Menu Item</Button>}{location.pathname==='/customers'&&<Button startIcon={<AddRoundedIcon/>} variant="contained" onClick={()=>window.dispatchEvent(new CustomEvent('open-add-customer'))}>Add Customer</Button>}</Box><Routes><Route path="/" element={<Dashboard {...ctx}/>}/><Route path="/menu" element={<MenuPage {...ctx}/>}/><Route path="/categories" element={<Categories {...ctx}/>}/><Route path="/new-order" element={<NewOrder {...ctx}/>}/><Route path="/current-order" element={<NewOrder {...ctx}/>}/><Route path="/orders" element={<Orders {...ctx}/>}/><Route path="/orders/:orderId" element={<OrderDetails {...ctx}/>}/><Route path="/customers" element={<Customers {...ctx}/>}/><Route path="/reports" element={<Reports {...ctx}/>}/></Routes></Box></Box><Snackbar open={toast.open} autoHideDuration={3500} onClose={()=>setToast(x=>({...x,open:false}))} anchorOrigin={{vertical:'bottom',horizontal:'right'}}><Alert severity={toast.severity} variant="filled" onClose={()=>setToast(x=>({...x,open:false}))}>{toast.msg}</Alert></Snackbar></Box>}
// function Sidebar({close}){return <Box className="sidebar"><Box className="sidebar-logo"><span className="brand-mark big">S</span><Box><Typography className="brand-name">SAVORA</Typography><Typography className="brand-sub">KITCHEN</Typography></Box></Box><Box className="sidebar-section">MAIN</Box><List>{nav.map(([path,label,Icon])=><ListItemButton key={path} component={NavLink} to={path} onClick={close} className="nav-item" end={path==='/' }><ListItemIcon><Icon/></ListItemIcon><ListItemText primary={label}/>{label==='New Order'&&<Chip size="small" label="POS"/>}</ListItemButton>)}</List><Box className="sidebar-bottom"><Box className="tip-card"><Typography variant="caption" color="primary.light" fontWeight={800}>QUICK TIP</Typography><Typography fontSize={13} fontWeight={700} mt={.5}>Use Ctrl + K to quickly search your menu.</Typography></Box><List><ListItemButton><ListItemIcon><SettingsRoundedIcon/></ListItemIcon><ListItemText primary="Settings"/></ListItemButton><ListItemButton><ListItemIcon><LogoutRoundedIcon/></ListItemIcon><ListItemText primary="Sign out"/></ListItemButton></List><Typography variant="caption" color="text.secondary">Savora POS v1.0 • Exam Edition</Typography></Box></Box>}


// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   Routes,
//   Route,
//   useLocation,
//   useNavigate,
//   NavLink,
//   useParams
// } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   IconButton,
//   Button,
//   Avatar,
//   Divider,
//   Chip,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Badge,
//   Tooltip
// } from '@mui/material';
// import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
// import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
// import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
// import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
// import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
// import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
// import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
// import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import AddRoundedIcon from '@mui/icons-material/AddRounded';
// import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
// import { load, save, KEYS, uid } from './utils/storage';
// import { seedAll } from './utils/seed';
// import Dashboard from './pages/Dashboard';
// import MenuPage from './pages/MenuPage';
// import Categories from './pages/Categories';
// import NewOrder from './pages/NewOrder';
// import Orders from './pages/Orders';
// import OrderDetails from './pages/OrderDetails';
// import Customers from './pages/Customers';
// import Reports from './pages/Reports';

// const nav = [
//   ['/', 'Dashboard', DashboardRoundedIcon],
//   ['/menu', 'Menu', RestaurantMenuRoundedIcon],
//   ['/categories', 'Categories', CategoryRoundedIcon],
//   ['/new-order', 'New Order', PointOfSaleRoundedIcon],
//   ['/orders', 'Orders', ReceiptLongRoundedIcon],
//   ['/customers', 'Customers', PeopleRoundedIcon],
//   ['/reports', 'Sales Reports', AssessmentRoundedIcon]
// ];

// const titles = {
//   '/': 'Dashboard',
//   '/menu': 'Menu Management',
//   '/categories': 'Categories',
//   '/new-order': 'New Order',
//   '/current-order': 'Current Order',
//   '/orders': 'Orders',
//   '/customers': 'Customers',
//   '/reports': 'Sales Reports'
// };

// export default function App() {
//   const [drawer, setDrawer] = useState(false);
//   const [data, setData] = useState(() => {
//     let s = load(KEYS.menu, null);

//     if (!s) {
//       const x = seedAll();

//       Object.entries({
//         menu: x.menu,
//         categories: x.categories,
//         customers: x.customers,
//         orders: x.orders,
//         settings: x.settings
//       }).forEach(([k, v]) => save(KEYS[k], v));

//       return x;
//     }

//     return {
//       menu: s,
//       categories: load(KEYS.categories, []),
//       customers: load(KEYS.customers, []),
//       orders: load(KEYS.orders, []),
//       settings: load(KEYS.settings, {
//         taxRate: 10,
//         restaurantName: 'SAVORA KITCHEN',
//         cashier: 'Alex Morgan'
//       })
//     };
//   });

//   const [toast, setToast] = useState({
//     open: false,
//     msg: '',
//     severity: 'success'
//   });

//   const [cart, setCart] = useState([]);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const persist = (key, val) => {
//     save(KEYS[key], val);
//     setData(d => ({ ...d, [key]: val }));
//   };

//   const notify = (msg, severity = 'success') =>
//     setToast({ open: true, msg, severity });

//   useEffect(() => {
//     document.title = `${titles[location.pathname] || 'Savora POS'} · Savora Kitchen`;
//   }, [location.pathname]);

//   const ctx = {
//     ...data,
//     persist,
//     cart,
//     setCart,
//     notify,
//     settings: data.settings
//   };

//   return (
//     <Box className="app-shell">
//       <AppBar position="fixed" className="topbar">
//         <Toolbar sx={{ gap: 2, minHeight: '72px!important' }}>
//           <IconButton
//             onClick={() => setDrawer(true)}
//             className="mobile-menu"
//           >
//             <MenuRoundedIcon />
//           </IconButton>

//           <Box className="brand-mini">
//             <span className="brand-mark">S</span>

//             <Box>
//               <Typography className="brand-name">SAVORA</Typography>
//               <Typography className="brand-sub">KITCHEN POS</Typography>
//             </Box>
//           </Box>

//           <Box sx={{ flex: 1 }} />

//           <Tooltip title="Current order">
//             <IconButton onClick={() => navigate('/new-order')}>
//               <Badge
//                 badgeContent={cart.reduce((a, x) => a + x.quantity, 0)}
//                 color="primary"
//               >
//                 <ShoppingBasketRoundedIcon />
//               </Badge>
//             </IconButton>
//           </Tooltip>

//           <IconButton>
//             <NotificationsRoundedIcon />
//           </IconButton>

//           <Divider
//             orientation="vertical"
//             flexItem
//             sx={{ my: 1.5 }}
//           />

//           <Box className="cashier">
//             <Avatar
//               sx={{
//                 width: 41,
//                 height: 40,
//                 bgcolor: 'primary.main',
//                 color: '#101319',
//                 fontWeight: 800
//               }}
//             >
//               AM
//             </Avatar>

//             <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//               <Typography fontWeight={700} fontSize={15}>
//                 {data.settings.cashier}
//               </Typography>

//               <Typography variant="caption" color="text.secondary">
//                 Cashier
//               </Typography>
//             </Box>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Drawer variant="permanent" className="desktop-drawer">
//         <Sidebar />
//       </Drawer>

//       <Drawer
//         open={drawer}
//         onClose={() => setDrawer(false)}
//         className="mobile-drawer"
//       >
//         <Sidebar close={() => setDrawer(false)} />
//       </Drawer>

//       <Box component="main" className="main-content">
//         <Box className="page-wrap">
//           <Box className="page-heading">
//             <Box>
//               <Typography
//                 variant="h4"
//                 className="page-title"
//               >
//                 {titles[location.pathname] || 'Order Details'}
//               </Typography>

//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//               >
//                 {location.pathname === '/new-order'
//                   ? 'Create and complete customer orders in seconds.'
//                   : 'A polished command center for your restaurant operations.'}
//               </Typography>
//             </Box>

//             {location.pathname === '/menu' && (
//               <Button
//                 startIcon={<AddRoundedIcon />}
//                 variant="contained"
//                 onClick={() =>
//                   window.dispatchEvent(
//                     new CustomEvent('open-add-menu')
//                   )
//                 }
//               >
//                 Add Menu Item
//               </Button>
//             )}

//             {location.pathname === '/customers' && (
//               <Button
//                 startIcon={<AddRoundedIcon />}
//                 variant="contained"
//                 onClick={() =>
//                   window.dispatchEvent(
//                     new CustomEvent('open-add-customer')
//                   )
//                 }
//               >
//                 Add Customer
//               </Button>
//             )}
//           </Box>

//           <Routes>
//             <Route path="/" element={<Dashboard {...ctx} />} />
//             <Route path="/menu" element={<MenuPage {...ctx} />} />
//             <Route
//               path="/categories"
//               element={<Categories {...ctx} />}
//             />
//             <Route
//               path="/new-order"
//               element={<NewOrder {...ctx} />}
//             />
//             <Route
//               path="/current-order"
//               element={<NewOrder {...ctx} />}
//             />
//             <Route
//               path="/orders"
//               element={<Orders {...ctx} />}
//             />
//             <Route
//               path="/orders/:orderId"
//               element={<OrderDetails {...ctx} />}
//             />
//             <Route
//               path="/customers"
//               element={<Customers {...ctx} />}
//             />
//             <Route
//               path="/reports"
//               element={<Reports {...ctx} />}
//             />
//           </Routes>
//         </Box>
//       </Box>

//       <Snackbar
//         open={toast.open}
//         autoHideDuration={3500}
//         onClose={() =>
//           setToast(x => ({ ...x, open: false }))
//         }
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right'
//         }}
//       >
//         <Alert
//           severity={toast.severity}
//           variant="filled"
//           onClose={() =>
//             setToast(x => ({ ...x, open: false }))
//           }
//         >
//           {toast.msg}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// function Sidebar({ close }) {
//   return (
//     <Box className="sidebar">
//       <Box className="sidebar-logo">
//         <span className="brand-mark big">S</span>

//         <Box>
//           <Typography className="brand-name">
//             SAVORA
//           </Typography>

//           <Typography className="brand-sub">
//             KITCHEN
//           </Typography>
//         </Box>
//       </Box>

//       <Box className="sidebar-section">
//         MAIN
//       </Box>

//       <List>
//         {nav.map(([path, label, Icon]) => (
//           <ListItemButton
//             key={path}
//             component={NavLink}
//             to={path}
//             onClick={close}
//             className="nav-item"
//             end={path === '/'}
//           >
//             <ListItemIcon>
//               <Icon />
//             </ListItemIcon>

//             <ListItemText primary={label} />

//             {label === 'New Order' && (
//               <Chip
//                 size="small"
//                 label="POS"
//               />
//             )}
//           </ListItemButton>
//         ))}
//       </List>

//       <Box className="sidebar-bottom">
//         <Box className="tip-card">
//           <Typography
//             variant="caption"
//             color="primary.light"
//             fontWeight={800}
//           >
//             QUICK TIP
//           </Typography>

//           <Typography
//             fontSize={13}
//             fontWeight={500}
//             mt={.5}
//           >
//            Use SAVORA to simplify service and maximize efficiency.
//           </Typography>
//         </Box>

//         <List>
//           <ListItemButton>
//             <ListItemIcon>
//               <SettingsRoundedIcon />
//             </ListItemIcon>

//             <ListItemText primary="Settings" />
//           </ListItemButton>

//           <ListItemButton>
//             <ListItemIcon>
//               <LogoutRoundedIcon />
//             </ListItemIcon>

//             <ListItemText primary="Sign out" />
//           </ListItemButton>
//         </List>

//         <Typography
//           variant="caption"
//           color="text.secondary"
//         >
//           Savora  •  POS v1.0
//         </Typography>
//       </Box>
//     </Box>
//   );
// }


import React, { useEffect, useMemo, useState } from 'react';

import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  NavLink
} from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Button,
  Avatar,
  Divider,
  Chip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Badge,
  Tooltip,
  Popover,
  Paper,
  Stack,
  Switch,
  FormControlLabel
} from '@mui/material';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import { load, save, KEYS } from './utils/storage';
import { seedAll } from './utils/seed';

import {
  initializeAuth,
  loginUser,
  getSession,
  logoutUser
} from './utils/auth';

import Dashboard from './pages/Dashboard';
import MenuPage from './pages/MenuPage';
import Categories from './pages/Categories';
import NewOrder from './pages/NewOrder';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Customers from './pages/Customers';
import Reports from './pages/Reports';


const nav = [
  ['/', 'Dashboard', DashboardRoundedIcon],
  ['/menu', 'Menu', RestaurantMenuRoundedIcon],
  ['/categories', 'Categories', CategoryRoundedIcon],
  ['/new-order', 'New Order', PointOfSaleRoundedIcon],
  ['/orders', 'Orders', ReceiptLongRoundedIcon],
  ['/customers', 'Customers', PeopleRoundedIcon],
  ['/reports', 'Sales Reports', AssessmentRoundedIcon]
];


const titles = {
  '/': 'Dashboard',
  '/menu': 'Menu Management',
  '/categories': 'Categories',
  '/new-order': 'New Order',
  '/current-order': 'Current Order',
  '/orders': 'Orders',
  '/customers': 'Customers',
  '/reports': 'Sales Reports'
};


const defaultSettings = {
  taxRate: 10,
  restaurantName: 'SAVORA KITCHEN',
  cashier: 'Junior Paccy'
};


const notifications = [
  {
    id: 1,
    title: 'Welcome to SAVORA',
    message: 'Your restaurant POS is ready for service.',
    type: 'success'
  },
  {
    id: 2,
    title: 'Menu ready',
    message: 'Your menu items are available for new orders.',
    type: 'info'
  },
  {
    id: 3,
    title: 'POS reminder',
    message: 'Check the current order before completing payment.',
    type: 'warning'
  }
];


export default function App({
  themeMode,
  setThemeMode
}) {
  const [drawer, setDrawer] = useState(false);

  const [data, setData] = useState(() => {
    let s = load(KEYS.menu, null);

    if (!s) {
      const x = seedAll();

      x.settings = {
        ...x.settings,
        cashier: 'Junior Paccy'
      };

      Object.entries({
        menu: x.menu,
        categories: x.categories,
        customers: x.customers,
        orders: x.orders,
        settings: x.settings
      }).forEach(([k, v]) => {
        save(KEYS[k], v);
      });

      return x;
    }

    return {
      menu: s,

      categories: load(
        KEYS.categories,
        []
      ),

      customers: load(
        KEYS.customers,
        []
      ),

      orders: load(
        KEYS.orders,
        []
      ),

      settings: load(
        KEYS.settings,
        defaultSettings
      )
    };
  });


  const [toast, setToast] = useState({
    open: false,
    msg: '',
    severity: 'success'
  });


  const [cart, setCart] = useState([]);

const [session, setSession] = useState(() => {
  initializeAuth();
  return getSession();
});

const loggedIn = Boolean(session);


  const [notificationAnchor, setNotificationAnchor] =
    useState(null);


  const [settingsOpen, setSettingsOpen] =
    useState(false);


  const [logoutOpen, setLogoutOpen] =
    useState(false);


  const [settingsForm, setSettingsForm] =
    useState(data.settings);


  const [readNotifications, setReadNotifications] =
    useState([]);


  const location = useLocation();
  const navigate = useNavigate();


  const unreadCount =
    notifications.filter(
      item => !readNotifications.includes(item.id)
    ).length;


  const persist = (key, val) => {
    save(KEYS[key], val);

    setData(d => ({
      ...d,
      [key]: val
    }));
  };


  const notify = (
    msg,
    severity = 'success'
  ) => {
    setToast({
      open: true,
      msg,
      severity
    });
  };


  useEffect(() => {
    document.title =
      `${titles[location.pathname] || 'Savora POS'} · Savora Kitchen`;
  }, [location.pathname]);


  useEffect(() => {
    document.body.classList.toggle(
      'light-mode',
      themeMode === 'light'
    );

    localStorage.setItem(
      'savora_theme',
      themeMode
    );
  }, [themeMode]);


  useEffect(() => {
    setSettingsForm(data.settings);
  }, [data.settings]);


  const ctx = {
    ...data,
    persist,
    cart,
    setCart,
    notify,
    settings: data.settings
  };


  const openNotifications = event => {
    setNotificationAnchor(event.currentTarget);

    setReadNotifications(
      notifications.map(item => item.id)
    );
  };


  const closeNotifications = () => {
    setNotificationAnchor(null);
  };


  const openSettings = () => {
    setSettingsForm(data.settings);
    setSettingsOpen(true);
  };


  const closeSettings = () => {
    setSettingsOpen(false);
  };


  const saveSettings = () => {
    persist('settings', {
      ...settingsForm,
      taxRate: Number(settingsForm.taxRate)
    });

    setSettingsOpen(false);

    notify(
      'Settings saved successfully.'
    );
  };


const signOut = () => {
  logoutUser();

  setSession(null);
  setLogoutOpen(false);
  setCart([]);

  notify(
    'You have been signed out.',
    'info'
  );
};


const signIn = (username, password) => {
  const result = loginUser(username, password);

  if (!result.success) {
    return result;
  }

  setSession(result.user);

  return {
    success: true
  };
};

  if (!loggedIn) {
    return (
      <LoginScreen
        cashier={data.settings.cashier}
        restaurantName={data.settings.restaurantName}
        onLogin={signIn}
      />
    );
  }


  return (
    <Box
      className={`app-shell ${
        themeMode === 'light'
          ? 'light-mode'
          : ''
      }`}
    >

      {/* TOP BAR */}

      <AppBar
        position="fixed"
        className="topbar"
      >
        <Toolbar
          sx={{
            gap: 2,
            minHeight: '72px!important'
          }}
        >

          <IconButton
            onClick={() => setDrawer(true)}
            className="mobile-menu"
          >
            <MenuRoundedIcon />
          </IconButton>


          <Box className="brand-mini">

            <span className="brand-mark">
              S
            </span>

            <Box>
              <Typography className="brand-name">
                SAVORA
              </Typography>

              <Typography className="brand-sub">
                KITCHEN POS
              </Typography>
            </Box>

          </Box>


          <Box sx={{ flex: 1 }} />


          {/* CURRENT ORDER */}

          <Tooltip title="Current order">

            <IconButton
              onClick={() =>
                navigate('/new-order')
              }
            >

              <Badge
                badgeContent={cart.reduce(
                  (a, x) =>
                    a + x.quantity,
                  0
                )}
                color="primary"
              >

                <ShoppingBasketRoundedIcon />

              </Badge>

            </IconButton>

          </Tooltip>


          {/* NOTIFICATIONS */}

          <Tooltip title="Notifications">

            <IconButton
              onClick={openNotifications}
            >

              <Badge
                badgeContent={unreadCount}
                color="error"
              >

                <NotificationsRoundedIcon />

              </Badge>

            </IconButton>

          </Tooltip>


          <Divider
            orientation="vertical"
            flexItem
            sx={{ my: 1.5 }}
          />


          {/* CASHIER */}

          <Box className="cashier">

            <Avatar
              sx={{
                width: 41,
                height: 40,
                bgcolor: 'primary.main',
                color: '#101319',
                fontWeight: 800
              }}
            >
              JP
            </Avatar>


            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block'
                }
              }}
            >

              <Typography
                fontWeight={700}
                fontSize={15}
              >
                {data.settings.cashier}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Cashier
              </Typography>

            </Box>

          </Box>

        </Toolbar>
      </AppBar>


      {/* NOTIFICATION POPUP */}

      <Popover
        open={Boolean(notificationAnchor)}
        anchorEl={notificationAnchor}
        onClose={closeNotifications}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >

        <Paper
          className="notification-panel"
          elevation={8}
        >

          <Box className="notification-header">

            <Box>

              <Typography
                fontWeight={800}
              >
                Notifications
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Recent SAVORA activity
              </Typography>

            </Box>

            <Chip
              size="small"
              label={`${unreadCount} new`}
              color="primary"
            />

          </Box>


          <Divider />


          <Box className="notification-list">

            {notifications.map(item => (

              <Box
                key={item.id}
                className="notification-item"
                onClick={() => {
                  setReadNotifications(
                    current =>
                      current.includes(item.id)
                        ? current
                        : [
                            ...current,
                            item.id
                          ]
                  );
                }}
              >

                <Box className="notification-icon">

                  <CheckCircleRoundedIcon />

                </Box>


                <Box sx={{ flex: 1 }}>

                  <Typography
                    fontWeight={700}
                    fontSize={14}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.message}
                  </Typography>

                </Box>

              </Box>

            ))}

          </Box>


          <Button
            fullWidth
            size="small"
            onClick={() => {
              setReadNotifications(
                notifications.map(
                  item => item.id
                )
              );

              closeNotifications();
            }}
          >
            Mark all as read
          </Button>

        </Paper>

      </Popover>


      {/* SIDEBAR */}

      <Drawer
        variant="permanent"
        className="desktop-drawer"
      >
        <Sidebar
          onSettings={openSettings}
          onSignOut={() =>
            setLogoutOpen(true)
          }
        />
      </Drawer>


      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        className="mobile-drawer"
      >
        <Sidebar
          close={() => setDrawer(false)}
          onSettings={openSettings}
          onSignOut={() =>
            setLogoutOpen(true)
          }
        />
      </Drawer>


      {/* MAIN CONTENT */}

      <Box
        component="main"
        className="main-content"
      >

        <Box className="page-wrap">

          <Box className="page-heading">

            <Box>

              <Typography
                variant="h4"
                className="page-title"
              >
                {
                  titles[
                    location.pathname
                  ] || 'Order Details'
                }
              </Typography>


              <Typography
                variant="body2"
                color="text.secondary"
              >
                {location.pathname ===
                '/new-order'
                  ? 'Create and complete customer orders in seconds.'
                  : 'A polished command center for your restaurant operations.'
                }
              </Typography>

            </Box>


            {location.pathname ===
              '/menu' && (

              <Button
                startIcon={
                  <AddRoundedIcon />
                }
                variant="contained"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent(
                      'open-add-menu'
                    )
                  )
                }
              >
                Add Menu Item
              </Button>

            )}


            {location.pathname ===
              '/customers' && (

              <Button
                startIcon={
                  <AddRoundedIcon />
                }
                variant="contained"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent(
                      'open-add-customer'
                    )
                  )
                }
              >
                Add Customer
              </Button>

            )}

          </Box>


          <Routes>

            <Route
              path="/"
              element={
                <Dashboard {...ctx} />
              }
            />

            <Route
              path="/menu"
              element={
                <MenuPage {...ctx} />
              }
            />

            <Route
              path="/categories"
              element={
                <Categories {...ctx} />
              }
            />

            <Route
              path="/new-order"
              element={
                <NewOrder {...ctx} />
              }
            />

            <Route
              path="/current-order"
              element={
                <NewOrder {...ctx} />
              }
            />

            <Route
              path="/orders"
              element={
                <Orders {...ctx} />
              }
            />

            <Route
              path="/orders/:orderId"
              element={
                <OrderDetails {...ctx} />
              }
            />

            <Route
              path="/customers"
              element={
                <Customers {...ctx} />
              }
            />

            <Route
              path="/reports"
              element={
                <Reports {...ctx} />
              }
            />

          </Routes>

        </Box>

      </Box>


      {/* SETTINGS DIALOG */}

      <Dialog
        open={settingsOpen}
        onClose={closeSettings}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>
          SAVORA Settings
        </DialogTitle>


        <DialogContent>

          <Stack spacing={2.5} mt={1}>

            <TextField
              label="Restaurant Name"
              fullWidth
              value={
                settingsForm.restaurantName
              }
              onChange={e =>
                setSettingsForm({
                  ...settingsForm,
                  restaurantName:
                    e.target.value
                })
              }
            />


            <TextField
              label="Cashier Name"
              fullWidth
              value={
                settingsForm.cashier
              }
              onChange={e =>
                setSettingsForm({
                  ...settingsForm,
                  cashier:
                    e.target.value
                })
              }
            />


            <TextField
              select
              label="Tax Rate"
              value={
                settingsForm.taxRate
              }
              onChange={e =>
                setSettingsForm({
                  ...settingsForm,
                  taxRate:
                    e.target.value
                })
              }
            >

              {[0, 5, 10, 15, 18].map(
                rate => (
                  <MenuItem
                    key={rate}
                    value={rate}
                  >
                    {rate}%
                  </MenuItem>
                )
              )}

            </TextField>


            <Box className="appearance-setting">

              <Box>

                <Typography
                  fontWeight={800}
                >
                  Appearance
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Choose how SAVORA looks.
                </Typography>

              </Box>


              <FormControlLabel
                control={
                  <Switch
                    checked={
                      themeMode === 'dark'
                    }
                    onChange={e =>
                      setThemeMode(
                        e.target.checked
                          ? 'dark'
                          : 'light'
                      )
                    }
                  />
                }
                label={
                  themeMode === 'dark'
                    ? 'Dark'
                    : 'Light'
                }
              />

            </Box>


            <Box className="theme-preview">

              {themeMode === 'dark' ? (
                <DarkModeRoundedIcon />
              ) : (
                <LightModeRoundedIcon />
              )}

              <Box>

                <Typography
                  fontWeight={700}
                >
                  {themeMode === 'dark'
                    ? 'Dark mode'
                    : 'Light mode'}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Your preference is saved automatically.
                </Typography>

              </Box>

            </Box>

          </Stack>

        </DialogContent>


        <DialogActions>

          <Button
            onClick={closeSettings}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={saveSettings}
          >
            Save Settings
          </Button>

        </DialogActions>

      </Dialog>


      {/* SIGN OUT CONFIRMATION */}

      <Dialog
        open={logoutOpen}
        onClose={() =>
          setLogoutOpen(false)
        }
        maxWidth="xs"
        fullWidth
      >

        <DialogTitle>
          Sign out of SAVORA?
        </DialogTitle>


        <DialogContent>

          <Typography
            color="text.secondary"
          >
            You will return to the SAVORA
            sign-in screen. Your restaurant
            data will remain saved.
          </Typography>

        </DialogContent>


        <DialogActions>

          <Button
            onClick={() =>
              setLogoutOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            startIcon={
              <LogoutRoundedIcon />
            }
            onClick={signOut}
          >
            Sign Out
          </Button>

        </DialogActions>

      </Dialog>


      {/* TOAST */}

      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={() =>
          setToast(x => ({
            ...x,
            open: false
          }))
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >

        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() =>
            setToast(x => ({
              ...x,
              open: false
            }))
          }
        >
          {toast.msg}
        </Alert>

      </Snackbar>

    </Box>
  );
}


/* SIDEBAR */

function Sidebar({
  close,
  onSettings,
  onSignOut
}) {

  return (
    <Box className="sidebar">

      <Box className="sidebar-logo">

        <span className="brand-mark big">
          S
        </span>

        <Box>

          <Typography className="brand-name">
            SAVORA
          </Typography>

          <Typography className="brand-sub">
            KITCHEN
          </Typography>

        </Box>

      </Box>


      <Box className="sidebar-section">
        MAIN
      </Box>


      <List>

        {nav.map(
          ([path, label, Icon]) => (

            <ListItemButton
              key={path}
              component={NavLink}
              to={path}
              onClick={close}
              className="nav-item"
              end={path === '/'}
            >

              <ListItemIcon>
                <Icon />
              </ListItemIcon>

              <ListItemText
                primary={label}
              />

              {label ===
                'New Order' && (

                <Chip
                  size="small"
                  label="POS"
                />

              )}

            </ListItemButton>

          )
        )}

      </List>


      <Box className="sidebar-bottom">

        <Box className="tip-card">

          <Typography
            variant="caption"
            color="primary.light"
            fontWeight={800}
          >
            QUICK TIP
          </Typography>

          <Typography
            fontSize={13}
            fontWeight={500}
            mt={0.5}
          >
            Use SAVORA to simplify service
            and maximize efficiency.
          </Typography>

        </Box>


        <List>

          {/* SETTINGS */}

          <ListItemButton
            onClick={() => {
              if (close) close();
              onSettings();
            }}
          >

            <ListItemIcon>
              <SettingsRoundedIcon />
            </ListItemIcon>

            <ListItemText
              primary="Settings"
            />

          </ListItemButton>


          {/* SIGN OUT */}

          <ListItemButton
            onClick={() => {
              if (close) close();
              onSignOut();
            }}
          >

            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>

            <ListItemText
              primary="Sign out"
            />

          </ListItemButton>

        </List>


        <Typography
          variant="caption"
          color="text.secondary"
        >
          Savora • POS v1.0
        </Typography>

      </Box>

    </Box>
  );
}


/* LOGIN SCREEN */

function LoginScreen({
  cashier,
  restaurantName,
  onLogin
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState('');

  const [loading, setLoading] =
    useState(false);


  const handleLogin = async () => {
    setError('');

    if (!username.trim()) {
      setError('Please enter your username.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    /*
      Small delay gives the login a natural
      application-like experience.
    */
    await new Promise(resolve =>
      setTimeout(resolve, 350)
    );

    const result = onLogin(
      username,
      password
    );

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }
  };


  return (
    <Box className="login-screen">

      <Box className="login-card">

        {/* LOGO */}

        <Box className="login-logo">

          <span className="brand-mark">
            S
          </span>

          <Box>

            <Typography
              className="brand-name"
            >
              SAVORA
            </Typography>

            <Typography
              className="brand-sub"
            >
              KITCHEN POS
            </Typography>

          </Box>

        </Box>


        {/* TITLE */}

        <Typography
          variant="h4"
          className="login-title"
        >
          Welcome back
        </Typography>


        <Typography
          color="text.secondary"
          mb={3}
        >
          Sign in to continue to your
          restaurant dashboard.
        </Typography>


        {/* USERNAME */}

        <TextField
          fullWidth
          label="Username"
          value={username}
          autoComplete="username"
          autoFocus
          onChange={e => {
            setUsername(e.target.value);
            setError('');
          }}
          sx={{ mb: 2 }}
        />


        {/* PASSWORD */}

        <TextField
          fullWidth
          label="Password"
          type={
            showPassword
              ? 'text'
              : 'password'
          }
          value={password}
          autoComplete="current-password"
          onChange={e => {
            setPassword(e.target.value);
            setError('');
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleLogin();
            }
          }}
          InputProps={{
            endAdornment: (
              <Button
                size="small"
                onClick={() =>
                  setShowPassword(
                    current => !current
                  )
                }
                sx={{
                  minWidth: 70
                }}
              >
                {showPassword
                  ? 'Hide'
                  : 'Show'}
              </Button>
            )
          }}
        />


        {/* ERROR */}

        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
          >
            {error}
          </Alert>
        )}


        {/* LOGIN BUTTON */}

        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={loading}
          sx={{
            mt: 3,
            minHeight: 48
          }}
          onClick={handleLogin}
        >
          {loading
            ? 'Signing in...'
            : 'Sign In'}
        </Button>


        {/* ACCOUNT INFORMATION */}

        <Box
          sx={{
            mt: 3,
            p: 1.5,
            borderRadius: 2,
            background:
              'rgba(255,180,84,.06)',
            border:
              '1px solid rgba(255,180,84,.12)'
          }}
        >

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
          >
            SAVORA Cashier Account
          </Typography>

          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            fontWeight={700}
            color="primary.light"
          >
            {cashier}
          </Typography>

        </Box>


        {/* FOOTER */}

        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          display="block"
          mt={3}
        >
          {restaurantName} • POS v1.0
        </Typography>

      </Box>

    </Box>
  );
}