const images = [
  '/images/menu/sunrise-omelette.jpg',
  '/images/menu/pancake-stack.jpg',
  '/images/menu/avocado-toast.jpg',
  '/images/menu/classic-burger.jpg',
  '/images/menu/crispy-chicken-burger.jpg',
  '/images/menu/smash-beef-burger.jpg',
  '/images/menu/margherita-pizza.jpg',
  '/images/menu/bbq-chicken-pizza.jpg',
  '/images/menu/pepperoni-pizza.jpg',
  '/images/menu/four-cheese-pizza.jpg',
  '/images/menu/grilled-beef-steak.jpg',
  '/images/menu/creamy-alfredo-pasta.jpg',
  '/images/menu/spicy-arrabbiata.jpg',
  '/images/menu/chicken-carbonara.jpg',
  '/images/menu/chicken-caesar-salad.jpg',
  '/images/menu/garden-fresh-salad.jpg',
  '/images/menu/grilled-chicken-wrap.jpg',
  '/images/menu/beef-shawarma.jpg',
  '/images/menu/club-sandwich.jpg',
  '/images/menu/fish-and-chips.jpg',
  '/images/menu/crispy-chicken-wings.jpg',
  '/images/menu/loaded-fries.jpg',
  '/images/menu/mozzarella-sticks.jpg',
  '/images/menu/beef-samosa.jpg',
  '/images/menu/grilled-skewers.jpg',
  '/images/menu/tomato-soup.jpg',
  '/images/menu/mushroom-soup.jpg',
  '/images/menu/fresh-fruit-bowl.jpg',
  '/images/menu/iced-latte.jpg',
  '/images/menu/cappuccino.jpg',
  '/images/menu/espresso.jpg',
  '/images/menu/fresh-orange-juice.jpg',
  '/images/menu/passion-fruit-cooler.jpg',
  '/images/menu/mango-smoothie.jpg',
  '/images/menu/classic-lemonade.jpg',
  '/images/menu/chocolate-cake.jpg',
  '/images/menu/cheesecake-slice.jpg',
  '/images/menu/tiramisu.jpg',
  '/images/menu/ice-cream-trio.jpg',
  '/images/menu/brownie-sundae.jpg'
];
const names=['Sunrise Omelette','Pancake Stack','Avocado Toast','Classic Burger','Crispy Chicken Burger','Smash Beef Burger','Margherita Pizza','BBQ Chicken Pizza','Pepperoni Pizza','Four Cheese Pizza','Grilled Beef Steak','Creamy Alfredo Pasta','Spicy Arrabbiata','Chicken Carbonara','Chicken Caesar Salad','Garden Fresh Salad','Grilled Chicken Wrap','Beef Shawarma','Club Sandwich','Fish & Chips','Crispy Chicken Wings','Loaded Fries','Mozzarella Sticks','Beef Samosa','Grilled Skewers','Tomato Soup','Mushroom Soup','Fresh Fruit Bowl','Iced Latte','Cappuccino','Espresso','Fresh Orange Juice','Passion Fruit Cooler','Mango Smoothie','Classic Lemonade','Chocolate Cake','Cheesecake Slice','Tiramisu','Ice Cream Trio','Brownie Sundae'];
const cats=['Breakfast','Main Course','Fast Food','Pizza','Burgers','Drinks','Desserts','Snacks'];
const catFor=i=>cats[[0,0,0,4,4,4,3,3,3,3,1,1,1,1,1,1,2,2,2,1,7,7,7,7,7,1,1,7,5,5,5,5,5,5,5,6,6,6,6,6][i]];
const price = i => [
  4500,   // 0  Sunrise Omelette
  3500,   // 1  Pancake Stack
  3000,   // 2  Avocado Toast
  6500,   // 3  Classic Burger
  7500,   // 4  Crispy Chicken Burger
  8500,   // 5  Smash Beef Burger
  7000,   // 6  Margherita Pizza
  9500,   // 7  BBQ Chicken Pizza
  10000,  // 8  Pepperoni Pizza
  9000,   // 9  Four Cheese Pizza
  18000,  // 10 Grilled Beef Steak
  7500,   // 11 Creamy Alfredo Pasta
  7000,   // 12 Spicy Arrabbiata
  8000,   // 13 Chicken Carbonara
  5500,   // 14 Chicken Caesar Salad
  5000,   // 15 Garden Fresh Salad
  5000,   // 16 Grilled Chicken Wrap
  6000,   // 17 Beef Shawarma
  6500,   // 18 Club Sandwich
  7500,   // 19 Fish & Chips
  9000,   // 20 Crispy Chicken Wings
  5000,   // 21 Loaded Fries
  3500,   // 22 Mozzarella Sticks
  2500,   // 23 Beef Samosa
  5500,   // 24 Grilled Skewers
  3000,   // 25 Tomato Soup
  3500,   // 26 Mushroom Soup
  4000,   // 27 Fresh Fruit Bowl
  2500,   // 28 Iced Latte
  2000,   // 29 Cappuccino
  1500,   // 30 Espresso
  2000,   // 31 Fresh Orange Juice
  3000,   // 32 Passion Fruit Cooler
  4000,   // 33 Mango Smoothie
  2000,   // 34 Classic Lemonade
  4500,   // 35 Chocolate Cake
  5000,   // 36 Cheesecake Slice
  5500,   // 37 Tiramisu
  3500,   // 38 Ice Cream Trio
  4500    // 39 Brownie Sundae
][i];
export const categories=cats.map((name,i)=>({id:`cat-${i+1}`,name,description:['Fresh morning favourites','Chef-crafted signature plates','Quick bites and comfort food','Stone-baked favourites','Juicy handcrafted burgers','Refreshing hot & cold drinks','Sweet finishes','Perfect shareable bites'][i],status:'Active'}));
export const menu=names.map((name,i)=>({id:`item-${i+1}`,name,description:`House special ${name.toLowerCase()} prepared with fresh ingredients and Savora's signature touch.`,category:catFor(i),price:price(i),available:i!==26,image: images[i] }));
const first=['Aline','Eric','Mugisha','Diane','Jean','Kevin','Claudine','Samuel','Alice','Pacifique','Nadine','Patrick','Sandrine','Emmanuel','Grace','David','Doreen','Fabrice','Solange','Cédric','Chantal','Yves','Esther','Brian','Hope'];
export const customers=first.map((n,i)=>({id:`CUS-${String(i+1).padStart(3,'0')}`,name:`${n} ${['Uwase','Niyonzima','Mutesi','Habimana','Ishimwe'][i%5]}`,phone:`+250 78${String(1000000+i*731).slice(0,7)}`,email:`${n.toLowerCase()}${i+1}@example.com`,status:i%7===0?'Inactive':'Active',orders:0,totalSpent:0,lastOrder:null}));
const methods=['Cash','Card','Mobile Money','Bank Transfer'], statuses=['Completed','Completed','Completed','Ready','Preparing','Pending','Completed','Cancelled'];
const daysAgo=i=>new Date(Date.now()-i*86400000-(i%6)*3600000);
export const orders=Array.from({length:40},(_,i)=>{const its=[i%40,(i*3+7)%40,(i*5+13)%40].slice(0,2+(i%2));const items=its.map((idx,j)=>({itemId:menu[idx].id,name:menu[idx].name,price:menu[idx].price,quantity:1+(i+j)%3,total:menu[idx].price*(1+(i+j)%3)}));const subtotal=items.reduce((s,x)=>s+x.total,0);const tax=+(subtotal*.1).toFixed(2);return{id:`ORD-${String(1001+i)}`,date:daysAgo(i),customerId:i%5===0?null:customers[i%customers.length].id,customerName:i%5===0?'Walk-in Customer':customers[i%customers.length].name,items,subtotal,tax,total:+(subtotal+tax).toFixed(2),paymentMethod:methods[i%methods.length],amountPaid:+(subtotal+tax+((i%3)*2)).toFixed(2),change:+((i%3)*2).toFixed(2),status:statuses[i%statuses.length],cashier:'Alex Morgan'}});
export const popular=menu.slice(0,10);
export const seedAll=()=>({menu,categories,customers,orders,settings:{taxRate:10,restaurantName:'SAVORA KITCHEN',cashier:'Alex Morgan'}});
