// ============================================================================
// Set A - Scenario A1: Online Store Inventory Update
// Database / Collection: shopDB.products
// ============================================================================

use("shopDB");

// Reset and seed initial data
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

print("\n--- Task 1: Change the price of Keyboard to 1400 using $set ---");
const task1 = db.products.updateOne(
  { name: "Keyboard" },
  { $set: { price: 1400 } }
);
printjson(task1);
print("Verification:");
printjson(db.products.findOne({ name: "Keyboard" }));

print("\n--- Task 2: Add 25 units to the stock of Wireless Mouse using $inc ---");
const task2 = db.products.updateOne(
  { name: "Wireless Mouse" },
  { $inc: { stock: 25 } }
);
printjson(task2);
print("Verification:");
printjson(db.products.findOne({ name: "Wireless Mouse" }));

print("\n--- Task 3: Remove the obsolete field oldCode from every product using $unset ---");
const task3 = db.products.updateMany(
  {},
  { $unset: { oldCode: "" } }
);
printjson(task3);

print("\n--- Task 4: Replace the complete document of _id: 3 (USB Cable) ---");
const task4 = db.products.replaceOne(
  { _id: 3 },
  {
    name: "USB-C Cable",
    category: "Accessories",
    price: 350,
    stock: 100,
    discontinued: false
  }
);
printjson(task4);
print("Verification:");
printjson(db.products.findOne({ _id: 3 }));

print("\n--- Task 5: Delete the single product named Old Floppy Drive ---");
const task5 = db.products.deleteOne({ name: "Old Floppy Drive" });
printjson(task5);

print("\n--- Task 6: Delete all remaining products marked discontinued: true ---");
const task6 = db.products.deleteMany({ discontinued: true });
printjson(task6);
print("Remaining documents count: " + db.products.countDocuments());

print("\n--- Task 7: Aggregation - Stock summary per category (price >= 500) ---");
const task7 = db.products.aggregate([
  { $match: { price: { $gte: 500 } } },
  {
    $group: {
      _id: "$category",
      totalStock: { $sum: "$stock" },
      avgPrice: { $avg: "$price" }
    }
  },
  { $sort: { totalStock: -1 } },
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalStock: 1,
      avgPrice: 1
    }
  }
]).toArray();
printjson(task7);
