// ExampleComponent.js
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_HELLO } from "./queries.js"; // Define your GraphQL queries

const ExampleComponent = () => {
  const { loading, error, data } = useQuery(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return <div>{data}</div>;
};

export default ExampleComponent;
