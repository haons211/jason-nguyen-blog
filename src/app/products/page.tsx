import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { NextPageProps } from "@/lib/types";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: 'Products',
  description: 'Showcase of products and projects built by Jason Nguyen',
};

export default async function ProductsPage(props: NextPageProps) {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Products</h1>
          <p className="text-xl text-gray-600">
            A showcase of products and projects I've built
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-6"></div>
        </header>

        <ProductsClient />
      </div>
    </MainLayout>
  );
}
