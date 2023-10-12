import React from 'react';
import {TypeErrorProps} from "./types";

function Error({ msg, code }: TypeErrorProps) {
  return (
    <div>
      <h1>{code}</h1>
      <p>{msg}</p>
    </div>
  );
}

export default Error;
