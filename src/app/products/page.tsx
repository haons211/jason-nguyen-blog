import type { Metadata } from "next";
import { NextPageProps } from "@/lib/types";
import { getAllProducts } from "@/lib/products";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: 'Products',
  description: 'Showcase of products and projects built by Jason Nguyen',
};

export default async function ProductsPage(props: NextPageProps) {
  const products = await getAllProducts();

  return (
    <ProductsClient products={products} />
  );
}
