"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const BUCKET = "install-screenshots";
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

// 파일명에서 확장자만 안전하게 추출 (없으면 png로 간주)
function getExtension(fileName) {
  const match = /\.([a-zA-Z0-9]+)$/.exec(fileName || "");
  return match ? match[1].toLowerCase() : "png";
}

// 수강생이 폰에 설치한 PWA 앱 화면 캡쳐를 올리는 위젯.
// 폰 사진함에서 스크린샷을 고르면(선택 즉시) Supabase Storage(공개 버킷)에 업로드하고
// students.install_screenshot_url을 갱신한다 → 강사 관제탑에 실시간 반영.
export default function ScreenshotUpload({ studentId, initialUrl }) {
  const [imageUrl, setImageUrl] = useState(initialUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    // 같은 파일을 다시 선택해도 onChange가 발생하도록 input 값을 비운다
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 올릴 수 있어요. (jpg, png 등)");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("이미지가 너무 큽니다. 5MB 이하로 올려주세요.");
      return;
    }
    if (!studentId) {
      setError("수강생 정보를 찾을 수 없어 업로드할 수 없습니다.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const path = `${studentId}-${Date.now()}.${getExtension(file.name)}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: true, contentType: file.type });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const publicUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

      const { error: updateError } = await supabase
        .from("students")
        .update({ install_screenshot_url: publicUrl, updated_at: new Date().toISOString() })
        .eq("id", studentId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setImageUrl(publicUrl);
    } catch (err) {
      console.error("설치 화면 업로드 실패:", err);
      setError("업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="brutal-card bg-brutal-white p-6 flex flex-col items-center gap-4">
      <h3 className="text-xl font-black text-center">📸 설치 화면 인증</h3>
      <p className="font-semibold text-sm text-center text-brutal-black/70">
        폰에 설치한 앱을 실행하고, 그 화면을 캡쳐해서 올려주세요.
      </p>

      {imageUrl && (
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={imageUrl}
            alt="설치 화면 캡쳐 미리보기"
            className="max-h-56 w-auto border-4 border-brutal-black"
          />
        </a>
      )}

      <label
        className={`brutal-btn bg-brutal-black text-brutal-white px-8 py-4 text-lg text-center w-full ${
          isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isUploading ? "올리는 중..." : imageUrl ? "다시 올리기" : "📸 사진 전송하기"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </label>

      {imageUrl && !error && (
        <p className="font-black text-center">✅ 전송 완료! 강사님 관제탑에 반영됩니다 🎉</p>
      )}
      {error && <p className="font-bold text-sm text-center text-red-700">{error}</p>}
    </div>
  );
}
