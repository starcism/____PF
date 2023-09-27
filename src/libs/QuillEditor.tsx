'use client'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useMemo } from 'react'

interface IQuillEditor {
  quillRef: React.MutableRefObject<ReactQuill | null>
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
}

export default function QuillEditor({ quillRef, value, onChange, placeholder }: IQuillEditor) {
  // const imageHandler = () => {
  //   const input = document.createElement('input')
  //   input.setAttribute('type', 'file')
  //   input.setAttribute('accept', 'image/*')
  //   input.click()

  //   input.addEventListener('change', async () => {
  //     const file = input.files?.[0]

  //     if (file) {
  //       try {
  //         const imgUrl = await uploadImage(file)
  //         const editor = quillRef.current?.getEditor()

  //         if (editor) {
  //           const range = editor.getSelection()
  //           if (range) {
  //             editor.insertEmbed(range.index, 'image', imgUrl)
  //             const nextRange = quillRef.current?.getEditor().getSelection()
  //             if (nextRange) {
  //               nextRange.index++
  //               quillRef.current?.getEditor().setSelection(nextRange)
  //             }
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   })
  // }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ],
        // handlers: { image: imageHandler },
      },
    }),
    [],
  )

  return (
    <ReactQuill
      style={{ minHeight: '500px', maxHeight: '80vh', margin: '0 auto'}}
      ref={quillRef}
      onChange={onChange}
      modules={modules}
      value={value}
      placeholder={placeholder}
      theme="snow"
    />
  )
}
