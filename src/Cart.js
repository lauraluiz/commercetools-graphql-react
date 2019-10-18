import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PlaceOrder from './PlaceOrder';

const CART = gql`
  query me {
    me {
      activeCart {
        id
        version
        lineItems {
          id
          name(locale: "en")
          quantity
        }
        totalPrice {
          centAmount
        }
      }
    }
  }`;

export default function Cart() {
  const { loading, error, data } = useQuery(CART);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data.me.activeCart) return null;

  const lineItemList = data.me.activeCart.lineItems.map((lineItem) =>
    <div key={lineItem.id}>{lineItem.quantity} x {lineItem.name}</div>
  );


  return (
    <div>
      {lineItemList}
      <div>{data.me.activeCart.totalPrice.centAmount / 100} €</div>
      <PlaceOrder cart={data.me.activeCart}/>
    </div>
  );
}
