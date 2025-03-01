import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  decimal,
  json,
} from "drizzle-orm/pg-core";

//====================Create user table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
});

//====================Create invoice table
export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
  companyLogo: text("company_logo").notNull(),
  companyName: text("company_name").notNull(),
  invoiceNumber: text("invoice_number").notNull(),
  customersName: text("customer_name").notNull(),
  customersLocation: text("customers_location"),
  description: text("description").notNull(),
  notes: text("notes"),
  paymentDetails: text("payment_details"),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
  taXRate: decimal("tax_rate", { precision: 10, scale: 2 }).default("0"),
  deliveryCost: decimal("delivery_cost", { precision: 10, scale: 2 }).default(
    "0"
  ),
  subTotal: decimal("sub_total", { precision: 10, scale: 2 }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  balanceDue: decimal("balance_due", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("unpaid").notNull(),
});

//====================Create invoice item table
export const invoiceItem = pgTable("invoice_item", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceId: uuid("invoice_id")
    .references(() => invoices.id, { onDelete: "cascade" })
    .notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//====================Create invoice template table
export const invoiceTemplate = pgTable("invoice_template", {
  id: uuid("id").defaultRandom().primaryKey(),
  usersId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name"),
  templateData: json("template_data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//======================Relationships
//Define users relationships
export const usersRelations = relations(users, ({ many }) => ({
  invoices: many(invoices),
  invoiceTemplate: many(invoiceTemplate),
}));

//Define invoices relationships
export const invoiceRelations = relations(invoices, ({ one, many }) => ({
  users: one(users, {
    fields: [invoices.userId],
    references: [users.id],
  }),
  invoiceItem: many(invoiceItem),
}));

//One to one relation
export const invoiceItemRelations = relations(invoiceItem, ({ one }) => ({
  invoices: one(invoices, {
    fields: [invoiceItem.invoiceId],
    references: [invoices.id],
  }),
}));

//This is also one to one relation
//Each invoice template belongs to exactly one invoice item
export const invoiceTemplateRelations = relations(
  invoiceTemplate,
  ({ one }) => ({
    users: one(users, {
      fields: [invoiceTemplate.usersId], //FK in the invoice item table
      references: [users.id], //PK in the invoice table
    }),
  })
);
