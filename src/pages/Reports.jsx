// import React,{useMemo,useState} from 'react';import {Box,Grid,Card,Typography,TextField,MenuItem,Button,Chip} from '@mui/material';import {ResponsiveContainer,LineChart,Line,CartesianGrid,XAxis,YAxis,Tooltip,BarChart,Bar,PieChart,Pie,Cell,Legend} from 'recharts';import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';import PrintRoundedIcon from '@mui/icons-material/PrintRounded';const money=n=>Math.round(n).toLocaleString();export default function Reports({orders}){const [pay,setPay]=useState('All'),[status,setStatus]=useState('All');const data=useMemo(()=>orders.filter(o=>pay==='All'||o.paymentMethod===pay).filter(o=>status==='All'||o.status===status),[orders,pay,status]);const daily=useMemo(()=>{const m={};data.filter(o=>o.status!=='Cancelled').forEach(o=>{const d=new Date(o.date).toLocaleDateString(undefined,{month:'short',day:'numeric'});m[d]=(m[d]||0)+o.total});return Object.entries(m).slice(-10).map(([date,sales])=>({date,sales:Math.round(sales)}))},[data]);const category=useMemo(()=>{const m={};data.forEach(o=>o.items.forEach(i=>{m[i.name]=(m[i.name]||0)+i.total}));return Object.entries(m).slice(0,8).map(([name,sales])=>({name:name.split(' ')[0],sales:Math.round(sales)}))},[data]);const payments=useMemo(()=>{const m={};data.forEach(o=>m[o.paymentMethod]=(m[o.paymentMethod]||0)+o.total);return Object.entries(m).map(([name,value])=>({name,value:Math.round(value)}))},[data]);const top=useMemo(()=>{const m={};data.forEach(o=>o.items.forEach(i=>m[i.name]=(m[i.name]||0)+i.quantity));return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,7).map(([name,qty])=>({name:name.split(' ').slice(0,2).join(' '),qty}))},[data]);const total=data.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+o.total,0),avg=data.length?total/data.length:0;const exportCsv=()=>{const rows=[['Order ID','Date','Customer','Total','Payment','Status'],...data.map(o=>[o.id,new Date(o.date).toISOString(),o.customerName,o.total,o.paymentMethod,o.status])];const blob=new Blob([rows.map(r=>r.join(',')).join('\n')],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='savora-sales-report.csv';a.click();URL.revokeObjectURL(a.href)};return <Box className="fade-in"><Box className="filter-bar"><TextField select label="Payment" value={pay} onChange={e=>setPay(e.target.value)}><MenuItem value="All">All methods</MenuItem>{['Cash','Card','Mobile Money','Bank Transfer'].map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField><TextField select label="Order status" value={status} onChange={e=>setStatus(e.target.value)}><MenuItem value="All">All statuses</MenuItem>{['Pending','Preparing','Ready','Completed','Cancelled'].map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</TextField><Box flex={1}/><Button startIcon={<DownloadRoundedIcon/>} variant="outlined" onClick={exportCsv}>Export CSV</Button><Button startIcon={<PrintRoundedIcon/>} variant="outlined" onClick={()=>window.print()}>Print</Button></Box><Grid container spacing={2}><Grid size={{xs:12,sm:4}}><Card className="report-kpi"><Typography color="text.secondary">Filtered sales</Typography><Typography variant="h4" fontWeight={900} color="primary">RWF {money(total)}</Typography><Chip label={`${data.length} orders`} size="small"/></Card></Grid><Grid size={{xs:12,sm:4}}><Card className="report-kpi"><Typography color="text.secondary">Average order value</Typography><Typography variant="h4" fontWeight={900}>RWF {money(avg)}</Typography><Typography variant="caption">Based on current filters</Typography></Card></Grid><Grid size={{xs:12,sm:4}}><Card className="report-kpi"><Typography color="text.secondary">Completed revenue</Typography><Typography variant="h4" fontWeight={900} color="success.main">RWF {money(orders.filter(o=>o.status==='Completed').reduce((s,o)=>s+o.total,0))}</Typography><Typography variant="caption">Across completed orders</Typography></Card></Grid><Grid size={{xs:12,lg:8}}><ChartCard title="Sales by Day / Month"><ResponsiveContainer width="100%" height={300}><LineChart data={daily}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)"/><XAxis dataKey="date"/><YAxis/><Tooltip formatter={v=>`RWF ${money(v)}`}/><Line type="monotone" dataKey="sales" stroke="#ffb454" strokeWidth={3} dot={false}/></LineChart></ResponsiveContainer></ChartCard></Grid><Grid size={{xs:12,lg:4}}><ChartCard title="Payment Method Distribution"><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={payments} dataKey="value" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={4}>{payments.map((_,i)=><Cell key={i} fill={['#ffb454','#35d0ba','#61a8ff','#ff6b6b'][i%4]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer></ChartCard></Grid><Grid size={{xs:12,md:6}}><ChartCard title="Sales by Category"><ResponsiveContainer width="100%" height={300}><BarChart data={category}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="sales" fill="#35d0ba" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></ChartCard></Grid><Grid size={{xs:12,md:6}}><ChartCard title="Top-Selling Items"><ResponsiveContainer width="100%" height={300}><BarChart data={top} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)"/><XAxis type="number"/><YAxis type="category" dataKey="name" width={90}/><Tooltip/><Bar dataKey="qty" fill="#ffb454" radius={[0,8,8,0]}/></BarChart></ResponsiveContainer></ChartCard></Grid></Grid></Box>};function ChartCard({title,children}){return <Card sx={{p:2.2}}><Typography fontWeight={900} mb={2}>{title}</Typography>{children}</Card>}


import React, { useMemo, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  MenuItem,
  Button,
  Chip,
} from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';

const money = n => Math.round(n).toLocaleString();

export default function Reports({ orders }) {
  const [pay, setPay] = useState('All'),
    [status, setStatus] = useState('All');

  const data = useMemo(
    () =>
      orders
        .filter(o => pay === 'All' || o.paymentMethod === pay)
        .filter(o => status === 'All' || o.status === status),
    [orders, pay, status]
  );

  const daily = useMemo(() => {
    const m = {};

    data
      .filter(o => o.status !== 'Cancelled')
      .forEach(o => {
        const d = new Date(o.date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        });

        m[d] = (m[d] || 0) + o.total;
      });

    return Object.entries(m)
      .slice(-10)
      .map(([date, sales]) => ({
        date,
        sales: Math.round(sales),
      }));
  }, [data]);

  const category = useMemo(() => {
    const m = {};

    data.forEach(o =>
      o.items.forEach(i => {
        m[i.name] = (m[i.name] || 0) + i.total;
      })
    );

    return Object.entries(m)
      .slice(0, 8)
      .map(([name, sales]) => ({
        name: name.split(' ')[0],
        sales: Math.round(sales),
      }));
  }, [data]);

  const payments = useMemo(() => {
    const m = {};

    data.forEach(
      o => (m[o.paymentMethod] = (m[o.paymentMethod] || 0) + o.total)
    );

    return Object.entries(m).map(([name, value]) => ({
      name,
      value: Math.round(value),
    }));
  }, [data]);

  const top = useMemo(() => {
    const m = {};

    data.forEach(o =>
      o.items.forEach(
        i => (m[i.name] = (m[i.name] || 0) + i.quantity)
      )
    );

    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([name, qty]) => ({
        name: name.split(' ').slice(0, 2).join(' '),
        qty,
      }));
  }, [data]);

  const total = data
    .filter(o => o.status !== 'Cancelled')
    .reduce((s, o) => s + o.total, 0);

  const avg = data.length ? total / data.length : 0;

  const exportCsv = () => {
    const rows = [
      ['Order ID', 'Date', 'Customer', 'Total', 'Payment', 'Status'],
      ...data.map(o => [
        o.id,
        new Date(o.date).toISOString(),
        o.customerName,
        o.total,
        o.paymentMethod,
        o.status,
      ]),
    ];

    const blob = new Blob(
      [rows.map(r => r.join(',')).join('\n')],
      { type: 'text/csv' }
    );

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'savora-sales-report.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <Box className="fade-in">
      <Box className="filter-bar">
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

        <TextField
          select
          label="Order status"
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

        <Box flex={1} />

        <Button
          startIcon={<DownloadRoundedIcon />}
          variant="outlined"
          onClick={exportCsv}
        >
          Export CSV
        </Button>

        <Button
          startIcon={<PrintRoundedIcon />}
          variant="outlined"
          onClick={() => window.print()}
        >
          Print
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card className="report-kpi">
            <Typography color="text.secondary">
              Filtered sales
            </Typography>

            <Typography
              variant="h4"
              fontWeight={900}
              color="primary"
            >
              RWF {money(total)}
            </Typography>

            <Chip
              label={`${data.length} orders`}
              size="small"
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card className="report-kpi">
            <Typography color="text.secondary">
              Average order value
            </Typography>

            <Typography variant="h4" fontWeight={900}>
              RWF {money(avg)}
            </Typography>

            <Typography variant="caption">
              Based on current filters
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card className="report-kpi">
            <Typography color="text.secondary">
              Completed revenue
            </Typography>

            <Typography
              variant="h4"
              fontWeight={900}
              color="success.main"
            >
              RWF{' '}
              {money(
                orders
                  .filter(o => o.status === 'Completed')
                  .reduce((s, o) => s + o.total, 0)
              )}
            </Typography>

            <Typography variant="caption">
              Across completed orders
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard title="Sales by Day / Month">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={daily}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,.08)"
                />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={v => `RWF ${money(v)}`}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#ffb454"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartCard title="Payment Method Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={payments}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {payments.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        ['#ffb454', '#35d0ba', '#61a8ff', '#ff6b6b'][
                          i % 4
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Sales by Category">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={category}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,.08)"
                />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="sales"
                  fill="#35d0ba"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard title="Top-Selling Items">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={top} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,.08)"
                />
                <XAxis type="number" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={90}
                />
                <Tooltip />
                <Bar
                  dataKey="qty"
                  fill="#ffb454"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
}

function ChartCard({ title, children }) {
  return (
    <Card sx={{ p: 2.2 }}>
      <Typography fontWeight={900} mb={2}>
        {title}
      </Typography>
      {children}
    </Card>
  );
}