import React from "react";
import { useQuery } from "@apollo/client";
import { GET_HELLO } from "./queries.js";

const PingBackend = () => {
  // const { loading, error, data } = useQuery(GET_HELLO);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error.message}</p>;
  const data = 123;

  return (
    <>
      <div>hea</div>
      <div>{data}</div>
    </>
  );
};

export default PingBackend;
