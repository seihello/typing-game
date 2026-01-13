import { Result } from "@/types/result"

type Props = {
  result: Result
}

export default function ResultView({ result }: Props) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-y-4">
      <table className="[&_td]:px-4 [&_td]:py-2">
        <tr>
          <td className="font-semibold">入力した文字数</td>
          <td className="text-2xl font-bold">{result.wordCount}字</td>
        </tr>
        <tr>
          <td className="font-semibold">かかった時間</td>
          <td className="text-2xl font-bold">
            {(result.elapsedTime / 1000).toFixed(1)}秒
          </td>
        </tr>
        <tr>
          <td className="font-semibold">平均タイプ数</td>
          <td className="text-2xl font-bold">
            {result.elapsedTime > 0
              ? (result.wordCount / (result.elapsedTime / 1000)).toFixed(1)
              : ""}
            文字 / 秒
          </td>
        </tr>
      </table>
      <div className="flex flex-col items-center gap-x-2">
        <h2 className="font-semibold">総合スコア</h2>
        <p className="text-6xl font-bold">C</p>
      </div>
    </div>
  )
}
