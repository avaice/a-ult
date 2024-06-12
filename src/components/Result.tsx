import { ResultType } from "../types"
import { Spinner } from "./Spinner"

export const Result = ({
  result,
  isLoading,
}: {
  result: ResultType | null
  isLoading: boolean
}) => {
  return (
    <>
      <div>
        <h2 className="mb-2 text-2xl font-semibold">生成された説明</h2>
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>
            {result?.needMoreInfo && (
              <div className="flex items-center gap-2 rounded-md bg-green-600 p-3 text-sm text-white">
                <img src="/info.svg" className="inline size-6" alt="" />
                <span>追加の情報があれば、より適切な説明になりますよ！</span>
              </div>
            )}
            {result?.description ? (
              <p className="rounded-md bg-gray-100 p-4 px-2">
                {result?.description}
              </p>
            ) : (
              <p>画像を選択して、生成ボタンを押してください。</p>
            )}
            {result && (
              <div className="my-2">
                <h3 className="text-sm font-semibold">
                  使用トークン数 (金額は目安)
                </h3>
                <div className="flex gap-2">
                  <div>
                    <span>プロンプト:</span>
                    <span className="text-sm">
                      {result?.usedTokens.prompt} ($
                      {(0.000005 * result.usedTokens.prompt).toFixed(5)})
                    </span>
                  </div>
                  <div>
                    <span>生成:</span>
                    <span className="text-sm">
                      {result?.usedTokens.completion} ($
                      {(0.000015 * result.usedTokens.completion).toFixed(5)})
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
