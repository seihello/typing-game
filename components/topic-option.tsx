import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckboxProps } from "@radix-ui/react-checkbox"

type Props = CheckboxProps & { children: React.ReactNode }

export default function TopicOption({ children, ...props }: Props) {
  return (
    <div className="flex w-40 items-center gap-x-2 rounded-md border bg-white p-1.5 text-primary">
      <Checkbox id="all" className="size-5" {...props} />
      <Label
        htmlFor={props.id}
        className="text-md grow whitespace-nowrap font-semibold hover:cursor-pointer"
      >
        {children}
      </Label>
    </div>
  )
}
