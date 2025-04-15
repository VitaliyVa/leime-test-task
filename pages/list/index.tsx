import DefaultLayout from "@/layouts/default";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Meme } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function ListPage() {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const storedMemes = JSON.parse(localStorage.getItem("memes") || "[]");
    setMemes(storedMemes);
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {memes.map((meme) => (
            <Card
              key={meme.id}
              className="flex flex-col items-center shadow-lg"
            >
              <CardHeader className="text-center">
                <h2 className="text-lg font-bold">{meme.title}</h2>
              </CardHeader>
              <CardBody className="flex flex-col items-center">
                <Image
                  src={meme.image}
                  alt={meme.title}
                  className="max-w-full max-h-40 object-contain rounded-lg"
                />
                <p className="mt-2 text-sm text-white-600">
                  {meme.likes} Лайків
                </p>
              </CardBody>
              <CardFooter>
                <Button
                  variant="light"
                  as="a"
                  href={meme.image}
                  target="_blank"
                >
                  Переглянути мем
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
