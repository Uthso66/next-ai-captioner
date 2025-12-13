"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setCaption(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("/api/caption", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate caption");
      }

      setCaption(data.caption);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Image Caption Generator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {preview && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
            <Image
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!image || loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Generating Caption..." : "Generate Caption"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {caption && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Generated Caption:
          </h3>
          <p className="text-gray-700">{caption}</p>
        </div>
      )}
    </div>
  );
}
