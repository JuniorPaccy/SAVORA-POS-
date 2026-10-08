// import React,{useMemo,useState} from 'react';import {Box,Grid,Card,CardContent,Typography,Button,Chip,TextField,MenuItem,IconButton,Divider,Avatar,Dialog,DialogTitle,DialogContent,DialogActions,RadioGroup,FormControlLabel,Radio,InputAdornment} from '@mui/material';import SearchRoundedIcon from '@mui/icons-material/SearchRounded';import AddRoundedIcon from '@mui/icons-material/AddRounded';import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';import PrintRoundedIcon from '@mui/icons-material/PrintRounded';import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';import {uid} from '../utils/storage';
// const money=n=>`RWF ${Math.round(n).toLocaleString()}`;export default function NewOrder({menu,categories,customers,orders,persist,settings,cart,setCart,notify}){const [q,setQ]=useState(''),[cat,setCat]=useState('All'),[customer,setCustomer]=useState(''),[payment,setPayment]=useState('Cash'),[paid,setPaid]=useState(''),[receipt,setReceipt]=useState(null),[confirm,setConfirm]=useState(false);const items=useMemo(()=>menu.filter(x=>x.available).filter(x=>(x.name+x.category).toLowerCase().includes(q.toLowerCase())).filter(x=>cat==='All'||x.category===cat),[menu,q,cat]);const subtotal=cart.reduce((s,x)=>s+x.price*x.quantity,0),tax=+(subtotal*(settings.taxRate/100)).toFixed(2),total=+(subtotal+tax).toFixed(2),change=Math.max(0,Number(paid||0)-total);const add=item=>setCart(c=>c.some(x=>x.id===item.id)?c.map(x=>x.id===item.id?{...x,quantity:x.quantity+1}:x):[...c,{...item,quantity:1}]);const qty=(id,d)=>setCart(c=>c.map(x=>x.id===id?{...x,quantity:x.quantity+d}:x).filter(x=>x.quantity>0));const complete=()=>{if(!cart.length)return notify('Add at least one item to the order.','error');if(payment==='Cash'&&Number(paid)<total)return notify('Amount paid is insufficient for this order.','error');const c=customers.find(x=>x.id===customer);const order={id:uid('ORD'),date:new Date().toISOString(),customerId:c?.id||null,customerName:c?.name||'Walk-in Customer',items:cart.map(x=>({itemId:x.id,name:x.name,price:x.price,quantity:x.quantity,total:x.price*x.quantity})),subtotal,tax,total,paymentMethod:payment,amountPaid:payment==='Cash'?Number(paid):total,change:payment==='Cash'?change:0,status:'Completed',cashier:settings.cashier};persist('orders',[order,...orders]);if(c)persist('customers',customers.map(x=>x.id===c.id?{...x,orders:(x.orders||0)+1,totalSpent:(x.totalSpent||0)+total,lastOrder:order.date}:x));setReceipt(order);setCart([]);setPaid('');setCustomer('');notify('Order completed successfully. Receipt is ready.');};return <Box className="fade-in"><Grid container spacing={2}><Grid size={{xs:12,lg:7}}><Card sx={{p:2}}><Box className="order-toolbar"><TextField fullWidth placeholder="Search menu..." value={q} onChange={e=>setQ(e.target.value)} InputProps={{startAdornment:<InputAdornment position="start"><SearchRoundedIcon/></InputAdornment>}}/><TextField select value={cat} onChange={e=>setCat(e.target.value)} sx={{minWidth:180}}>{['All',...categories.map(c=>c.name)].map(x=><MenuItem key={x} value={x}>{x==='All'?'All categories':x}</MenuItem>)}</TextField></Box><Grid container spacing={1.5}>{items.map(item=><Grid key={item.id} size={{xs:6,sm:4,md:4}}><Card className="pos-item" onClick={()=>add(item)}><img src={item.image}/><Box className="pos-item-overlay"><Chip label={item.category} size="small"/></Box><CardContent><Typography fontWeight={800} noWrap>{item.name}</Typography><Box display="flex" justifyContent="space-between" alignItems="center"><Typography color="primary" fontWeight={900}>{money(item.price)}</Typography><IconButton size="small" color="primary"><AddRoundedIcon/></IconButton></Box></CardContent></Card></Grid>)}</Grid></Card></Grid><Grid size={{xs:12,lg:5}}><Card className="current-order" sx={{p:2}}><Box display="flex" justifyContent="space-between" alignItems="center"><Box><Typography variant="h6" fontWeight={900}>Current Order</Typography><Typography variant="caption" color="text.secondary">{cart.reduce((s,x)=>s+x.quantity,0)} items</Typography></Box><Button size="small" color="error" disabled={!cart.length} onClick={()=>setConfirm(true)}>Clear</Button></Box><Divider sx={{my:2}}/><Box className="cart-list">{cart.length?cart.map(x=><Box className="cart-row" key={x.id}><Avatar src={x.image} variant="rounded"/><Box flex={1}><Typography fontSize={13} fontWeight={800}>{x.name}</Typography><Typography variant="caption" color="text.secondary">{money(x.price)} each</Typography></Box><Box className="qty"><IconButton size="small" onClick={()=>qty(x.id,-1)}><RemoveRoundedIcon fontSize="small"/></IconButton><b>{x.quantity}</b><IconButton size="small" onClick={()=>qty(x.id,1)}><AddRoundedIcon fontSize="small"/></IconButton></Box><Typography width={82} textAlign="right" fontWeight={800}>{money(x.price*x.quantity)}</Typography><IconButton color="error" size="small" onClick={()=>setCart(c=>c.filter(y=>y.id!==x.id))}><DeleteOutlineRoundedIcon fontSize="small"/></IconButton></Box>):<Box className="cart-empty"><ShoppingBasketRoundedIcon/><Typography fontWeight={800}>Your order is empty</Typography><Typography variant="caption" color="text.secondary">Tap a menu item to add it here.</Typography></Box>}</Box><Divider sx={{my:2}}/><Box className="summary-lines"><p><span>Subtotal</span><b>{money(subtotal)}</b></p><p><span>Tax ({settings.taxRate}%)</span><b>{money(tax)}</b></p><p className="grand"><span>Total</span><b>{money(total)}</b></p></Box><TextField select fullWidth label="Customer" value={customer} onChange={e=>setCustomer(e.target.value)} sx={{mb:1.5}}><MenuItem value="">Walk-in Customer</MenuItem>{customers.filter(c=>c.status==='Active').map(c=><MenuItem key={c.id} value={c.id}>{c.name} • {c.phone}</MenuItem>)}</TextField><TextField select fullWidth label="Payment method" value={payment} onChange={e=>setPayment(e.target.value)} sx={{mb:1.5}}>{['Cash','Card','Mobile Money','Bank Transfer'].map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField>{payment==='Cash'&&<TextField fullWidth type="number" label="Amount paid" value={paid} onChange={e=>setPaid(e.target.value)} error={!!paid&&Number(paid)<total} helperText={paid&&Number(paid)<total?`Need ${money(total-Number(paid))} more`:paid?`Change: ${money(change)}`:''} sx={{mb:1.5}}/>}<Button fullWidth size="large" variant="contained" startIcon={<CheckCircleRoundedIcon/>} disabled={!cart.length} onClick={complete}>Complete Order • {money(total)}</Button></Card></Grid></Grid><Dialog open={!!receipt} onClose={()=>setReceipt(null)} fullWidth maxWidth="sm"><DialogTitle>Payment complete</DialogTitle><DialogContent><Receipt order={receipt} settings={settings}/></DialogContent><DialogActions><Button startIcon={<PrintRoundedIcon/>} onClick={()=>window.print()}>Print Receipt</Button><Button variant="contained" onClick={()=>setReceipt(null)}>Close</Button></DialogActions></Dialog><Dialog open={confirm} onClose={()=>setConfirm(false)}><DialogTitle>Clear current order?</DialogTitle><DialogContent><Typography>All selected items will be removed from the current order.</Typography></DialogContent><DialogActions><Button onClick={()=>setConfirm(false)}>Keep Order</Button><Button color="error" variant="contained" onClick={()=>{setCart([]);setConfirm(false);notify('Current order cleared.','info')}}>Clear Order</Button></DialogActions></Dialog></Box>}
// function Receipt({order,settings}){return <Box className="receipt"><Box textAlign="center"><Typography variant="h5" fontWeight={900}>{settings.restaurantName}</Typography><Typography variant="caption">RESTAURANT • POINT OF SALE</Typography></Box><Divider sx={{my:2}}/><Box className="receipt-meta"><span>Order <b>{order.id}</b></span><span>{new Date(order.date).toLocaleString()}</span><span>Cashier: {order.cashier}</span><span>Customer: {order.customerName}</span></Box>{order.items.map(i=><Box className="receipt-line" key={i.itemId}><span>{i.name} × {i.quantity}</span><b>{Math.round(i.total).toLocaleString()}</b></Box>)}<Divider sx={{my:1}}/><Box className="receipt-line"><span>Subtotal</span><b>{Math.round(order.subtotal).toLocaleString()}</b></Box><Box className="receipt-line"><span>Tax</span><b>{Math.round(order.tax).toLocaleString()}</b></Box><Box className="receipt-line total"><span>Total</span><b>{Math.round(order.total).toLocaleString()} RWF</b></Box><Box className="receipt-line"><span>Payment</span><b>{order.paymentMethod}</b></Box><Box className="receipt-line"><span>Paid</span><b>{Math.round(order.amountPaid).toLocaleString()}</b></Box><Box className="receipt-line"><span>Change</span><b>{Math.round(order.change).toLocaleString()}</b></Box><Typography textAlign="center" variant="caption" display="block" mt={2}>Thank you for dining with us ✦ Come again!</Typography></Box>}


import React, { useMemo, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  MenuItem,
  IconButton,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { uid } from '../utils/storage';

const money = n =>
  `RWF ${Math.round(n).toLocaleString()}`;

export default function NewOrder({
  menu,
  categories,
  customers,
  orders,
  persist,
  settings,
  cart,
  setCart,
  notify
}) {
  const [q, setQ] = useState(''),
    [cat, setCat] = useState('All'),
    [customer, setCustomer] = useState(''),
    [payment, setPayment] = useState('Cash'),
    [paid, setPaid] = useState(''),
    [receipt, setReceipt] = useState(null),
    [confirm, setConfirm] = useState(false);

  const items = useMemo(
    () =>
      menu
        .filter(x => x.available)
        .filter(x =>
          (x.name + x.category)
            .toLowerCase()
            .includes(q.toLowerCase())
        )
        .filter(
          x => cat === 'All' || x.category === cat
        ),
    [menu, q, cat]
  );

  const subtotal = cart.reduce(
    (s, x) => s + x.price * x.quantity,
    0
  );

  const tax = +(
    subtotal *
    (settings.taxRate / 100)
  ).toFixed(2);

  const total = +(subtotal + tax).toFixed(2);

  const change = Math.max(
    0,
    Number(paid || 0) - total
  );

  const add = item =>
    setCart(c =>
      c.some(x => x.id === item.id)
        ? c.map(x =>
            x.id === item.id
              ? {
                  ...x,
                  quantity: x.quantity + 1
                }
              : x
          )
        : [
            ...c,
            {
              ...item,
              quantity: 1
            }
          ]
    );

  const qty = (id, d) =>
    setCart(c =>
      c
        .map(x =>
          x.id === id
            ? {
                ...x,
                quantity: x.quantity + d
              }
            : x
        )
        .filter(x => x.quantity > 0)
    );

  const complete = () => {
    if (!cart.length)
      return notify(
        'Add at least one item to the order.',
        'error'
      );

    if (
      payment === 'Cash' &&
      Number(paid) < total
    )
      return notify(
        'Amount paid is insufficient for this order.',
        'error'
      );

    const c = customers.find(
      x => x.id === customer
    );

    const order = {
      id: uid('ORD'),
      date: new Date().toISOString(),
      customerId: c?.id || null,
      customerName:
        c?.name || 'Walk-in Customer',
      items: cart.map(x => ({
        itemId: x.id,
        name: x.name,
        price: x.price,
        quantity: x.quantity,
        total: x.price * x.quantity
      })),
      subtotal,
      tax,
      total,
      paymentMethod: payment,
      amountPaid:
        payment === 'Cash'
          ? Number(paid)
          : total,
      change:
        payment === 'Cash'
          ? change
          : 0,
      status: 'Completed',
      cashier: settings.cashier
    };

    persist('orders', [order, ...orders]);

    if (c)
      persist(
        'customers',
        customers.map(x =>
          x.id === c.id
            ? {
                ...x,
                orders: (x.orders || 0) + 1,
                totalSpent:
                  (x.totalSpent || 0) + total,
                lastOrder: order.date
              }
            : x
        )
      );

    setReceipt(order);
    setCart([]);
    setPaid('');
    setCustomer('');

    notify(
      'Order completed successfully. Receipt is ready.'
    );
  };

  return (
    <Box className="fade-in">
      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            lg: 7
          }}
        >
          <Card sx={{ p: 2 }}>
            <Box className="order-toolbar">
              <TextField
                fullWidth
                placeholder="Search menu..."
                value={q}
                onChange={e =>
                  setQ(e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                select
                value={cat}
                onChange={e =>
                  setCat(e.target.value)
                }
                sx={{ minWidth: 180 }}
              >
                {[
                  'All',
                  ...categories.map(c => c.name)
                ].map(x => (
                  <MenuItem
                    key={x}
                    value={x}
                  >
                    {x === 'All'
                      ? 'All categories'
                      : x}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Grid container spacing={1.5}>
              {items.map(item => (
                <Grid
                  key={item.id}
                  size={{
                    xs: 6,
                    sm: 4,
                    md: 4
                  }}
                >
                  <Card
                    className="pos-item"
                    onClick={() => add(item)}
                  >
                    <img src={item.image} />

                    <Box className="pos-item-overlay">
                      <Chip
                        label={item.category}
                        size="small"
                      />
                    </Box>

                    <CardContent>
                      <Typography
                        fontWeight={800}
                        noWrap
                      >
                        {item.name}
                      </Typography>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          color="primary"
                          fontWeight={900}
                        >
                          {money(item.price)}
                        </Typography>

                        <IconButton
                          size="small"
                          color="primary"
                        >
                          <AddRoundedIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 5
          }}
        >
          <Card
            className="current-order"
            sx={{ p: 2 }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={900}
                >
                  Current Order
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {cart.reduce(
                    (s, x) => s + x.quantity,
                    0
                  )}{' '}
                  items
                </Typography>
              </Box>

              <Button
                size="small"
                color="error"
                disabled={!cart.length}
                onClick={() => setConfirm(true)}
              >
                Clear
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box className="cart-list">
              {cart.length ? (
                cart.map(x => (
                  <Box
                    className="cart-row"
                    key={x.id}
                  >
                    <Avatar
                      src={x.image}
                      variant="rounded"
                    />

                    <Box flex={1}>
                      <Typography
                        fontSize={13}
                        fontWeight={800}
                      >
                        {x.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {money(x.price)} each
                      </Typography>
                    </Box>

                    <Box className="qty">
                      <IconButton
                        size="small"
                        onClick={() =>
                          qty(x.id, -1)
                        }
                      >
                        <RemoveRoundedIcon fontSize="small" />
                      </IconButton>

                      <b>{x.quantity}</b>

                      <IconButton
                        size="small"
                        onClick={() =>
                          qty(x.id, 1)
                        }
                      >
                        <AddRoundedIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography
                      width={82}
                      textAlign="right"
                      fontWeight={800}
                    >
                      {money(
                        x.price * x.quantity
                      )}
                    </Typography>

                    <IconButton
                      color="error"
                      size="small"
                      onClick={() =>
                        setCart(c =>
                          c.filter(
                            y => y.id !== x.id
                          )
                        )
                      }
                    >
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Box className="cart-empty">
                  <ShoppingBasketRoundedIcon />

                  <Typography fontWeight={800}>
                    Your order is empty
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Tap a menu item to add it here.
                  </Typography>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box className="summary-lines">
              <p>
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </p>

              <p>
                <span>
                  Tax ({settings.taxRate}%)
                </span>
                <b>{money(tax)}</b>
              </p>

              <p className="grand">
                <span>Total</span>
                <b>{money(total)}</b>
              </p>
            </Box>

            <TextField
              select
              fullWidth
              label="Customer"
              value={customer}
              onChange={e =>
                setCustomer(e.target.value)
              }
              sx={{ mb: 1.5 }}
            >
              <MenuItem value="">
                Walk-in Customer
              </MenuItem>

              {customers
                .filter(
                  c => c.status === 'Active'
                )
                .map(c => (
                  <MenuItem
                    key={c.id}
                    value={c.id}
                  >
                    {c.name} • {c.phone}
                  </MenuItem>
                ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Payment method"
              value={payment}
              onChange={e =>
                setPayment(e.target.value)
              }
              sx={{ mb: 1.5 }}
            >
              {[
                'Cash',
                'Card',
                'Mobile Money',
                'Bank Transfer'
              ].map(x => (
                <MenuItem
                  key={x}
                  value={x}
                >
                  {x}
                </MenuItem>
              ))}
            </TextField>

            {payment === 'Cash' && (
              <TextField
                fullWidth
                type="number"
                label="Amount paid"
                value={paid}
                onChange={e =>
                  setPaid(e.target.value)
                }
                error={
                  !!paid &&
                  Number(paid) < total
                }
                helperText={
                  paid &&
                  Number(paid) < total
                    ? `Need ${money(
                        total -
                          Number(paid)
                      )} more`
                    : paid
                    ? `Change: ${money(
                        change
                      )}`
                    : ''
                }
                sx={{ mb: 1.5 }}
              />
            )}

            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={
                <CheckCircleRoundedIcon />
              }
              disabled={!cart.length}
              onClick={complete}
            >
              Complete Order • {money(total)}
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={!!receipt}
        onClose={() => setReceipt(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Payment complete
        </DialogTitle>

        <DialogContent>
          <Receipt
            order={receipt}
            settings={settings}
          />
        </DialogContent>

        <DialogActions>
          <Button
            startIcon={<PrintRoundedIcon />}
            onClick={() => window.print()}
          >
            Print Receipt
          </Button>

          <Button
            variant="contained"
            onClick={() => setReceipt(null)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirm}
        onClose={() => setConfirm(false)}
      >
        <DialogTitle>
          Clear current order?
        </DialogTitle>

        <DialogContent>
          <Typography>
            All selected items will be removed
            from the current order.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setConfirm(false)}
          >
            Keep Order
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setCart([]);
              setConfirm(false);
              notify(
                'Current order cleared.',
                'info'
              );
            }}
          >
            Clear Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Receipt({ order, settings }) {
  return (
    <Box className="receipt">
      <Box textAlign="center">
        <Typography
          variant="h5"
          fontWeight={900}
        >
          {settings.restaurantName}
        </Typography>

        <Typography variant="caption">
          RESTAURANT • POINT OF SALE
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box className="receipt-meta">
        <span>
          Order <b>{order.id}</b>
        </span>

        <span>
          {new Date(
            order.date
          ).toLocaleString()}
        </span>

        <span>
          Cashier: {order.cashier}
        </span>

        <span>
          Customer: {order.customerName}
        </span>
      </Box>

      {order.items.map(i => (
        <Box
          className="receipt-line"
          key={i.itemId}
        >
          <span>
            {i.name} × {i.quantity}
          </span>

          <b>
            {Math.round(
              i.total
            ).toLocaleString()}
          </b>
        </Box>
      ))}

      <Divider sx={{ my: 1 }} />

      <Box className="receipt-line">
        <span>Subtotal</span>
        <b>
          {Math.round(
            order.subtotal
          ).toLocaleString()}
        </b>
      </Box>

      <Box className="receipt-line">
        <span>Tax</span>
        <b>
          {Math.round(
            order.tax
          ).toLocaleString()}
        </b>
      </Box>

      <Box className="receipt-line total">
        <span>Total</span>
        <b>
          {Math.round(
            order.total
          ).toLocaleString()}{' '}
          RWF
        </b>
      </Box>

      <Box className="receipt-line">
        <span>Payment</span>
        <b>{order.paymentMethod}</b>
      </Box>

      <Box className="receipt-line">
        <span>Paid</span>
        <b>
          {Math.round(
            order.amountPaid
          ).toLocaleString()}
        </b>
      </Box>

      <Box className="receipt-line">
        <span>Change</span>
        <b>
          {Math.round(
            order.change
          ).toLocaleString()}
        </b>
      </Box>

      <Typography
        textAlign="center"
        variant="caption"
        display="block"
        mt={2}
      >
        Thank you for dining with us ✦ Come again!
      </Typography>
    </Box>
  );
}