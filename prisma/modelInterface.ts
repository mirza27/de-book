// Interface untuk model Admin
interface Admin {
  admin_id: number;
  name: string;
  email: string;
  password: string;
  books: Book[];
  publishers: Publisher[];
  authors: Author[];
}

// Interface untuk model Book
interface Book {
  book_id: number;
  title: string;
  desc?: string | null;
  year_release: number;
  stock: number;
  price: number;
  img_url?: string | null;
  author: Author;
  author_id: number;
  publisher: Publisher;
  publisher_id: number;
  category: BookCategory;
  book_category_id: number;
  admin: Admin;
  admin_id: number;
  createdAt: Date;
  updatedAt: Date;
  OrderDetail: OrderDetail[];
  carts: Cart[];
}

// Interface untuk model Author
interface Author {
  author_id: number;
  author_name: string;
  date_birth?: Date | null;
  bio?: string | null;
  admin: Admin;
  admin_id: number;
  createdAt: Date;
  updatedAt: Date;
  books: Book[];
}

// Interface untuk model BookCategory
interface BookCategory {
  book_category_id: number;
  category_name: string;
  books: Book[];
}

// Interface untuk model OrderDetail
interface OrderDetail {
  order_detail_id: number;
  book: Book;
  order: Order;
  order_id: number;
  book_id: number;
  quantity: number;
}

// Interface untuk model Order
interface Order {
  order_id: number;
  user: User;
  user_id: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  order_details: OrderDetail[];
}

// Interface untuk model Publisher
interface Publisher {
  publisher_id: number;
  publisher_name: string;
  admin: Admin;
  admin_id: number;
  createdAt: Date;
  updatedAt: Date;
  books: Book[];
}

// Interface untuk model User
interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  orders: Order[];
  carts: Cart[];
}


interface Cart {
  cart_id: number;
  book_id: number;
  quantity: number;
  user_id: number;
  book: Book;
}