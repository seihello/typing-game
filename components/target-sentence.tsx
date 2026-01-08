type Props = {
  value: string
}

export default function TargetSentence({ value }: Props) {
  return <div className="text-2xl font-bold">{value}</div>
}
