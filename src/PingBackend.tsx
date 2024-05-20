import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_HELLO } from "./queries.js";

const PingBackend = () => {
  const [data, setData] = useState<String>();
  const [ping] = useLazyQuery(GET_HELLO, {
    onCompleted: (res) => {
      setData(res.hello);
    },
    onError: (err) => {
      setData(err.message);
    },
  });

  return (
    <>
      <div>{data}</div>
      <button onClick={() => ping()}>Ping</button>
    </>
  );
};

export default PingBackend;
