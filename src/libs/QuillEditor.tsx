'use client'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useMemo } from 'react'

interface IQuillEditor {
  quillRef: React.MutableRefObject<ReactQuill | null>
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
}

export default function QuillEditor({quillRef, value, onChange, placeholder }: IQuillEditor) {
  
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [['bold', 'italic', 'underline', 'strike'], [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], ['image']],
        handlers: {},
      },
    }),
    [],
  )
  
  return (
    <ReactQuill
      ref={quillRef}
      onChange={onChange}
      modules={modules}
      value={value}
      placeholder={placeholder}
      theme="snow"
    />
  )
}