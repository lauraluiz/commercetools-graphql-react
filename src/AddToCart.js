import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

const CART = gql`
  query me {
    me {
      activeCart {
        id
        version
      }
    }
  }`;

const CREATE_CART = gql`
  mutation {
    createMyCart(draft: {
      currency: "EUR"
      shippingAddress: { country: "DE" }
    }) {
      id
      version
    }
  }`;

const ADD_LINE_ITEM = gql`
  mutation ($id: String!, $version: Long!, $productId: String!) {
    updateMyCart(id: $id, version: $version, actions: {
      addLineItem: {
        productId: $productId
      }
     }) {
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
  }`;

export default function AddToCart({ productId }) {
  const [createCart] = useMutation(CREATE_CART);
  const [addLineItem] = useMutation(ADD_LINE_ITEM);
  const { loading, error, data } = useQuery(CART);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <button onClick={async () => {
    const cart = data.me.activeCart ? data.me.activeCart
      : await createCart({refetchQueries: ['me']}).then(result => result.data.createMyCart);
    addLineItem({
      variables: {
        id: cart.id,
        version: cart.version,
        productId: productId
      }
    })
  }}>Add</button>;
}
