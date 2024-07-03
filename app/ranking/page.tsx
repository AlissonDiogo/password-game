"use client";
import React, { useEffect, useState } from "react";
import styles from "./ranking.module.css";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const Ranking: React.FC = () => {
  const [rankingData, setRankingData] = useState<string[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/ranking/api");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const data = await response.json();
        setRankingData(data.rankingData);
      } catch (error) {
        console.log({ error });
      }
    }

    fetchData();
  }, []);

  const getTableRow = () => {
    let itens: JSX.Element[] = [];
    rankingData.forEach((item, index) => {
      const valueSplited = item.split(";");
      const participantName = valueSplited[0];
      const points = valueSplited[1];
      itens.push(
        <TableRow key={index}>
          <TableCell className={styles.tableCell}>{participantName}</TableCell>
          <TableCell className={styles.tableCell}>{points}</TableCell>
        </TableRow>
      );
    });
    return itens;
  };

  return (
    <div className={styles.rankingContainer}>
      <div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>PARTICIPANTE</TableColumn>
            <TableColumn>PONTUAÇÃO</TableColumn>
          </TableHeader>
          <TableBody>{getTableRow()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Ranking;
