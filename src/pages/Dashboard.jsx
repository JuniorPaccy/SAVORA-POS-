// import React,{useMemo} from 'react';import {Box,Grid,Typography,Chip,Button,Avatar} from '@mui/material';import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';import CancelRoundedIcon from '@mui/icons-material/CancelRounded';import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';import StatCard from '../components/StatCard';import SectionCard from '../components/SectionCard';
// const money=n=>`RWF ${Math.round(n).toLocaleString()}`;export default function Dashboard({orders,customers,menu}){const today=new Date().toDateString();const todays=orders.filter(o=>new Date(o.date).toDateString()===today);const sales=todays.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+o.total,0);const pending=orders.filter(o=>['Pending','Preparing','Ready'].includes(o.status)).length;const completed=orders.filter(o=>o.status==='Completed').length;const cancelled=orders.filter(o=>o.status==='Cancelled').length;const avg=orders.length?orders.reduce((s,o)=>s+o.total,0)/orders.length:0;const recent=[...orders].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,6);const popular=useMemo(()=>{const m={};orders.forEach(o=>o.items.forEach(i=>m[i.name]=(m[i.name]||0)+i.quantity));return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,5)},[orders]);return <Box className="fade-in"><Grid container spacing={2}>{[["Today's Orders",todays.length,'Live orders',ShoppingBagRoundedIcon,'primary'],["Today's Sales",money(sales),'Net sales',PaymentsRoundedIcon,'success'],['Pending Orders',pending,'Needs attention',HourglassTopRoundedIcon,'warning'],['Completed',completed,'All-time',TaskAltRoundedIcon,'success'],['Cancelled',cancelled,'All-time',CancelRoundedIcon,'error'],['Customers',customers.length,'Registered',PeopleRoundedIcon,'info'],['Menu Items',menu.length,'Active catalogue',RestaurantRoundedIcon,'secondary'],['Avg. Order',money(avg),'Across orders',TrendingUpRoundedIcon,'primary']].map((x,i)=><Grid size={{xs:12,sm:6,md:3}} key={i}><StatCard label={x[0]} value={x[1]} sub={x[2]} icon={x[3]} color={x[4]}/></Grid>)}</Grid><Grid container spacing={2} mt={0.2}><Grid size={{xs:12,lg:6}}><SectionCard title="Recent Orders" subtitle="Latest activity across the restaurant" action={<Button size="small" href="/orders">View all</Button>}><Box className="table-wrap"><table className="nice-table"><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>{recent.map(o=><tr key={o.id}><td><b>{o.id}</b><small>{new Date(o.date).toLocaleString()}</small></td><td>{o.customerName}</td><td>{money(o.total)}</td><td><Chip size="small" label={o.status} color={o.status==='Completed'?'success':o.status==='Cancelled'?'error':'warning'}/></td></tr>)}</tbody></table></Box></SectionCard></Grid><Grid size={{xs:12,md:6,lg:2}}><SectionCard title="Recent Customers" subtitle="Latest customer records"><Box>{customers.slice(0,5).map(c=><Box key={c.id} className="rank-row"><Avatar className="rank">{c.name[0]}</Avatar><Box sx={{flex:1}}><Typography fontSize={13} fontWeight={700}>{c.name}</Typography><Typography variant="caption" color="text.secondary">{c.orders||0} orders • {c.status}</Typography></Box></Box>)}</Box></SectionCard></Grid><Grid size={{xs:12,md:6,lg:2}}><SectionCard title="Popular Items" subtitle="Most ordered"><Box>{popular.map(([n,q],i)=><Box key={n} className="rank-row"><Avatar className="rank">{i+1}</Avatar><Box sx={{flex:1}}><Typography fontSize={13} fontWeight={700}>{n}</Typography><Typography variant="caption" color="text.secondary">{q} orders</Typography></Box><Typography fontWeight={800} color="primary">{q}</Typography></Box>)}</Box></SectionCard></Grid><Grid size={{xs:12,md:6,lg:2}}><SectionCard title="Today's Sales Summary" subtitle="Quick view"><Box className="snapshot"><Typography variant="caption">Today's sales</Typography><Typography variant="h4" fontWeight={900} color="primary">{money(sales)}</Typography><Box className="mini-bars">{[45,70,55,82,65,90,75].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</Box><Typography variant="caption" color="success.main">Strong activity this week</Typography></Box></SectionCard></Grid></Grid></Box>}

import React, { useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  Avatar
} from '@mui/material';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import StatCard from '../components/StatCard';
import SectionCard from '../components/SectionCard';

const money = n =>
  `RWF ${Math.round(n).toLocaleString()}`;

export default function Dashboard({
  orders,
  customers,
  menu
}) {
  const today = new Date().toDateString();

  const todays = orders.filter(
    o => new Date(o.date).toDateString() === today
  );

  const sales = todays
    .filter(o => o.status !== 'Cancelled')
    .reduce((s, o) => s + o.total, 0);

  const pending = orders.filter(o =>
    ['Pending', 'Preparing', 'Ready'].includes(o.status)
  ).length;

  const completed = orders.filter(
    o => o.status === 'Completed'
  ).length;

  const cancelled = orders.filter(
    o => o.status === 'Cancelled'
  ).length;

  const avg = orders.length
    ? orders.reduce((s, o) => s + o.total, 0) /
      orders.length
    : 0;

  const recent = [...orders]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 6);

  const popular = useMemo(() => {
    const m = {};

    orders.forEach(o =>
      o.items.forEach(
        i =>
          (m[i.name] =
            (m[i.name] || 0) + i.quantity)
      )
    );

    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [orders]);

  return (
    <Box className="fade-in">
      <Grid container spacing={2}>
        {[
          [
            "Today's Orders",
            todays.length,
            'Live orders',
            ShoppingBagRoundedIcon,
            'primary'
          ],
          [
            "Today's Sales",
            money(sales),
            'Net sales',
            PaymentsRoundedIcon,
            'success'
          ],
          [
            'Pending Orders',
            pending,
            'Needs attention',
            HourglassTopRoundedIcon,
            'warning'
          ],
          [
            'Completed',
            completed,
            'All-time',
            TaskAltRoundedIcon,
            'success'
          ],
          [
            'Cancelled',
            cancelled,
            'All-time',
            CancelRoundedIcon,
            'error'
          ],
          [
            'Customers',
            customers.length,
            'Registered',
            PeopleRoundedIcon,
            'info'
          ],
          [
            'Menu Items',
            menu.length,
            'Active catalogue',
            RestaurantRoundedIcon,
            'secondary'
          ],
          [
            'Avg. Order',
            money(avg),
            'Across orders',
            TrendingUpRoundedIcon,
            'primary'
          ]
        ].map((x, i) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3
            }}
            key={i}
          >
            <StatCard
              label={x[0]}
              value={x[1]}
              sub={x[2]}
              icon={x[3]}
              color={x[4]}
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={2}
        mt={2}
      >
        <Grid
          size={{
            xs: 12,
            lg: 6
          }}
        >
          <SectionCard
            title="Recent Orders"
            subtitle="Latest activity across the restaurant"
            action={
              <Button
                size="small"
                href="/orders"
              >
                View all
              </Button>
            }
          >
            <Box className="table-wrap">
              <table className="nice-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recent.map(o => (
                    <tr key={o.id}>
                      <td>
                        <b>{o.id}</b>
                        <small>
                          {new Date(
                            o.date
                          ).toLocaleString()}
                        </small>
                      </td>

                      <td>
                        {o.customerName}
                      </td>

                      <td>
                        {money(o.total)}
                      </td>

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
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </SectionCard>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 2
          }}
        >
          <SectionCard
            title="Recent Customers"
            subtitle="Latest customer records"
          >
            <Box>
              {customers.slice(0, 5).map(c => (
                <Box
                  key={c.id}
                  className="rank-row"
                >
                  <Avatar className="rank">
                    {c.name[0]}
                  </Avatar>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      fontSize={13}
                      fontWeight={700}
                    >
                      {c.name}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {c.orders || 0} orders •{' '}
                      {c.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </SectionCard>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 2
          }}
        >
          <SectionCard
            title="Popular Items"
            subtitle="Most ordered"
          >
            <Box>
              {popular.map(([n, q], i) => (
                <Box
                  key={n}
                  className="rank-row"
                >
                  <Avatar className="rank">
                    {i + 1}
                  </Avatar>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      fontSize={13}
                      fontWeight={700}
                    >
                      {n}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {q} orders
                    </Typography>
                  </Box>

                  <Typography
                    fontWeight={800}
                    color="primary"
                  >
                    {q}
                  </Typography>
                </Box>
              ))}
            </Box>
          </SectionCard>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 2
          }}
        >
          <SectionCard
            title="Today's Sales Summary"
            subtitle="Quick view"
          >
            <Box className="snapshot">
              <Typography variant="caption">
                Today's sales
              </Typography>

              <Typography
                variant="h4"
                fontWeight={900}
                color="primary"
              >
                {money(sales)}
              </Typography>

              <Box className="mini-bars">
                {[45, 70, 55, 82, 65, 90, 75].map(
                  (h, i) => (
                    <i
                      key={i}
                      style={{
                        height: `${h}%`
                      }}
                    />
                  )
                )}
              </Box>

              <Typography
                variant="caption"
                color="success.main"
              >
                Strong activity this week
              </Typography>
            </Box>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}