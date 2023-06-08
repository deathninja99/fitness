import { useState } from "react";

export default function Home() {
  try {
    const [error, seterror] = useState(null);
    return (
      <>
        <h1>welcome to fitness tracker</h1>
        <p>{error}</p>
      </>
    );
  } catch (error) {
    seterror;
  }
}
