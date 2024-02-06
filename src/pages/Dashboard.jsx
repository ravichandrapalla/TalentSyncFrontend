import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState("");
  useEffect(() => {
    getCurrentUser()
      .then((data) => setData(data))
      .catch((err) => toast.error(err));

    console.log("user decoaded ");
  }, []);
  return <h1>{data}</h1>;
}
