"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
import { Meme, saveMemes } from "@/lib/storage";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  meme: Meme | null;
  allMemes: Meme[];
  setAllMemes: (memes: Meme[]) => void;
}

export default function ModalEditMeme({
  isOpen,
  onClose,
  meme,
  allMemes,
  setAllMemes,
}: Props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [formImage, setFormImage] = useState("");
  const [likes, setLikes] = useState(0);
  const [errors, setErrors] = useState<{
    title?: string;
    image?: string;
    likes?: string;
  }>({});

  useEffect(() => {
    if (meme) {
      setTitle(meme.title);
      setImage(meme.image); 
      setFormImage(meme.image); 
      setLikes(meme.likes);
      setErrors({});
    }
  }, [meme]);

  const validate = () => {
    const newErrors: typeof errors = {};
  
    if (title.trim().length < 3 || title.trim().length > 100) {
      newErrors.title = "Назва має бути від 3 до 100 символів";
    }
  
    const isValidHttpUrl = /^https?:\/\/.*\.jpg$/.test(formImage);
    const isLocalMemPath = formImage.startsWith("/mems/") && formImage.endsWith(".jpg");
  
    if (!isValidHttpUrl && !isLocalMemPath) {
      newErrors.image = "Посилання має бути .jpg або локальний шлях /mems/...";
    }
  
    const isValidUrl = (url: string) => {
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
      return urlPattern.test(url);
    };
  
    if (isValidHttpUrl && !isValidUrl(formImage)) {
      newErrors.image = "Некоректний URL";
    }
  
    if (!Number.isInteger(likes) || likes < 0 || likes > 99) {
      newErrors.likes = "Лайки повинні бути цілим числом від 0 до 99";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSave = () => {
    if (!meme || !validate()) return;

    const updated = allMemes.map((m) =>
      m.id === meme.id ? { ...m, title, image: formImage, likes } : m
    );
    setAllMemes(updated);
    saveMemes(updated);
    setImage(formImage); 
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Редагування мема</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          {image && (
            <div className="flex justify-center">
              <img
                src={image}
                alt="Мем"
                className="max-h-60 rounded-xl object-contain"
              />
            </div>
          )}

          <Input label="ID" isReadOnly value={meme?.id.toString() || ""} />

          <Input
            label="Назва"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isInvalid={!!errors.title}
            errorMessage={errors.title}
            isRequired
          />

          <Input
            label="Картинка (URL або /utils/...)"
            value={formImage}
            onChange={(e) => setFormImage(e.target.value)}
            isInvalid={!!errors.image}
            errorMessage={errors.image}
            isRequired
          />

          <Input
            label="Кількість лайків"
            type="number"
            value={likes.toString()}
            onChange={(e) => setLikes(Number(e.target.value))}
            isInvalid={!!errors.likes}
            errorMessage={errors.likes}
            isRequired
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Відмінити
          </Button>
          <Button color="primary" onPress={handleSave}>
            Зберегти
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
