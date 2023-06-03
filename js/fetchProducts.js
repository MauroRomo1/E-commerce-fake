let data;
try {
  const res = await fetch("https://fakestoreapi.com/products");
  data = await res.json();
} catch (error) {
  console.log(error);
}
export const productos = data;
