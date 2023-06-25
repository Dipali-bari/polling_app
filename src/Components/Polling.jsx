import React, { useEffect } from "react";
import { useState } from "react";

export default function () {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const getPoll = () => {
      fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.hits);
          //setState(data.hits);
          const data1 = data.hits;
          setState((pre) => [...pre, ...data1]);
          setPage((prepage) => prepage + 1);
        })
        .catch(() => {
          alert("Invalid Data");
        });
    };
    const interval = setInterval(getPoll, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [page]);

  return (
    <div>
      <h2>Polling App</h2>
      <p>Page Count will add after every 10 second</p>

      <h2><span style={{ backgroundColor: "red"}}>{page}</span></h2>

      {state.length > 0 && (
        <table frame="box" rules="all" style={{ margin: "20px auto" }}>
          <thead style={{ backgroundColor: "yellow" }}>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Created At</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {state.map((e, i) => {
              return (
                <tr>
                  <td>{e.title}</td>
                  <td>{e.url}</td>
                  <td>{e.created_at}</td>
                  <td>{e.author}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
