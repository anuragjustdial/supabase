import { supabase } from "./supabaseClient.js";


// Read all products along with their name, description, price and category
async function selectProducts() {
  const { data, error } = await supabase.from('products').select('name, description, price, categories(name)');

  if (error) {
    console.error('Error fetching products:', error);
  } else {
    console.log('Products fetched successfully:', data);
  }
}

// Read products with Filtering: Fetch products with price greater than 10000
async function selectProductsWithPriceGreaterThan10000() {
  const { data, error } = await supabase.from('products')
    .select('name, description, price')
    .gt('price', 100000);

  if (error) {
    console.error('Error fetching products with price greater than 100000:', error);
  } else {
    console.log('Products with price greater than 10000 fetched successfully:', data);
  }
}

async function insertProduct() {
  const { data, error } = await supabase.from('products')
    .insert({
        name: 'Samsung Galaxy S21',
        description: 'Latest Samsung flagship smartphone with advanced features.',
        price: 129999.99,
        category_id: 1 // Assuming category_id 1 corresponds to "Smartphones"
    })
    .select(); 

  if (error) {
    console.error('Error inserting product:', error);
  } else {
    console.log('Product inserted successfully:', data);
  }
}

async function updateProductPriceByName() {
  const { data, error } = await supabase.from('products')
    .update({ price: 139999.99 })
    .eq('name', 'Samsung Galaxy S21')
    .select();

  if (error) {
    console.error('Error updating product price:', error);
  } else {
    console.log('Product price updated successfully:', data);
  }
}

async function deleteProductByName() {
  const { data, error } = await supabase.from('products')
    .delete()
    .eq('name', 'Samsung Galaxy S21')
    .select();

  if (error) {
    console.error('Error deleting product:', error);
  } else {
    console.log('Product deleted successfully:', data);
  }
}

async function main() {
  await selectProducts();
  // await selectProductsWithPriceGreaterThan10000();
  // await insertProduct();
  // await updateProductPriceByName();
  // await deleteProductByName();
}

main();