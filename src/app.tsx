import "react-toastify/dist/ReactToastify.css"

import { useCallback, useState } from "preact/hooks"
import { toast, ToastContainer } from "react-toastify"

import { Form } from "./components/Form"
import { Header } from "./components/Header"
import { Result } from "./components/Result"
import { generateAlt } from "./logics/generateAlt"
import { ResultType } from "./types"

export function App() {
  const [result, setResult] = useState<ResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = useCallback(
    async (apiKey: string, image: string, additional?: string) => {
      try {
        setIsLoading(true)
        const result = await generateAlt(apiKey, image, additional)
        setIsLoading(false)
        if (!result) return
        try {
          const json = JSON.parse(result.response)

          setResult({
            description: json.alt,
            needMoreInfo: json.status === "need more infomation",
            usedTokens: {
              prompt: result.usedTokens.prompt_tokens,
              completion: result.usedTokens.completion_tokens,
            },
          })
        } catch (e) {
          toast.error("説明の生成に失敗しました")
          console.error(e)
        }
      } catch (e) {
        toast.error("OpenAI APIのエラー: " + (e as { message: string }).message)
      }
    },
    []
  )

  return (
    <>
      <ToastContainer />
      <div className="mx-auto max-w-[850px] p-4">
        <Header />
        <main>
          <div>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col gap-2 md:w-1/2 md:border-r md:pr-4">
                <Form handleGenerate={handleGenerate} isLoading={isLoading} />
              </div>
              <div className="mt-8 md:mt-0 md:w-1/2 md:pl-4">
                <Result result={result} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
