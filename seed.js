// Scenario A1: Seed Data for shopDB.products
use("shopDB");

db.products.drop();

db.products.insertMany([
  { _id: 1, name: "Wireless Mouse", category: "Accessories", price: 800, stock: 50, discontinued: false, oldCode: "WM-01" },
  { _id: 2, name: "Keyboard", category: "Accessories", price: 1500, stock: 30, discontinued: false, oldCode: "KB-02" },
  { _id: 3, name: "USB Cable", category: "Accessories", price: 200, stock: 100, discontinued: false },
  { _id: 4, name: "Laptop", category: "Computers", price: 55000, stock: 10, discontinued: false },
  { _id: 5, name: "Monitor", category: "Computers", price: 12000, stock: 15, discontinued: false },
  { _id: 6, name: "Old Floppy Drive", category: "Computers", price: 300, stock: 0, discontinued: true },
  { _id: 7, name: "Dial-up Modem", category: "Computers", price: 500, stock: 0, discontinued: true },
  { _id: 8, name: "CD Drive", category: "Computers", price: 400, stock: 0, discontinued: true }
]);

print("Sample data inserted into shopDB.products successfully.");
