export const Header = () => {
  return (
    <header className="my-4">
      <h1 className="text-4xl">Auto Alt Generator</h1>
      <p>
        <a
          href="https://platform.openai.com/"
          target="_blank"
          className="text-blue-600 underline hover:text-blue-800"
        >
          OpenAI API
        </a>
        を使用して、自動で画像の説明を生成します。
        <a
          href="https://github.com/avaice/a-ult"
          target="_blank"
          className="text-blue-600 underline hover:text-blue-800"
        >
          View on GitHub
        </a>
      </p>
    </header>
  )
}
