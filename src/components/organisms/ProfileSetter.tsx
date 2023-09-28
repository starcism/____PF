'use client'

import Image from 'next/image'
import UserIcon, { ChangableProfileImage } from '../atoms/UserIcon'
import { useRef, useState } from 'react'
import { SmallLoadingSpinner } from '../atoms/LoadingSpinner'
import checkEnvironment from '@/libs/checkEnvironment'

interface Props {
  accessToken: string
  nickname: string
  setNickname: React.Dispatch<React.SetStateAction<string | null>>
  profile_image: string
  setProfileImage: React.Dispatch<React.SetStateAction<string>>
}

const regex = /^[a-zA-Z0-9가-힣]+$/
const inputRegex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+$/
const NICKNAME_MIN_LENGTH = 2
const NICKNAME_MAX_LENGTH = 12

export default function ProfileSetter({ accessToken, nickname, setNickname, profile_image, setProfileImage }: Props) {
  const [onInput, setOnInput] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<string>(nickname)
  const nicknameRef = useRef<HTMLInputElement>(null)
  const PreventKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //텍스트 영역 포커스 이동 방지
    if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault()
    }
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\s| /gi, '')
    const newNickname = nicknameRef.current?.value.trim() ?? ''
    setValue(inputValue)

    const isValid = inputRegex.test(inputValue)
    const isCanSubmit = regex.test(inputValue)
    if (inputValue.length < NICKNAME_MIN_LENGTH) {
      setAlertMessage(`닉네임은 ${NICKNAME_MIN_LENGTH}글자 이상이어야 해요`)
      setCanSubmit(false)
    } else if (inputValue.length > NICKNAME_MAX_LENGTH) {
      setAlertMessage(`닉네임은 ${NICKNAME_MAX_LENGTH}글자 이하여야 해요`)
      setCanSubmit(false)
    } else if (!isValid) {
      setAlertMessage('닉네임은 한글, 영어, 숫자만 허용해요')
      setCanSubmit(false)
    } else if (inputValue === nickname) {
      setAlertMessage('')
      setCanSubmit(false)
    } else if (!isCanSubmit) {
      setCanSubmit(false)
    } else {
      setAlertMessage('')
      if (!canSubmit) {
        setCanSubmit(true)
      }
    }
  }

  const changeProfileImage = async (unit: string, close: () => void) => {
    try {
      const res = await fetch(checkEnvironment().concat(`/api/user/icon`), {
        method: 'POST',
        body: JSON.stringify({ unit: unit }),
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      if (res.ok) {
        const { icon } = await res.json()
        setProfileImage(icon)
        close()
      }
    } catch (error) {}
  }

  const submitNickname = async () => {
    if (loading) {
      return
    }

    setLoading(true)
    const newNickname = nicknameRef.current?.value.trim() ?? ''

    const isValid = regex.test(newNickname)

    if (nickname === newNickname) {
      setAlertMessage('동일한 닉네임으로 변경할 수 없어요')
      setLoading(false)
      return
    }
    if (!isValid) {
      setAlertMessage('닉네임은 한글, 영어, 숫자만 허용해요')
      setLoading(false)
      return
    }
    if (newNickname.length < 2) {
      setAlertMessage(`닉네임은 ${NICKNAME_MIN_LENGTH}글자 이상이어야 해요`)
      setLoading(false)
      return
    }
    if (newNickname.length > 12) {
      setAlertMessage(`닉네임은 ${NICKNAME_MAX_LENGTH}글자 이하여야 해요`)
      setLoading(false)
      return
    }

    try {
      const res = await fetch(checkEnvironment().concat('/api/user'), {
        method: 'POST',
        body: JSON.stringify({ nickname: newNickname, pre: nickname }),
        headers: {
          Authorization: `${accessToken}`,
          // "Content-Type": "multipart/form-data",
        },
      })

      if (res.status === 200) {
        setOnInput(false)
        setNickname(newNickname)
      } else if (res.status === 401) {
        setAlertMessage(`로그인 정보가 만료되었어요`)
      } else {
        const { error } = await res.json()
        setAlertMessage(`${error}`)
      }
    } catch (error) {
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full h-full bg-white">
      <div className="flex w-full">
        <div className="flex items-center w-full">
          <ChangableProfileImage size="60" profile_image={profile_image} onClick={changeProfileImage} />
          {onInput && (
            <div className="ml-4 relative w-full">
              <input
                className="flex w-full max-w-[240px] border-[1.5px] shadow-tur shadow-semigold border-solid border-turquoise rounded-[10px] py-[6px] px-[8px] h-auto outline-none resize-none text-[14px] scrollbar-hide"
                placeholder=""
                maxLength={NICKNAME_MAX_LENGTH + 1}
                onKeyDown={PreventKeyDown}
                value={value}
                onChange={(e) => handleInput(e)}
                ref={nicknameRef}
              />
              <div className="absolute -bottom-7 left-1 flex">
                {loading ? (
                  <SmallLoadingSpinner size="26px" />
                ) : (
                  <>
                    {canSubmit ? (
                      <button type="button" onClick={() => submitNickname()} className="flex items-center justify-center w-[26px] h-[26px]">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                          <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                            <path
                              transform="scale(12,12)"
                              d="M20.93097,6.60012c0.16075,0.37985 0.07183,0.81942 -0.22393,1.10691l-11,11c-0.39053,0.39037 -1.02353,0.39037 -1.41406,0l-4,-4c-0.26124,-0.25082 -0.36647,-0.62327 -0.27511,-0.97371c0.09136,-0.35044 0.36503,-0.62411 0.71547,-0.71547c0.35044,-0.09136 0.72289,0.01388 0.97371,0.27511l3.29297,3.29297l10.29297,-10.29297c0.18112,-0.18641 0.4277,-0.29499 0.6875,-0.30273c0.41228,-0.01216 0.78974,0.23004 0.9505,0.60988z"
                              id="strokeMainSVG"
                              fill="#85b8cb"
                              stroke="#85b8cb"
                              strokeLinejoin="round"
                            ></path>
                            <g transform="scale(12,12)" fill="#85b8cb" stroke="none" strokeLinejoin="miter">
                              <path d="M19.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-10.29297,10.29297l-3.29297,-3.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l4,4c0.39053,0.39037 1.02353,0.39037 1.41406,0l11,-11c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
                            </g>
                          </g>
                        </svg>
                      </button>
                    ) : (
                      <button type="button" onClick={() => {}} className="flex items-center justify-center w-[26px] h-[26px] cursor-default">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                          <g fill="none" fillRule="nonzero" stroke="none" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                            <path
                              transform="scale(12,12)"
                              d="M20.93097,6.60012c0.16075,0.37985 0.07183,0.81942 -0.22393,1.10691l-11,11c-0.39053,0.39037 -1.02353,0.39037 -1.41406,0l-4,-4c-0.26124,-0.25082 -0.36647,-0.62327 -0.27511,-0.97371c0.09136,-0.35044 0.36503,-0.62411 0.71547,-0.71547c0.35044,-0.09136 0.72289,0.01388 0.97371,0.27511l3.29297,3.29297l10.29297,-10.29297c0.18112,-0.18641 0.4277,-0.29499 0.6875,-0.30273c0.41228,-0.01216 0.78974,0.23004 0.9505,0.60988z"
                              id="strokeMainSVG"
                              fill="#dddddd"
                              stroke="#dddddd"
                              strokeLinejoin="round"
                            ></path>
                            <g transform="scale(12,12)" fill="#dddddd" stroke="none" strokeLinejoin="miter">
                              <path d="M19.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-10.29297,10.29297l-3.29297,-3.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l4,4c0.39053,0.39037 1.02353,0.39037 1.41406,0l11,-11c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
                            </g>
                          </g>
                        </svg>
                      </button>
                    )}
                    <button type="button" onClick={() => setOnInput(false)} className="flex items-center justify-center w-[26px] h-[26px] ml-[4px]">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                        <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                          <path
                            transform="scale(12,12)"
                            d="M5.70703,4.29297l6.29297,6.29297l6.29297,-6.29297c0.18112,-0.18641 0.4277,-0.29499 0.6875,-0.30273c0.41228,-0.01216 0.78974,0.23004 0.9505,0.60988c0.16075,0.37985 0.07183,0.81942 -0.22393,1.10691l-6.29297,6.29297l6.29297,6.29297c0.26124,0.25082 0.36648,0.62327 0.27512,0.97371c-0.09136,0.35044 -0.36503,0.62411 -0.71547,0.71547c-0.35044,0.09136 -0.72289,-0.01388 -0.97371,-0.27512l-6.29297,-6.29297l-6.29297,6.29297c-0.25082,0.26124 -0.62327,0.36647 -0.97371,0.27511c-0.35044,-0.09136 -0.62411,-0.36503 -0.71547,-0.71547c-0.09136,-0.35044 0.01388,-0.72289 0.27511,-0.97371l6.29297,-6.29297l-6.29297,-6.29297c-0.29161,-0.28381 -0.38219,-0.71601 -0.22907,-1.09303c0.15312,-0.37701 0.51941,-0.62366 0.92633,-0.62377c0.27,0.00002 0.52853,0.1092 0.7168,0.30273z"
                            id="strokeMainSVG"
                            fill="#f87171"
                            stroke="#f87171"
                            strokeLinejoin="round"
                          ></path>
                          <g transform="scale(12,12)" fill="#f87171" stroke="none" strokeLinejoin="miter">
                            <path d="M4.99023,3.99023c-0.40692,0.00011 -0.77321,0.24676 -0.92633,0.62377c-0.15312,0.37701 -0.06255,0.80921 0.22907,1.09303l6.29297,6.29297l-6.29297,6.29297c-0.26124,0.25082 -0.36647,0.62327 -0.27511,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27511l6.29297,-6.29297l6.29297,6.29297c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-6.29297,-6.29297l6.29297,-6.29297c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-6.29297,6.29297l-6.29297,-6.29297c-0.18827,-0.19353 -0.4468,-0.30272 -0.7168,-0.30273z"></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                    <span className="text-[12px] text-red-500 h-[26px] flex items-center ml-[4px] overflow-y-hidden text-ellipsis">{alertMessage}</span>
                  </>
                )}
              </div>
            </div>
          )}
          {!onInput && (
            <>
              <span className="font-sans h-[20px] ml-[20px] text-[16px] weight-500 overflow-y-hidden text-ellipsis">{nickname}</span>
              <button type="button" onClick={() => setOnInput(true)} className="text-turquoise w-[24px] h-[24px] ml-[2px]">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 48 48">
                  <path
                    fill="none"
                    stroke="#85b8cb"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M18.4,21.8L32.1,8.1c2.3-2.3,6-2.1,8.1,0.4c1.8,2.2,1.5,5.5-0.5,7.5l-2.8,2.8"
                  ></path>
                  <path
                    fill="none"
                    stroke="#85b8cb"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M32.5,23.3L17.9,37.8c-0.4,0.4-0.8,0.6-1.3,0.8L6.5,41.5l2.9-10.1c0.1-0.5,0.4-0.9,0.8-1.3l3.7-3.7"
                  ></path>
                  <line
                    x1="29.1"
                    x2="36.9"
                    y1="11.1"
                    y2="18.9"
                    fill="none"
                    stroke="#85b8cb"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  ></line>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
