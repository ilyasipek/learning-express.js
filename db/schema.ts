import {
    mysqlTable,
    timestamp,
    varchar,
    int,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('mfx_users', {
    id: varchar('id', {length: 256}).primaryKey(),
    name: varchar('name', { length: 256 }),
    age: int('age'),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
});