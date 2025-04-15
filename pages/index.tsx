"use client";

import { useState, useEffect } from "react";
import { Meme, loadMemes } from "@/lib/storage";
import MemeTable from "@/components/MemeTable";
import ModalEditMeme from "@/components/ModalEditMeme";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loaded = loadMemes();
    setMemes(loaded);
  }, []);

  const handleEditClick = (meme: Meme) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeme(null);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-10 px-4">
        <h1 className="text-4xl font-bold text-center">Таблиця мемів</h1>
        <MemeTable memes={memes} onEdit={handleEditClick} />
        <ModalEditMeme
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          meme={selectedMeme}
          allMemes={memes}
          setAllMemes={setMemes}
        />
      </section>
    </DefaultLayout>
  );
}
