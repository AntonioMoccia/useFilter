import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { IFilter, useFilters } from "./hooks/useFilter";

function App() {
  const [count, setCount] = useState(0);
  const items = [
    {
      nome: "antonio",
      cognome: "moccia",
      sposato: false,
    },
    {
      nome: "clara",
      cognome: "guarino",
      sposato: true,
    },
  ];

  /**
   * 
   * select
   *  multi_filter
   *    joinoperator
   * option
   *  single_filter
   *  
  class Filter{
    private name:string;
    private field:string;
    private initial:string
    private value: string

    constructor(){

    }

  }
   */

  /**
   * name
   * field
   * initialValue
   * customValidator?
   */
  /* 
  interface FilterProps{
    name:string,
    field:string,
    initialValue
  }

  class Filter{
    constructor(props:FilterProps){

    }
  }
 */

  const filtersDef: IFilter<(typeof items)[0]>[] = [
    {
      field: "nome",
      initialValue: "",
      validator: (item, fieldValue) => {
        if (fieldValue == "" || fieldValue == "all") {
          return true;
        }
        return item.nome == fieldValue;
      },
    },
    {
      field: "cognome",
      initialValue: "",
      validator: (item, fieldValue) => {
        if (fieldValue == "" || fieldValue == "all") {
          return true;
        }
        return item.cognome == fieldValue;
      },
    },
    {
      field: "sposato",
      initialValue: false,
      validator: (item, fieldValue) => {
        
        if (fieldValue === false) {          
          console.log('fieldValue',fieldValue);
          return true;
        }else{

        }
        return item.sposato === fieldValue;
      },
    },
  ];

  const { loading, handleFilterChange, data , filters} = useFilters<
    (typeof items)[0]
  >({
    filtersDef: filtersDef,
    items,
  });

  useEffect(()=>{
    console.log('data',data)
    console.log('filters',filters)
  },[data])


  return (
    <>
      <div>
        <div>
          <h1>Filter Name</h1>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              handleFilterChange("nome", "clara");
            }}
          >
            Clara
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              handleFilterChange("nome", "antonio");
            }}
          >
            Antonio
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              handleFilterChange("nome", "all");
            }}
          >
            All
          </button>
          <div>
            <input
              onChange={(e) => {
                handleFilterChange("sposato", e.target.checked);
              }}
              type="checkbox"
              name="sposato"
              id="sposato"
            />
            <label htmlFor="sposato">Sposato</label>
          </div>
        </div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>Filter Cognome</h1>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleFilterChange("cognome", "guarino");
          }}
        >
          Guarino
        </button>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleFilterChange("cognome", "moccia");
          }}
        >
          Moccia
        </button>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleFilterChange("cognome", "all");
          }}
        >
          All
        </button>
      </div>
      <h1>{loading && "Loading...."}</h1>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
