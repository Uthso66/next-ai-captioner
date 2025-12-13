import ImageUploader from "./components/ImageUploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🧠 AI Image Captioner
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Upload an image and let AI describe it in a single, smart sentence.
      </p>
      <ImageUploader />
      <footer className="mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} | Built with Next.js 15 + OpenAI
      </footer>
    </main>
  );
}
