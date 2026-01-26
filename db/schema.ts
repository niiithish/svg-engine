import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const iconsTable = pgTable("icons", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    prompt: text("prompt").notNull(),
    svg: text("svg").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
