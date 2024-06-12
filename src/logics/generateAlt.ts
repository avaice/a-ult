import OpenAI from "openai"

const prompt = `
私はWebデザイナーです。imgタグを使ってホームページで添付の画像を紹介しようと思ったのですが、alt属性に何を書けば良いかわかりません。
適切な例を以下のフォーマットで紹介してください。また、適切なaltを生成するために必要な情報があれば、以下のフォーマットで返答してください。

altを生成できた場合
{
"status":"ok",
"alt":画像の説明
}

追加の情報があるとより適切なaltを生成できる場合
{
"status":"need more infomation",
"alt":画像の説明
}
`.trim()

export const generateAlt = async (
  apiKey: string,
  image: string,
  additional?: string
) => {
  const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true })
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          additional
            ? { type: "text", text: `追加の情報: ${additional}` }
            : { type: "text", text: "" },
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      },
    ],
  })

  if (!response.choices[0].message.content || !response.usage) return false

  return {
    response: response.choices[0].message.content,
    usedTokens: response.usage,
  }
}
