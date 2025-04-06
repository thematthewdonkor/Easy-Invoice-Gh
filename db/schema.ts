import { pgTable, text, uuid, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  userId: text("user_id").notNull().unique().primaryKey(),
});

// Invoices table
export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  userId: text("user_id")
    .references(() => users.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),

  companyLogo: text("company_logo"),
  companyName: text("company_name").notNull(),
  invoiceNumber: text("invoice_number"),
  customersName: text("customers_name").notNull(),
  customersLocation: text("customers_location"),
  date: text("date"), //TODO
  dueDate: text("due_date"), //TODO
  notes: text("notes"),
  paymentDetails: text("payment_details"),

  subtotal: text("sub_total").notNull(),
  discount: text("discount"),
  deliveryCost: text("delivery_cost"),
  total: text("total").notNull(),
  amountPaid: text("amount_paid"),
  balanceDue: text("balance_due").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// New: Invoice Items table
export const invoiceItems = pgTable("invoice_items", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  invoiceId: uuid("invoice_id")
    .references(() => invoices.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),

  description: text("description"),
  quantity: integer("quantity").notNull(),
  price: text("price").notNull(),
  amount: text("amount").notNull(),
});

//Relation
export const usersRelations = relations(users, ({ many }) => ({
  invoices: many(invoices),
}));

export const invoicesRelations = relations(invoices, ({ many }) => ({
  invoiceItems: many(invoiceItems),
}));
