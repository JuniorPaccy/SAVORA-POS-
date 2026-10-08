// import React,{useEffect,useMemo,useState} from 'react';import {Box,Card,TextField,Button,MenuItem,Table,TableBody,TableCell,TableHead,TableRow,Chip,IconButton,Dialog,DialogTitle,DialogContent,DialogActions,Grid,Typography} from '@mui/material';import SearchRoundedIcon from '@mui/icons-material/SearchRounded';import AddRoundedIcon from '@mui/icons-material/AddRounded';import EditRoundedIcon from '@mui/icons-material/EditRounded';import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';import {uid} from '../utils/storage';const blank={name:'',phone:'',email:'',status:'Active'};export default function Customers({customers,persist,notify}){const [q,setQ]=useState(''),[open,setOpen]=useState(false),[form,setForm]=useState(blank),[editing,setEditing]=useState(null),[view,setView]=useState(null),[del,setDel]=useState(null);useEffect(()=>{const f=()=>{setEditing(null);setForm(blank);setOpen(true)};window.addEventListener('open-add-customer',f);return()=>window.removeEventListener('open-add-customer',f)},[]);const list=useMemo(()=>customers.filter(c=>(c.name+c.phone+c.email).toLowerCase().includes(q.toLowerCase())),[customers,q]);const save=()=>{if(!form.name||!form.phone)return notify('Full name and phone are required.','error');const c={...form,id:editing?.id||uid('CUS'),orders:editing?.orders||0,totalSpent:editing?.totalSpent||0,lastOrder:editing?.lastOrder||null};persist('customers',editing?customers.map(x=>x.id===editing.id?c:x):[c,...customers]);setOpen(false);notify(editing?'Customer updated.':'Customer added.');};return <Box className="fade-in"><Box className="filter-bar"><TextField placeholder="Search customers..." value={q} onChange={e=>setQ(e.target.value)} InputProps={{startAdornment:<SearchRoundedIcon sx={{mr:1}}/>}}/><Box flex={1}/><Button variant="contained" startIcon={<AddRoundedIcon/>} onClick={()=>{setEditing(null);setForm(blank);setOpen(true)}}>Add Customer</Button></Box><Card sx={{overflow:'hidden'}}><Box className="table-wrap"><Table className="mui-table"><TableHead><TableRow>{['Customer','Phone','Email','Orders','Total spent','Last order','Status','Actions'].map(x=><TableCell key={x}>{x}</TableCell>)}</TableRow></TableHead><TableBody>{list.map(c=><TableRow key={c.id} hover><TableCell><Box display="flex" alignItems="center" gap={1.2}><Box className="customer-avatar">{c.name[0]}</Box><Box><Typography fontWeight={800}>{c.name}</Typography><Typography variant="caption" color="text.secondary">{c.id}</Typography></Box></Box></TableCell><TableCell>{c.phone}</TableCell><TableCell>{c.email}</TableCell><TableCell>{c.orders||0}</TableCell><TableCell>{Math.round(c.totalSpent||0).toLocaleString()} RWF</TableCell><TableCell>{c.lastOrder?new Date(c.lastOrder).toLocaleDateString():'—'}</TableCell><TableCell><Chip size="small" label={c.status} color={c.status==='Active'?'success':'default'}/></TableCell><TableCell><IconButton onClick={()=>setView(c)}><VisibilityRoundedIcon fontSize="small"/></IconButton><IconButton onClick={()=>{setEditing(c);setForm(c);setOpen(true)}}><EditRoundedIcon fontSize="small"/></IconButton><IconButton color="error" onClick={()=>setDel(c)}><DeleteRoundedIcon fontSize="small"/></IconButton></TableCell></TableRow>)}</TableBody></Table></Box></Card><Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm"><DialogTitle>{editing?'Edit Customer':'Add Customer'}</DialogTitle><DialogContent><Grid container spacing={2} mt={.2}><Grid size={6}><TextField fullWidth label="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></Grid><Grid size={6}><TextField fullWidth label="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></Grid><Grid size={8}><TextField fullWidth label="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></Grid><Grid size={4}><TextField select fullWidth label="Status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><MenuItem value="Active">Active</MenuItem><MenuItem value="Inactive">Inactive</MenuItem></TextField></Grid></Grid></DialogContent><DialogActions><Button onClick={()=>setOpen(false)}>Cancel</Button><Button variant="contained" onClick={save}>Save</Button></DialogActions></Dialog><Dialog open={!!view} onClose={()=>setView(null)}><DialogTitle>{view?.name}</DialogTitle><DialogContent><Typography color="text.secondary">{view?.email}</Typography><Typography>{view?.phone}</Typography><Typography mt={2}>Orders: <b>{view?.orders||0}</b></Typography><Typography>Total spent: <b>{Math.round(view?.totalSpent||0).toLocaleString()} RWF</b></Typography></DialogContent><DialogActions><Button onClick={()=>setView(null)}>Close</Button></DialogActions></Dialog><Dialog open={!!del} onClose={()=>setDel(null)}><DialogTitle>Delete customer?</DialogTitle><DialogContent><Typography>Delete {del?.name} from customer records?</Typography></DialogContent><DialogActions><Button onClick={()=>setDel(null)}>Keep</Button><Button color="error" variant="contained" onClick={()=>{persist('customers',customers.filter(c=>c.id!==del.id));setDel(null);notify('Customer deleted.','info')}}>Delete</Button></DialogActions></Dialog></Box>}

import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { uid } from '../utils/storage';

const blank = {
  name: '',
  phone: '',
  email: '',
  status: 'Active'
};

export default function Customers({
  customers,
  persist,
  notify
}) {
  const [q, setQ] = useState(''),
    [open, setOpen] = useState(false),
    [form, setForm] = useState(blank),
    [editing, setEditing] = useState(null),
    [view, setView] = useState(null),
    [del, setDel] = useState(null);

  useEffect(() => {
    const f = () => {
      setEditing(null);
      setForm(blank);
      setOpen(true);
    };

    window.addEventListener('open-add-customer', f);

    return () =>
      window.removeEventListener('open-add-customer', f);
  }, []);

  const list = useMemo(
    () =>
      customers.filter(c =>
        (c.name + c.phone + c.email)
          .toLowerCase()
          .includes(q.toLowerCase())
      ),
    [customers, q]
  );

  const save = () => {
    if (!form.name || !form.phone)
      return notify(
        'Full name and phone are required.',
        'error'
      );

    const c = {
      ...form,
      id: editing?.id || uid('CUS'),
      orders: editing?.orders || 0,
      totalSpent: editing?.totalSpent || 0,
      lastOrder: editing?.lastOrder || null
    };

    persist(
      'customers',
      editing
        ? customers.map(x =>
            x.id === editing.id ? c : x
          )
        : [c, ...customers]
    );

    setOpen(false);
    notify(
      editing
        ? 'Customer updated.'
        : 'Customer added.'
    );
  };

  return (
    <Box className="fade-in">
      <Box className="filter-bar">
        <TextField
          placeholder="Search customers..."
          value={q}
          onChange={e => setQ(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchRoundedIcon sx={{ mr: 1 }} />
            )
          }}
        />

        <Box flex={1} />

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => {
            setEditing(null);
            setForm(blank);
            setOpen(true);
          }}
        >
          Add Customer
        </Button>
      </Box>

      <Card sx={{ overflow: 'hidden' }}>
        <Box className="table-wrap">
          <Table className="mui-table">
            <TableHead>
              <TableRow>
                {[
                  'Customer',
                  'Phone',
                  'Email',
                  'Orders',
                  'Total spent',
                  'Last order',
                  'Status',
                  'Actions'
                ].map(x => (
                  <TableCell key={x}>
                    {x}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {list.map(c => (
                <TableRow
                  key={c.id}
                  hover
                >
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1.2}
                    >
                      <Box className="customer-avatar">
                        {c.name[0]}
                      </Box>

                      <Box>
                        <Typography fontWeight={800}>
                          {c.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {c.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {c.phone}
                  </TableCell>

                  <TableCell>
                    {c.email}
                  </TableCell>

                  <TableCell>
                    {c.orders || 0}
                  </TableCell>

                  <TableCell>
                    {Math.round(
                      c.totalSpent || 0
                    ).toLocaleString()}{' '}
                    RWF
                  </TableCell>

                  <TableCell>
                    {c.lastOrder
                      ? new Date(
                          c.lastOrder
                        ).toLocaleDateString()
                      : '—'}
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={c.status}
                      color={
                        c.status === 'Active'
                          ? 'success'
                          : 'default'
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => setView(c)}
                    >
                      <VisibilityRoundedIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      onClick={() => {
                        setEditing(c);
                        setForm(c);
                        setOpen(true);
                      }}
                    >
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => setDel(c)}
                    >
                      <DeleteRoundedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editing
            ? 'Edit Customer'
            : 'Add Customer'}
        </DialogTitle>

        <DialogContent>
          <Grid
            container
            spacing={2}
            mt={.2}
          >
            <Grid size={6}>
              <TextField
                fullWidth
                label="Full name"
                value={form.name}
                onChange={e =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
              />
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth
                label="Phone"
                value={form.phone}
                onChange={e =>
                  setForm({
                    ...form,
                    phone: e.target.value
                  })
                }
              />
            </Grid>

            <Grid size={8}>
              <TextField
                fullWidth
                label="Email"
                value={form.email}
                onChange={e =>
                  setForm({
                    ...form,
                    email: e.target.value
                  })
                }
              />
            </Grid>

            <Grid size={4}>
              <TextField
                select
                fullWidth
                label="Status"
                value={form.status}
                onChange={e =>
                  setForm({
                    ...form,
                    status: e.target.value
                  })
                }
              >
                <MenuItem value="Active">
                  Active
                </MenuItem>

                <MenuItem value="Inactive">
                  Inactive
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={save}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!view}
        onClose={() => setView(null)}
      >
        <DialogTitle>
          {view?.name}
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            {view?.email}
          </Typography>

          <Typography>
            {view?.phone}
          </Typography>

          <Typography mt={2}>
            Orders: <b>{view?.orders || 0}</b>
          </Typography>

          <Typography>
            Total spent:{' '}
            <b>
              {Math.round(
                view?.totalSpent || 0
              ).toLocaleString()}{' '}
              RWF
            </b>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setView(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!del}
        onClose={() => setDel(null)}
      >
        <DialogTitle>
          Delete customer?
        </DialogTitle>

        <DialogContent>
          <Typography>
            Delete {del?.name} from customer records?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDel(null)}>
            Keep
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              persist(
                'customers',
                customers.filter(
                  c => c.id !== del.id
                )
              );
              setDel(null);
              notify(
                'Customer deleted.',
                'info'
              );
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}