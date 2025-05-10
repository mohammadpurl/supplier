# Supplier Dashboard

A comprehensive dashboard for suppliers to manage their products, orders, shipping, and more.

## Features

- Product Management
  - Add, edit, and delete products
  - Upload product images
  - Set bulk pricing
  - Import/export products via Excel
  - Manage product details and specifications

- Order Management
  - View and manage orders
  - Update order status
  - Track order history
  - Generate invoices

- Shipping Management
  - Define shipping areas
  - Set shipping methods (supplier or company)
  - Manage warehouse locations
  - Track shipping status

- Settings
  - Manage warehouse locations
  - Configure shipping areas
  - User access control
  - System preferences

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hook Form
- React Dropzone
- Heroicons

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd supplier-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── orders/
│   │   └── settings/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── dashboard/
│       ├── Header.tsx
│       └── Sidebar.tsx
└── types/
    └── index.ts
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 