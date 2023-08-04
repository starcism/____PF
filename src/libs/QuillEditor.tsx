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
const uploadImage = async (file: File) => {
  try {
    const url = 'YOUR_LAMBDA_ENDPOINT_URL' // 실제 Lambda 함수의 엔드포인트 URL로 대체되어야 합니다.
    const formData = new FormData()
    formData.append('image', file)
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    const imageUrl = data.imageUrl
    console.log('Uploaded image URL:', imageUrl)
    return imageUrl
  } catch (error) {
    console.log('Image upload failed:', error)
    throw error
  }
}

export default function QuillEditor({ quillRef, value, onChange, placeholder }: IQuillEditor) {
  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.addEventListener('change', async () => {
      const file = input.files?.[0]

      if (file) {
        try {
          const imgUrl = await uploadImage(file)
          const editor = quillRef.current?.getEditor()

          if (editor) {
            const range = editor.getSelection()
            if (range) {
              editor.insertEmbed(range.index, 'image', imgUrl)
              const nextRange = quillRef.current?.getEditor().getSelection()
              if (nextRange) {
                nextRange.index++
                quillRef.current?.getEditor().setSelection(nextRange)
              }
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [['bold', 'italic', 'underline', 'strike'], [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]],
        // handlers: { image: imageHandler },
      },
    }),
    [],
  )

  return <ReactQuill ref={quillRef} onChange={onChange} modules={modules} value={value} placeholder={placeholder} theme="snow" />
}
