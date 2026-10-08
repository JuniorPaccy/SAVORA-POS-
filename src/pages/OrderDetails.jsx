// import React from 'react';import {Box,Card,Grid,Typography,Chip,Button,Divider} from '@mui/material';import PrintRoundedIcon from '@mui/icons-material/PrintRounded';import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';import {useNavigate,useParams} from 'react-router-dom';const money=n=>`RWF ${Math.round(n).toLocaleString()}`;export default function OrderDetails({orders,settings}){const {orderId}=useParams(),nav=useNavigate(),o=orders.find(x=>x.id===orderId);if(!o)return <Card sx={{p:5,textAlign:'center'}}><Typography variant="h5">Order not found</Typography><Button onClick={()=>nav('/orders')}>Back to Orders</Button></Card>;return <Box className="fade-in"><Box display="flex" gap={1} mb={2}><Button startIcon={<ArrowBackRoundedIcon/>} onClick={()=>nav('/orders')}>Orders</Button><Box flex={1}/><Button variant="contained" startIcon={<PrintRoundedIcon/>} onClick={()=>window.print()}>Print Receipt</Button></Box><Grid container spacing={2}><Grid size={{xs:12,lg:8}}><Card sx={{p:3}}><Box display="flex" justifyContent="space-between"><Box><Typography variant="h5" fontWeight={900}>{o.id}</Typography><Typography color="text.secondary">{new Date(o.date).toLocaleString()}</Typography></Box><Chip label={o.status} color={o.status==='Completed'?'success':o.status==='Cancelled'?'error':'warning'}/></Box><Divider sx={{my:2}}/>{o.items.map(i=><Box className="detail-line" key={i.itemId}><Box><Typography fontWeight={700}>{i.name}</Typography><Typography variant="caption" color="text.secondary">{i.quantity} × {money(i.price)}</Typography></Box><Typography fontWeight={800}>{money(i.total)}</Typography></Box>)}<Divider sx={{my:2}}/><Box className="summary-lines"><p><span>Subtotal</span><b>{money(o.subtotal)}</b></p><p><span>Tax</span><b>{money(o.tax)}</b></p><p className="grand"><span>Total</span><b>{money(o.total)}</b></p></Box></Card></Grid><Grid size={{xs:12,lg:4}}><Card sx={{p:3}}><Typography fontWeight={900} mb={2}>Order information</Typography><Info label="Customer" value={o.customerName}/><Info label="Cashier" value={o.cashier}/><Info label="Payment" value={o.paymentMethod}/><Info label="Amount paid" value={money(o.amountPaid)}/><Info label="Change" value={money(o.change)}/><Typography fontWeight={900} mt={3} mb={1}>Receipt preview</Typography><Box className="mini-receipt"><Typography fontWeight={900}>{settings.restaurantName}</Typography><Typography variant="caption">{o.id} • {o.customerName}</Typography><Divider sx={{my:1}}/>{o.items.slice(0,3).map(i=><Box display="flex" justifyContent="space-between" key={i.itemId}><Typography variant="caption">{i.name} × {i.quantity}</Typography><Typography variant="caption">{Math.round(i.total)}</Typography></Box>)}<Divider sx={{my:1}}/><Typography fontWeight={900}>TOTAL {money(o.total)}</Typography></Box></Card></Grid></Grid></Box>};function Info({label,value}){return <Box display="flex" justifyContent="space-between" py={1}><Typography variant="body2" color="text.secondary">{label}</Typography><Typography fontWeight={700} textAlign="right">{value}</Typography></Box>}


import React from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate, useParams } from 'react-router-dom';

const money = n => `RWF ${Math.round(n).toLocaleString()}`;

export default function OrderDetails({ orders, settings }) {
  const { orderId } = useParams(),
    nav = useNavigate(),
    o = orders.find(x => x.id === orderId);

  if (!o)
    return (
      <Card sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h5">Order not found</Typography>
        <Button onClick={() => nav('/orders')}>Back to Orders</Button>
      </Card>
    );

  return (
    <Box className="fade-in">
      <Box display="flex" gap={1} mb={2}>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => nav('/orders')}
        >
          Orders
        </Button>
        <Box flex={1} />
        <Button
          variant="contained"
          startIcon={<PrintRoundedIcon />}
          onClick={() => window.print()}
        >
          Print Receipt
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h5" fontWeight={900}>
                  {o.id}
                </Typography>
                <Typography color="text.secondary">
                  {new Date(o.date).toLocaleString()}
                </Typography>
              </Box>

              <Chip
                label={o.status}
                color={
                  o.status === 'Completed'
                    ? 'success'
                    : o.status === 'Cancelled'
                      ? 'error'
                      : 'warning'
                }
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            {o.items.map(i => (
              <Box className="detail-line" key={i.itemId}>
                <Box>
                  <Typography fontWeight={700}>{i.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {i.quantity} × {money(i.price)}
                  </Typography>
                </Box>

                <Typography fontWeight={800}>
                  {money(i.total)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box className="summary-lines">
              <p>
                <span>Subtotal</span>
                <b>{money(o.subtotal)}</b>
              </p>
              <p>
                <span>Tax</span>
                <b>{money(o.tax)}</b>
              </p>
              <p className="grand">
                <span>Total</span>
                <b>{money(o.total)}</b>
              </p>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3 }}>
            <Typography fontWeight={900} mb={2}>
              Order information
            </Typography>

            <Info label="Customer" value={o.customerName} />
            <Info label="Cashier" value={o.cashier} />
            <Info label="Payment" value={o.paymentMethod} />
            <Info label="Amount paid" value={money(o.amountPaid)} />
            <Info label="Change" value={money(o.change)} />

            <Typography fontWeight={900} mt={3} mb={1}>
              Receipt preview
            </Typography>

            <Box className="mini-receipt">
              <Typography fontWeight={900}>
                {settings.restaurantName}
              </Typography>

              <Typography variant="caption">
                {o.id} • {o.customerName}
              </Typography>

              <Divider sx={{ my: 1 }} />

              {o.items.slice(0, 3).map(i => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  key={i.itemId}
                >
                  <Typography variant="caption">
                    {i.name} × {i.quantity}
                  </Typography>
                  <Typography variant="caption">
                    {Math.round(i.total)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 1 }} />

              <Typography fontWeight={900}>
                TOTAL {money(o.total)}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function Info({ label, value }) {
  return (
    <Box display="flex" justifyContent="space-between" py={1}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={700} textAlign="right">
        {value}
      </Typography>
    </Box>
  );
}