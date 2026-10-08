# Savora Kitchen — Restaurant Point-of-Sale Interface

A complete frontend-only restaurant POS built for the **ITLDF601 – Frontend Development** final practical assessment.

## Technologies
- React.js + Vite
- JavaScript ES6+
- React Router
- Material UI (MUI) + MUI Icons
- Recharts
- HTML5 / CSS3
- Browser localStorage

## Run
```bash
npm install
npm run dev
```
Open the local Vite URL shown in the terminal.

## Included requirements
- Dashboard with sales KPIs, recent orders, popular items and snapshot
- Menu CRUD, search, category/availability filters, sorting and item details
- Category management with menu-item counts
- New Order POS workflow with quantity controls, customer selection and payment validation
- Automatic subtotal, configurable tax and total calculations using array reduce logic
- Cash change calculation and insufficient-payment prevention
- Professional printable receipt
- Orders table, search, status/payment filters, cancellation and dynamic order details route
- Customer CRUD and customer statistics
- Sales reports with daily trend, category, payment and top-item charts using Recharts
- Frontend CSV export and print controls
- Responsive desktop/tablet/mobile layout
- Loading/empty/validation/success/error/confirmation feedback patterns
- Persistent mock data through localStorage
- 40 menu items, 8 categories, 25 customers, 40 previous orders and 10 popular seed items

## Storage
The first launch seeds all mock data into localStorage. Refreshing the browser keeps menu items, categories, customers, orders and settings.

## Notes for demonstration
1. Start at Dashboard and show the KPI cards.
2. Open Menu and demonstrate search, filtering, add/edit/delete.
3. Open New Order, add the same item twice to demonstrate quantity merging.
4. Select a customer and payment method. For Cash, enter an amount below Total to demonstrate validation, then enter enough to complete.
5. Print/display the receipt after checkout.
6. Open Orders and `/orders/:orderId` to demonstrate dynamic routing.
7. Open Customers and Reports to demonstrate CRUD, Recharts and CSV export.
