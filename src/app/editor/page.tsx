import dynamic from 'next/dynamic'
import PlanEditor from '@/components/PlanEditor'

export default function EditorPage() {
  return (
    <div className="h-full w-full">
      <PlanEditor />
    </div>
  )
}