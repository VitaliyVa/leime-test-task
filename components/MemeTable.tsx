"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

import { Button } from "@heroui/button";
import { Meme } from "@/lib/storage";
export default function MemeTable({
  memes,
  onEdit,
}: {
  memes: Meme[];
  onEdit: (meme: Meme) => void;
}) {
  return (
    <Table isStriped aria-label="List of memes">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Назва</TableColumn>
        <TableColumn>Кількість лайків</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {memes.map((meme) => (
          <TableRow key={meme.id}>
            <TableCell>{meme.id}</TableCell>
            <TableCell>{meme.title}</TableCell>
            <TableCell>{meme.likes}</TableCell>
            <TableCell>
              <Button onPress={() => onEdit(meme)} color="primary" size="sm">
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
