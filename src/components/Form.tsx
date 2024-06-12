import { useCallback, useRef, useState } from "preact/hooks"
import { toast } from "react-toastify"

export const Form = ({
  handleGenerate,
  isLoading,
}: {
  handleGenerate: (apiKey: string, image: string, additional?: string) => void
  isLoading: boolean
}) => {
  const [dragging, setDragging] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [additional, setAdditional] = useState("")
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai-key") || "")
  const imgInputRef = useRef<HTMLInputElement>(null)

  const readImage = useCallback((file: File) => {
    const ext = file.name.split(".").pop()
    if (
      !ext ||
      (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "webp")
    ) {
      return toast.error("画像ファイルを選択してください")
    }

    try {
      // 選択画像を縦横比を保ちつつ横幅256pxにリサイズし、URLに変換
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      const image = new Image()
      image.src = URL.createObjectURL(file)
      image.onload = () => {
        canvas.width = 640
        canvas.height = (640 * image.height) / image.width
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        setImage(canvas.toDataURL("image/jpeg"))
      }
    } catch (e) {
      toast.error("画像の読み込みに失敗しました")
      console.error(e)
    }
  }, [])

  return (
    <>
      <div>
        <h2 className="mb-2 text-2xl font-semibold">説明の生成</h2>
        <div
          onDragOver={(e) => {
            if (isLoading) return
            e.preventDefault()
            e.stopPropagation()
            if (e.dataTransfer) e.dataTransfer.dropEffect = "copy"
            setDragging(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setDragging(false)
          }}
          onDrop={(e) => {
            if (isLoading) return
            e.preventDefault()
            setImage(null)
            setDragging(false)

            if (!e.dataTransfer || e.dataTransfer.files.length === 0) return
            readImage(e.dataTransfer.files[0])
          }}
          className={`relative aspect-[4/3] w-full max-w-[400px] select-none ${
            dragging ? "bg-gray-100" : ""
          }`}
        >
          {image && !dragging ? (
            <>
              <img
                src={image}
                className="size-full animate-fade rounded-md bg-gray-100 object-contain"
              />
              {!isLoading && (
                <button
                  className="absolute right-2 top-2 rounded-md bg-black/70 p-1 text-white hover:bg-black/80"
                  onClick={() => {
                    setImage(null)
                  }}
                  disabled={isLoading}
                >
                  <img src="/close.svg" alt="選択した画像をクリア" />
                </button>
              )}
            </>
          ) : (
            <div className="flex size-full flex-col items-center justify-center rounded-md border">
              <span>ここに画像をドロップ</span>
              <input
                className="hidden"
                type="file"
                accept=".jpeg,.jpg,.png,.webp"
                ref={imgInputRef}
                onChange={(e) => {
                  if (!e.currentTarget.files) return
                  setImage(null)
                  readImage(e.currentTarget.files[0])
                }}
              />
              <button
                className="text-blue-600 underline hover:text-blue-800"
                onClick={() => {
                  imgInputRef.current?.click()
                }}
              >
                または選択
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-2xl font-semibold">追加の情報</h2>
        <textarea
          className={`w-full  rounded-md border p-1`}
          rows={5}
          value={additional}
          onChange={(e) => {
            setAdditional(e.currentTarget.value)
          }}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex gap-2">
          OpenAI API Key:
          <input
            autoComplete="off"
            type="password"
            className="grow rounded-md border p-1 text-xs"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.currentTarget.value)
            }}
            placeholder="sk-*********"
            disabled={isLoading}
          />
        </label>
        <button
          className={`block w-full rounded-md border px-4 py-2 text-center hover:bg-gray-100 active:bg-gray-200${
            isLoading ? " bg-gray-300 hover:bg-gray-300" : ""
          }`}
          onClick={() => {
            if (!apiKey) {
              return toast.error("API Keyを入力してください")
            }
            if (!image) {
              return toast.error("画像を選択してください")
            }
            localStorage.setItem("openai-key", apiKey)
            handleGenerate(
              apiKey,
              image,
              additional === "" ? undefined : additional
            )
          }}
          disabled={isLoading}
        >
          生成
        </button>
      </div>
    </>
  )
}
