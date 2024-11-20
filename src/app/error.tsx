"use client";

import Image from "next/image";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="w-full h-full content-center">
            <Image
                className="pixelated mx-auto"
                src="/img/pkmn/10-question-marks.png"
                width={128}
                height={128}
                alt="A question mark rolling right to left one time."
            />
            <h1 className="text-center text-2xl font-bold">Error</h1>
        </div>
    );
}
