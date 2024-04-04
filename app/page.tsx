"use client";

import { useState } from "react";
import styles from "./page.module.css";

type inputType = {
  first: number;
  second: number;
  sum: number;
  id: number;
};

export default function Home() {
  const [inputs, setInputs] = useState<inputType[]>([
    {
      first: 0,
      second: 0,
      sum: 0,
      id: 1,
    },
  ]);
  const [rowNum, setRowNum] = useState(1);

  const handleAddRow = () => {
    const newRowNum = rowNum + 1;
    setRowNum(newRowNum);
    let newRow = {
      first: 0,
      second: 0,
      sum: 0,
      id: newRowNum,
    };
    setInputs((prevState) => [...prevState, newRow]);
  };

  const handleChangeOne = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    pos: string
  ) => {
    const val = parseInt(e.target.value);
    const updatedInputs = inputs.map((row) => {
      if (row.id === id) {
        const newRow = { ...row };
        if (pos === "first") newRow.first = val;
        else if (pos === "second") newRow.second = val;
        newRow.sum = newRow.first + newRow.second;
        return newRow;
      }
      return row;
    });
    setInputs(updatedInputs);
  };

  const calculateVertical = (line: string) => {
    let columnSum = 0;
    for (let i = 0; i < inputs.length; i += 1) {
      if (line === "first") {
        columnSum += inputs[i].first;
      } else if (line === "second") {
        columnSum += inputs[i].second;
      } else if (line === "sum") {
        columnSum += inputs[i].sum;
      }
    }
    return columnSum;
  };

  return (
    <div className={styles.conatiner}>
      <button onClick={handleAddRow}>Add new row</button>
      {inputs.map((row) => (
        <div key={row.id}>
          <input
            type="number"
            defaultValue={row.first}
            onChange={(e) => handleChangeOne(e, row.id, "first")}
          ></input>
          <input
            type="number"
            defaultValue={row.second}
            onChange={(e) => handleChangeOne(e, row.id, "second")}
          ></input>
          <input defaultValue={row.sum} value={row.sum}></input>
        </div>
      ))}
      <div>
        <input defaultValue={calculateVertical("first")}></input>
        <input defaultValue={calculateVertical("second")}></input>
        <input defaultValue={calculateVertical("sum")}></input>
      </div>
    </div>
  );
}
