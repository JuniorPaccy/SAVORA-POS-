// import React,{useEffect,useMemo,useState} from 'react';import {Box,Grid,Card,CardMedia,CardContent,Typography,Chip,IconButton,TextField,MenuItem,Button,Dialog,DialogTitle,DialogContent,DialogActions,Switch,FormControlLabel,InputAdornment,Tooltip} from '@mui/material';import SearchRoundedIcon from '@mui/icons-material/SearchRounded';import EditRoundedIcon from '@mui/icons-material/EditRounded';import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';import AddRoundedIcon from '@mui/icons-material/AddRounded';import {uid} from '../utils/storage';
// const blank={name:'',description:'',category:'Breakfast',price:'',available:true,image:''};export default function MenuPage({menu,categories,persist,notify}){const [q,setQ]=useState(''),[cat,setCat]=useState('All'),[avail,setAvail]=useState('All'),[sort,setSort]=useState('name'),[open,setOpen]=useState(false),[view,setView]=useState(null),[editing,setEditing]=useState(null),[form,setForm]=useState(blank),[del,setDel]=useState(null);useEffect(()=>{const f=()=>{setForm(blank);setEditing(null);setOpen(true)};window.addEventListener('open-add-menu',f);return()=>window.removeEventListener('open-add-menu',f)},[]);const filtered=useMemo(()=>menu.filter(x=>(x.name+x.description).toLowerCase().includes(q.toLowerCase())).filter(x=>cat==='All'||x.category===cat).filter(x=>avail==='All'||(avail==='Available'?x.available:!x.available)).sort((a,b)=>sort==='name'?a.name.localeCompare(b.name):a.price-b.price),[menu,q,cat,avail,sort]);const saveItem=()=>{if(!form.name||!form.category||Number(form.price)<=0)return notify('Please complete the item name, category and a valid price.','error');const item={...form,id:editing?.id||uid('ITEM'),price:Number(form.price)};persist('menu',editing?menu.map(x=>x.id===editing.id?item:x):[item,...menu]);setOpen(false);notify(editing?'Menu item updated.':'Menu item added.');};const remove=()=>{persist('menu',menu.filter(x=>x.id!==del.id));setDel(null);notify('Menu item deleted.','info')};return <Box className="fade-in"><Box className="filter-bar"><TextField placeholder="Search food..." value={q} onChange={e=>setQ(e.target.value)} InputProps={{startAdornment:<InputAdornment position="start"><SearchRoundedIcon/></InputAdornment>}}/><TextField select label="Category" value={cat} onChange={e=>setCat(e.target.value)}><MenuItem value="All">All categories</MenuItem>{categories.map(c=><MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)}</TextField><TextField select label="Availability" value={avail} onChange={e=>setAvail(e.target.value)}><MenuItem value="All">All</MenuItem><MenuItem value="Available">Available</MenuItem><MenuItem value="Unavailable">Unavailable</MenuItem></TextField><TextField select label="Sort" value={sort} onChange={e=>setSort(e.target.value)}><MenuItem value="name">Name</MenuItem><MenuItem value="price">Price</MenuItem></TextField><Box sx={{flex:1}}/><Button startIcon={<AddRoundedIcon/>} variant="outlined" onClick={()=>{setEditing(null);setForm(blank);setOpen(true)}}>Add Item</Button></Box><Typography variant="body2" color="text.secondary" mb={2}>Showing {filtered.length} of {menu.length} menu items</Typography><Grid container spacing={2}>{filtered.map(item=><Grid key={item.id} size={{xs:12,sm:6,md:4,lg:3}}><Card className="menu-card"><Box className="menu-image-wrap"><CardMedia component="img" image={item.image} className="menu-image"/><Chip size="small" label={item.available?'Available':'Unavailable'} color={item.available?'success':'default'} className="availability-chip"/></Box><CardContent><Typography fontWeight={800}>{item.name}</Typography><Typography variant="caption" color="text.secondary" display="block" mb={1}>{item.category}</Typography><Typography variant="body2" color="text.secondary" className="clamp">{item.description}</Typography><Box display="flex" alignItems="center" justifyContent="space-between" mt={2}><Typography fontWeight={900} color="primary">RWF {Math.round(item.price).toLocaleString()}</Typography><Box><Tooltip title="View"><IconButton size="small" onClick={()=>setView(item)}><VisibilityRoundedIcon fontSize="small"/></IconButton></Tooltip><Tooltip title="Edit"><IconButton size="small" onClick={()=>{setEditing(item);setForm(item);setOpen(true)}}><EditRoundedIcon fontSize="small"/></IconButton></Tooltip><Tooltip title="Delete"><IconButton size="small" color="error" onClick={()=>setDel(item)}><DeleteRoundedIcon fontSize="small"/></IconButton></Tooltip></Box></Box></CardContent></Card></Grid>)}</Grid><Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm"><DialogTitle>{editing?'Edit Menu Item':'Add Menu Item'}</DialogTitle><DialogContent><Grid container spacing={2} mt={.2}><Grid size={6}><TextField fullWidth label="Item name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></Grid><Grid size={6}><TextField fullWidth label="Price (RWF)" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/></Grid><Grid size={6}><TextField select fullWidth label="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.map(c=><MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)}</TextField></Grid><Grid size={6}><FormControlLabel control={<Switch checked={!!form.available} onChange={e=>setForm({...form,available:e.target.checked})}/>} label="Available"/></Grid><Grid size={12}><TextField fullWidth multiline rows={2} label="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></Grid><Grid size={12}><TextField fullWidth label="Image URL (optional)" value={form.image||''} onChange={e=>setForm({...form,image:e.target.value})}/></Grid></Grid></DialogContent><DialogActions><Button onClick={()=>setOpen(false)}>Cancel</Button><Button variant="contained" onClick={saveItem}>Save Item</Button></DialogActions></Dialog><Dialog open={!!view} onClose={()=>setView(null)} fullWidth maxWidth="xs"><DialogTitle>{view?.name}</DialogTitle><DialogContent>{view&&<><img src={view.image} className="dialog-image"/><Typography mt={2}>{view.description}</Typography><Typography color="primary" fontWeight={900} mt={1}>RWF {Math.round(view.price).toLocaleString()}</Typography></>}</DialogContent><DialogActions><Button onClick={()=>setView(null)}>Close</Button></DialogActions></Dialog><Dialog open={!!del} onClose={()=>setDel(null)}><DialogTitle>Delete menu item?</DialogTitle><DialogContent><Typography>This will remove <b>{del?.name}</b> from the catalogue.</Typography></DialogContent><DialogActions><Button onClick={()=>setDel(null)}>Keep</Button><Button color="error" variant="contained" onClick={remove}>Delete</Button></DialogActions></Dialog></Box>}


import React, {
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  InputAdornment,
  Tooltip
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { uid } from '../utils/storage';

const blank = {
  name: '',
  description: '',
  category: 'Breakfast',
  price: '',
  available: true,
  image: ''
};

export default function MenuPage({
  menu,
  categories,
  persist,
  notify
}) {
  const [q, setQ] = useState(''),
    [cat, setCat] = useState('All'),
    [avail, setAvail] = useState('All'),
    [sort, setSort] = useState('name'),
    [open, setOpen] = useState(false),
    [view, setView] = useState(null),
    [editing, setEditing] = useState(null),
    [form, setForm] = useState(blank),
    [del, setDel] = useState(null);

  useEffect(() => {
    const f = () => {
      setForm(blank);
      setEditing(null);
      setOpen(true);
    };

    window.addEventListener('open-add-menu', f);

    return () =>
      window.removeEventListener(
        'open-add-menu',
        f
      );
  }, []);

  const filtered = useMemo(
    () =>
      menu
        .filter(x =>
          (x.name + x.description)
            .toLowerCase()
            .includes(q.toLowerCase())
        )
        .filter(
          x => cat === 'All' || x.category === cat
        )
        .filter(
          x =>
            avail === 'All' ||
            (avail === 'Available'
              ? x.available
              : !x.available)
        )
        .sort((a, b) =>
          sort === 'name'
            ? a.name.localeCompare(b.name)
            : a.price - b.price
        ),
    [menu, q, cat, avail, sort]
  );

  const saveItem = () => {
    if (
      !form.name ||
      !form.category ||
      Number(form.price) <= 0
    )
      return notify(
        'Please complete the item name, category and a valid price.',
        'error'
      );

    const item = {
      ...form,
      id: editing?.id || uid('ITEM'),
      price: Number(form.price)
    };

    persist(
      'menu',
      editing
        ? menu.map(x =>
            x.id === editing.id ? item : x
          )
        : [item, ...menu]
    );

    setOpen(false);

    notify(
      editing
        ? 'Menu item updated.'
        : 'Menu item added.'
    );
  };

  const remove = () => {
    persist(
      'menu',
      menu.filter(x => x.id !== del.id)
    );

    setDel(null);
    notify('Menu item deleted.', 'info');
  };

  return (
    <Box className="fade-in">
      <Box className="filter-bar">
        <TextField
          placeholder="Search food..."
          value={q}
          onChange={e => setQ(e.target.value)}
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
          label="Category"
          value={cat}
          onChange={e => setCat(e.target.value)}
        >
          <MenuItem value="All">
            All categories
          </MenuItem>

          {categories.map(c => (
            <MenuItem
              key={c.id}
              value={c.name}
            >
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Availability"
          value={avail}
          onChange={e => setAvail(e.target.value)}
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Available">
            Available
          </MenuItem>

          <MenuItem value="Unavailable">
            Unavailable
          </MenuItem>
        </TextField>

        <TextField
          select
          label="Sort"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <MenuItem value="name">
            Name
          </MenuItem>

          <MenuItem value="price">
            Price
          </MenuItem>
        </TextField>

        <Box sx={{ flex: 1 }} />

        <Button
          startIcon={<AddRoundedIcon />}
          variant="outlined"
          onClick={() => {
            setEditing(null);
            setForm(blank);
            setOpen(true);
          }}
        >
          Add Item
        </Button>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={2}
      >
        Showing {filtered.length} of {menu.length} menu
        items
      </Typography>

      <Grid container spacing={2}>
        {filtered.map(item => (
          <Grid
            key={item.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3
            }}
          >
            <Card className="menu-card">
              <Box className="menu-image-wrap">
                <CardMedia
                  component="img"
                  image={item.image}
                  className="menu-image"
                />

                <Chip
                  size="small"
                  label={
                    item.available
                      ? 'Available'
                      : 'Unavailable'
                  }
                  color={
                    item.available
                      ? 'success'
                      : 'default'
                  }
                  className="availability-chip"
                />
              </Box>

              <CardContent>
                <Typography fontWeight={800}>
                  {item.name}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mb={1}
                >
                  {item.category}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="clamp"
                >
                  {item.description}
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={2}
                >
                  <Typography
                    fontWeight={900}
                    color="primary"
                  >
                    RWF{' '}
                    {Math.round(
                      item.price
                    ).toLocaleString()}
                  </Typography>

                  <Box>
                    <Tooltip title="View">
                      <IconButton
                        size="small"
                        onClick={() =>
                          setView(item)
                        }
                      >
                        <VisibilityRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditing(item);
                          setForm(item);
                          setOpen(true);
                        }}
                      >
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          setDel(item)
                        }
                      >
                        <DeleteRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editing
            ? 'Edit Menu Item'
            : 'Add Menu Item'}
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
                label="Item name"
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
                label="Price (RWF)"
                type="number"
                value={form.price}
                onChange={e =>
                  setForm({
                    ...form,
                    price: e.target.value
                  })
                }
              />
            </Grid>

            <Grid size={6}>
              <TextField
                select
                fullWidth
                label="Category"
                value={form.category}
                onChange={e =>
                  setForm({
                    ...form,
                    category: e.target.value
                  })
                }
              >
                {categories.map(c => (
                  <MenuItem
                    key={c.id}
                    value={c.name}
                  >
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!form.available}
                    onChange={e =>
                      setForm({
                        ...form,
                        available:
                          e.target.checked
                      })
                    }
                  />
                }
                label="Available"
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={form.description}
                onChange={e =>
                  setForm({
                    ...form,
                    description:
                      e.target.value
                  })
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Image URL (optional)"
                value={form.image || ''}
                onChange={e =>
                  setForm({
                    ...form,
                    image: e.target.value
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={saveItem}
          >
            Save Item
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!view}
        onClose={() => setView(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {view?.name}
        </DialogTitle>

        <DialogContent>
          {view && (
            <>
              <img
                src={view.image}
                className="dialog-image"
              />

              <Typography mt={2}>
                {view.description}
              </Typography>

              <Typography
                color="primary"
                fontWeight={900}
                mt={1}
              >
                RWF{' '}
                {Math.round(
                  view.price
                ).toLocaleString()}
              </Typography>
            </>
          )}
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
          Delete menu item?
        </DialogTitle>

        <DialogContent>
          <Typography>
            This will remove{' '}
            <b>{del?.name}</b> from the
            catalogue.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDel(null)}>
            Keep
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={remove}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}