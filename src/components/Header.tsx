export const Header = () => {
  return (
    <header className="my-4">
      <h1 className="text-4xl">Auto Alt Generator</h1>
      <p>
        OpenAI APIを使用して、自動で画像の説明を生成します。{" "}
        <a
          href="#"
          target="_blank"
          className="text-blue-500 underline hover:text-blue-800"
        >
          View on GitHub
        </a>
      </p>
    </header>
  )
}
