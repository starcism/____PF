import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

export default function QuillReader({ value = undefined }: { value?: string }) {
  return <ReactQuill style={{ minHeight: '150px' }} value={value} theme="bubble" readOnly />
}
