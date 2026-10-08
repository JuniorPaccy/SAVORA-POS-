// import React,{useEffect,useMemo,useState} from 'react';import {Box,Grid,Card,Typography,Button,IconButton,TextField,Dialog,DialogTitle,DialogContent,DialogActions,Chip} from '@mui/material';import AddRoundedIcon from '@mui/icons-material/AddRounded';import EditRoundedIcon from '@mui/icons-material/EditRounded';import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';import SearchRoundedIcon from '@mui/icons-material/SearchRounded';import {uid} from '../utils/storage';export default function Categories({categories,menu,persist,notify}){const [q,setQ]=useState(''),[open,setOpen]=useState(false),[editing,setEditing]=useState(null),[form,setForm]=useState({name:'',description:'',status:'Active'}),[del,setDel]=useState(null);useEffect(()=>{const f=()=>{setEditing(null);setForm({name:'',description:'',status:'Active'});setOpen(true)};window.addEventListener('open-add-category',f);return()=>window.removeEventListener('open-add-category',f)},[]);const list=useMemo(()=>categories.filter(c=>(c.name+c.description).toLowerCase().includes(q.toLowerCase())),[categories,q]);const saveCat=()=>{if(!form.name)return notify('Category name is required.','error');const x={...form,id:editing?.id||uid('CAT')};persist('categories',editing?categories.map(c=>c.id===editing.id?x:c):[...categories,x]);setOpen(false);notify(editing?'Category updated.':'Category added.');};return <Box className="fade-in"><Box className="filter-bar"><TextField placeholder="Search category..." value={q} onChange={e=>setQ(e.target.value)} InputProps={{startAdornment:<SearchRoundedIcon sx={{mr:1}}/>}}/><Box flex={1}/><Button variant="contained" startIcon={<AddRoundedIcon/>} onClick={()=>{setEditing(null);setForm({name:'',description:'',status:'Active'});setOpen(true)}}>Add Category</Button></Box><Grid container spacing={2}>{list.map(c=>{const count=menu.filter(m=>m.category===c.name).length;return <Grid key={c.id} size={{xs:12,sm:6,md:4,lg:3}}><Card className="category-card"><Box className="category-number">{String(count).padStart(2,'0')}</Box><Typography variant="h6" fontWeight={900}>{c.name}</Typography><Typography variant="body2" color="text.secondary" minHeight={45}>{c.description}</Typography><Box display="flex" alignItems="center" justifyContent="space-between" mt={2}><Chip size="small" label={c.status} color="success"/><Box><IconButton onClick={()=>{setEditing(c);setForm(c);setOpen(true)}}><EditRoundedIcon fontSize="small"/></IconButton><IconButton color="error" onClick={()=>setDel(c)}><DeleteRoundedIcon fontSize="small"/></IconButton></Box></Box><Typography variant="caption" color="text.secondary">{count} menu items</Typography></Card></Grid>})}</Grid><Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="xs"><DialogTitle>{editing?'Edit Category':'Add Category'}</DialogTitle><DialogContent><TextField fullWidth label="Category name" margin="dense" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><TextField fullWidth multiline rows={3} label="Description" margin="dense" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></DialogContent><DialogActions><Button onClick={()=>setOpen(false)}>Cancel</Button><Button variant="contained" onClick={saveCat}>Save</Button></DialogActions></Dialog><Dialog open={!!del} onClose={()=>setDel(null)}><DialogTitle>Delete category?</DialogTitle><DialogContent><Typography>{menu.some(m=>m.category===del?.name)?'This category is currently used by menu items. Reassign those items before deleting.':'Delete this category permanently?'}</Typography></DialogContent><DialogActions><Button onClick={()=>setDel(null)}>Close</Button><Button color="error" variant="contained" disabled={menu.some(m=>m.category===del?.name)} onClick={()=>{persist('categories',categories.filter(c=>c.id!==del.id));setDel(null);notify('Category deleted.')}}>Delete</Button></DialogActions></Dialog></Box>}


import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { uid } from '../utils/storage';

export default function Categories({
  categories,
  menu,
  persist,
  notify
}) {
  const [q, setQ] = useState(''),
    [open, setOpen] = useState(false),
    [editing, setEditing] = useState(null),
    [form, setForm] = useState({
      name: '',
      description: '',
      status: 'Active'
    }),
    [del, setDel] = useState(null);

  useEffect(() => {
    const f = () => {
      setEditing(null);
      setForm({
        name: '',
        description: '',
        status: 'Active'
      });
      setOpen(true);
    };

    window.addEventListener('open-add-category', f);

    return () =>
      window.removeEventListener('open-add-category', f);
  }, []);

  const list = useMemo(
    () =>
      categories.filter(c =>
        (c.name + c.description)
          .toLowerCase()
          .includes(q.toLowerCase())
      ),
    [categories, q]
  );

  const saveCat = () => {
    if (!form.name)
      return notify('Category name is required.', 'error');

    const x = {
      ...form,
      id: editing?.id || uid('CAT')
    };

    persist(
      'categories',
      editing
        ? categories.map(c =>
            c.id === editing.id ? x : c
          )
        : [...categories, x]
    );

    setOpen(false);
    notify(
      editing
        ? 'Category updated.'
        : 'Category added.'
    );
  };

  return (
    <Box className="fade-in">
      <Box className="filter-bar">
        <TextField
          placeholder="Search category..."
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
            setForm({
              name: '',
              description: '',
              status: 'Active'
            });
            setOpen(true);
          }}
        >
          Add Category
        </Button>
      </Box>

      <Grid container spacing={2}>
        {list.map(c => {
          const count = menu.filter(
            m => m.category === c.name
          ).length;

          return (
            <Grid
              key={c.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3
              }}
            >
              <Card className="category-card">
                <Box className="category-number">
                  {String(count).padStart(2, '0')}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={900}
                >
                  {c.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  minHeight={45}
                >
                  {c.description}
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Chip
                    size="small"
                    label={c.status}
                    color="success"
                  />

                  <Box>
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
                  </Box>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {count} menu items
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {editing ? 'Edit Category' : 'Add Category'}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Category name"
            margin="dense"
            value={form.name}
            onChange={e =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            margin="dense"
            value={form.description}
            onChange={e =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={saveCat}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!del}
        onClose={() => setDel(null)}
      >
        <DialogTitle>
          Delete category?
        </DialogTitle>

        <DialogContent>
          <Typography>
            {menu.some(
              m => m.category === del?.name
            )
              ? 'This category is currently used by menu items. Reassign those items before deleting.'
              : 'Delete this category permanently?'}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDel(null)}>
            Close
          </Button>

          <Button
            color="error"
            variant="contained"
            disabled={menu.some(
              m => m.category === del?.name
            )}
            onClick={() => {
              persist(
                'categories',
                categories.filter(
                  c => c.id !== del.id
                )
              );
              setDel(null);
              notify('Category deleted.');
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}