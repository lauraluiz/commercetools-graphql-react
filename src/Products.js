import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks/lib/index';
import AddToCart from './AddToCart';

const PRODUCTS = gql`
  {
    products(limit: 10) {
      total
      results {
        id
        masterData {
          current {
            name(locale: "en")
          }
        }
      }
    }
  }`;

export default function Products() {
  const { loading, error, data } = useQuery(PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const productList = data.products.results.map((product) => {
    return (
      <div key={product.id}>
        <AddToCart productId={product.id}/> {product.masterData.current.name}
      </div>
    );
  });

  return (
    <div>
      <p>Total products: {data.products.total}</p>
      {productList}
    </div>
  );
}
