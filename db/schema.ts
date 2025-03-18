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

//Users table
export const users = pgTable("users", {
  clerk_id: text("clerk_id").notNull().unique().primaryKey(),
});

//Invoice table
export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  clerkId: text("clerk_id")
    .references(() => users.clerk_id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),

  //Invoice details
  companyLogo: text("company_logo"),
  companyName: text("company_name").notNull(),
  invoiceNumber: integer("invoice_number"),
  customersName: text("customers_name").notNull(),
  customersLocation: text("customers_location"),
  date: timestamp("date"),
  dueDate: timestamp("due_date"),
  notes: text("notes"),
  paymentDetails: text("payment_details"),

  //Summary
  subtotal: decimal("sub_total", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).default("0"),
  taxRate: decimal("tax_rate", { precision: 10, scale: 2 }).default("0"),
  deliveryCost: decimal("delivery_cost", { precision: 10, scale: 2 }).default(
    "0"
  ),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  amountPaid: decimal("amount_paid", { precision: 10, scale: 2 }).default("0"),
  balanceDue: decimal("balance_due", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("unpaid").notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});

//Invoice item table
export const invoiceItem = pgTable("invoice_item", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  invoiceId: uuid("invoice_id")
    .references(() => invoices.id, { onDelete: "cascade" })
    .notNull(),

  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  amount: integer("amount").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//Invoice template table
export const invoiceTemplate = pgTable("invoice_template", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  usersId: text("user_id")
    .notNull()
    .references(() => users.clerk_id, { onDelete: "cascade" }),

  name: text("name"),
  templateData: json("template_data").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//Relationships

//users relation
export const usersRelations = relations(users, ({ many }) => ({
  invoices: many(invoices),
  invoiceTemplate: many(invoiceTemplate),
}));

//invoices relation
export const invoiceRelations = relations(invoices, ({ one, many }) => ({
  users: one(users, {
    fields: [invoices.clerkId],
    references: [users.clerk_id],
  }),
  invoiceItem: many(invoiceItem),
}));

//invoiceItem relation
export const invoiceItemRelations = relations(invoiceItem, ({ one }) => ({
  invoices: one(invoices, {
    fields: [invoiceItem.invoiceId],
    references: [invoices.id],
  }),
}));

//invoiceTemplate relation
export const invoiceTemplateRelations = relations(
  invoiceTemplate,
  ({ one }) => ({
    users: one(users, {
      fields: [invoiceTemplate.usersId],
      references: [users.clerk_id],
    }),
  })
);
