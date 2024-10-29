import { Hono } from 'hono';
import { db } from '../db/drizzle';
import { items } from '../db/schema';
import { eq } from 'drizzle-orm/expressions';

const itemRoutes = new Hono();

// Create a new item
itemRoutes.post('/items', async (ctx) => {
  const { name, description } = await ctx.req.json();
  const newItem = await db.insert(items).values({ name, description }).returning();
  return ctx.json(newItem);
});

// Read all items
itemRoutes.get('/items', async (ctx) => {
  const allItems = await db.select().from(items);
  return ctx.json(allItems);
});

// Read a single item by ID
itemRoutes.get('/items/:id', async (ctx) => {
    const { id } = ctx.req.param();
    const item = await db.select().from(items).where(eq(items.id, parseInt(id)));
    return ctx.json(item);
  });
  

// Update an item by ID
itemRoutes.put('/items/:id', async (ctx) => {
    const { id } = ctx.req.param();
    const { name, description } = await ctx.req.json();
  
    const updatedItem = await db
      .update(items)
      .set({ name, description })
      .where(eq(items.id, parseInt(id))) // use `eq` function here
      .returning();
  
    return ctx.json(updatedItem);
  });
  
  
// Delete an item by ID
itemRoutes.delete('/items/:id', async (ctx) => {
    const { id } = ctx.req.param();
    await db.delete(items).where(eq(items.id, parseInt(id)));
    return ctx.json({ message: 'Item deleted' });
  });
export default itemRoutes;
