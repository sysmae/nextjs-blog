import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'
import type {
  ChatCompletionMessageParam,
  ChatCompletionMessage,
} from 'openai/resources/index.mjs'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

type CompletionResponse = {
  messages: ChatCompletionMessageParam[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompletionResponse>,
) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  try {
    const messages = req.body.messages as ChatCompletionMessage[]

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            // '너는 키워드와 참고 자료를 바탕으로 json파일을 생성해주는 챗봇이야.\n 원하는 output의 형태는 이렇게 생겼어, 내용은 배끼지 말고 형식만 참고. 각 section에는 최소 500자의 글자를 포함해. 참고 자료를 링크할 때는 [이름](/https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:%EB%8C%80%EB%AC%B8)이런방식으로 자연스럽게 추가해줘 아래와 같은 형식으로 json파일을 생성해줘. ` "keyword": {\n\n "title": "",\n "description": "",\n "url": "",\n \n "sections": [\n {\n "title": "",\n "content": ""\n },\n {\n "title": "",\n "content": ""\n },\n {\n "title": "",\n "content": ""\n },\n {\n "title": "",\n "content": ""\n },\n {\n "title": "",\n "content": ""\n },\n ]\n },` ',
            '너는 코딩을 이해하기 쉽게 비유를 들어가며 설명해주는 챗봇이야',
        },
        ...messages,
      ],
      model: 'gpt-3.5-turbo',
    })

    messages.push(response.choices[0].message as ChatCompletionMessage)

    res.status(200).json({ messages })
  } catch (error) {
    console.error(error)
    res.status(500)
  }
}
