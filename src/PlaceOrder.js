import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const PLACE_ORDER = gql`
  mutation ($id: String!, $version: Long!) {
    createMyOrderFromCart(draft: {
      id: $id
      version: $version
    }) {
      id
    }
  }`;

export default function PlaceOrder({ cart }) {
  const [placeOrder] = useMutation(PLACE_ORDER);

  return <button onClick={() => placeOrder({
    variables: {
      id: cart.id,
      version: cart.version,
    },
    refetchQueries: ['me']
  })}>Place order</button>;
}
