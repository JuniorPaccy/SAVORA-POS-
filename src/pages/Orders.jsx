// import React,{useMemo,useState} from 'react';import {Box,Card,TextField,MenuItem,Button,Chip,IconButton,Typography,InputAdornment,Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';import SearchRoundedIcon from '@mui/icons-material/SearchRounded';import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';import CancelRoundedIcon from '@mui/icons-material/CancelRounded';import {useNavigate} from 'react-router-dom';const money=n=>`RWF ${Math.round(n).toLocaleString()}`;export default function Orders({orders,persist,notify}){const [q,setQ]=useState(''),[status,setStatus]=useState('All'),[pay,setPay]=useState('All'),[del,setDel]=useState(null);const nav=useNavigate();const list=useMemo(()=>orders.filter(o=>(o.id+o.customerName).toLowerCase().includes(q.toLowerCase())).filter(o=>status==='All'||o.status===status).filter(o=>pay==='All'||o.paymentMethod===pay),[orders,q,status,pay]);return <Box className="fade-in"><Box className="filter-bar"><TextField placeholder="Search order or customer..." value={q} onChange={e=>setQ(e.target.value)} InputProps={{startAdornment:<InputAdornment position="start"><SearchRoundedIcon/></InputAdornment>}}/><TextField select label="Status" value={status} onChange={e=>setStatus(e.target.value)}><MenuItem value="All">All statuses</MenuItem>{['Pending','Preparing','Ready','Completed','Cancelled'].map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField><TextField select label="Payment" value={pay} onChange={e=>setPay(e.target.value)}><MenuItem value="All">All methods</MenuItem>{['Cash','Card','Mobile Money','Bank Transfer'].map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField><Box flex={1}/><Button variant="outlined">Export CSV</Button></Box><Card sx={{overflow:'hidden'}}><Box className="table-wrap"><table className="nice-table wide"><thead><tr><th>Order ID</th><th>Date / time</th><th>Customer</th><th>Items</th><th>Subtotal</th><th>Tax</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead><tbody>{list.map(o=><tr key={o.id}><td><b>{o.id}</b></td><td>{new Date(o.date).toLocaleString()}</td><td>{o.customerName}</td><td>{o.items.reduce((s,x)=>s+x.quantity,0)}</td><td>{money(o.subtotal)}</td><td>{money(o.tax)}</td><td><b>{money(o.total)}</b></td><td>{o.paymentMethod}</td><td><Chip size="small" label={o.status} color={o.status==='Completed'?'success':o.status==='Cancelled'?'error':'warning'}/></td><td><IconButton onClick={()=>nav(`/orders/${o.id}`)}><VisibilityRoundedIcon fontSize="small"/></IconButton>{!['Completed','Cancelled'].includes(o.status)&&<IconButton color="error" onClick={()=>setDel(o)}><CancelRoundedIcon fontSize="small"/></IconButton>}</td></tr>)}</tbody></table></Box>{!list.length&&<Typography p={5} textAlign="center" color="text.secondary">No matching orders.</Typography>}</Card><Dialog open={!!del} onClose={()=>setDel(null)}><DialogTitle>Cancel {del?.id}?</DialogTitle><DialogContent><Typography>This changes the order status to Cancelled.</Typography></DialogContent><DialogActions><Button onClick={()=>setDel(null)}>Keep</Button><Button color="error" variant="contained" onClick={()=>{persist('orders',orders.map(o=>o.id===del.id?{...o,status:'Cancelled'}:o));setDel(null);notify('Order cancelled.','info')}}>Cancel Order</Button></DialogActions></Dialog></Box>}


import React, { useMemo, useState } from 'react';
import {
  Box,
  Card,
  TextField,
  MenuItem,
  Button,
  Chip,
  IconButton,
  Typography,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';

const money = n => `RWF ${Math.round(n).toLocaleString()}`;

export default function Orders({ orders, persist, notify }) {
  const [q, setQ] = useState(''),
    [status, setStatus] = useState('All'),
    [pay, setPay] = useState('All'),
    [del, setDel] = useState(null);

  const nav = useNavigate();

  const list = useMemo(
    () =>
      orders
        .filter(o =>
          (o.id + o.customerName).toLowerCase().includes(q.toLowerCase())
        )
        .filter(o => status === 'All' || o.status === status)
        .filter(o => pay === 'All' || o.paymentMethod === pay),
    [orders, q, status, pay]
  );

  return (
    <Box className="fade-in">
      <Box className="filter-bar">
        <TextField
          placeholder="Search order or customer..."
          value={q}
          onChange={e => setQ(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <MenuItem value="All">All statuses</MenuItem>
          {['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'].map(
            x => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            )
          )}
        </TextField>

        <TextField
          select
          label="Payment"
          value={pay}
          onChange={e => setPay(e.target.value)}
        >
          <MenuItem value="All">All methods</MenuItem>
          {['Cash', 'Card', 'Mobile Money', 'Bank Transfer'].map(x => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
        </TextField>

        <Box flex={1} />

        <Button variant="outlined">Export CSV</Button>
      </Box>

      <Card sx={{ overflow: 'hidden' }}>
        <Box className="table-wrap">
          <table className="nice-table wide">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date / time</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Subtotal</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.map(o => (
                <tr key={o.id}>
                  <td>
                    <b>{o.id}</b>
                  </td>
                  <td>{new Date(o.date).toLocaleString()}</td>
                  <td>{o.customerName}</td>
                  <td>{o.items.reduce((s, x) => s + x.quantity, 0)}</td>
                  <td>{money(o.subtotal)}</td>
                  <td>{money(o.tax)}</td>
                  <td>
                    <b>{money(o.total)}</b>
                  </td>
                  <td>{o.paymentMethod}</td>
                  <td>
                    <Chip
                      size="small"
                      label={o.status}
                      color={
                        o.status === 'Completed'
                          ? 'success'
                          : o.status === 'Cancelled'
                            ? 'error'
                            : 'warning'
                      }
                    />
                  </td>
                  <td>
                    <IconButton onClick={() => nav(`/orders/${o.id}`)}>
                      <VisibilityRoundedIcon fontSize="small" />
                    </IconButton>

                    {!['Completed', 'Cancelled'].includes(o.status) && (
                      <IconButton
                        color="error"
                        onClick={() => setDel(o)}
                      >
                        <CancelRoundedIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {!list.length && (
          <Typography p={5} textAlign="center" color="text.secondary">
            No matching orders.
          </Typography>
        )}
      </Card>

      <Dialog open={!!del} onClose={() => setDel(null)}>
        <DialogTitle>Cancel {del?.id}?</DialogTitle>

        <DialogContent>
          <Typography>
            This changes the order status to Cancelled.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDel(null)}>Keep</Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              persist(
                'orders',
                orders.map(o =>
                  o.id === del.id ? { ...o, status: 'Cancelled' } : o
                )
              );
              setDel(null);
              notify('Order cancelled.', 'info');
            }}
          >
            Cancel Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}