UPDATE products
SET price = 119999.00
WHERE name = 'iPhone 16'
RETURNING name, price

UPDATE categories
SET description = 'Tables, chairs, and more'
WHERE name = 'Furniture'


DELETE FROM product_images WHERE product_id in (
  SELECT id as product_ids FROM products WHERE category_id = (
    SELECT id FROM categories WHERE name = 'Electronics'
  )
)

DELETE FROM products WHERE category_id = (
  SELECT id FROM categories WHERE name = 'Electronics'
)

SELECT id FROM categories WHERE name = 'Electronics'

INSERT INTO products (name, description, price, category_id)
VALUES ('iphone 17', 'Latest iphone with m18 chipset', 79999.00, 1), ('Macbook pro M4', 'Chipset M4 10 core', 289999, 1)




SET request.jwt.claims = '';
SET ROLE anon;

SELECT * FROM products;

RESET ROLE;


CREATE POLICY "any one can view"
on products
FOR SELECT
USING (true)

SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'products'

SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'products'

CREATE POLICY "any one can view"
ON categories
FOR SELECT
USING(true);

-- Grant the anon role access to the public schema
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;


-- Temporary policies for learning (we'll replace these in Phase 4)
CREATE POLICY "Temp: allow insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Temp: allow update" ON products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Temp: allow delete" ON products FOR DELETE USING (true);

-- Same for categories
CREATE POLICY "Temp: allow insert" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Temp: allow update" ON categories FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Temp: allow delete" ON categories FOR DELETE USING (true);

-- Grant write permissions to anon role
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;

-- Get the policy of product table
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'categories';

-- Step 1: Drop ALL temporary policies on products
DROP POLICY "Temp: allow insert" ON products;
DROP POLICY "Temp: allow update" ON products;
DROP POLICY "Temp: allow delete" ON products;

-- Step 2: Drop ALL temporary policies on categories
DROP POLICY "Temp: allow insert" ON categories;
DROP POLICY "Temp: allow update" ON categories;
DROP POLICY "Temp: allow delete" ON categories;

-- Products: Anyone can READ, only authenticated users can WRITE
CREATE POLICY "Authenticated users can insert products"
ON products FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update products"
ON products FOR UPDATE
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete products"
ON products FOR DELETE
USING (auth.uid() IS NOT NULL);

-- Categories: Anyone can READ, only authenticated users can WRITE
CREATE POLICY "Authenticated users can insert categories"
ON categories FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update categories"
ON categories FOR UPDATE
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete categories"
ON categories FOR DELETE
USING (auth.uid() IS NOT NULL);
