'use client'

import Image from 'next/image'
import { ProfileImageModal } from './ModalContainer'

interface Props {
  size?: string
  imgUrl?: string
  profile_image: string
}

interface ProfileImageProps extends Props {
  onClick: (unit: string, close: () => void) => void
}

export default function UserIcon({ size = '36', profile_image = 'default' }: Props) {
  return (
    <>
      <div
        className={`min-w-[${size}px] w-[${size}px] h-[${size}px] min-h-[${size}px] max-w-[${size}px] max-h-[${size}px] rounded-full flex items-center justify-center`}
      >
        {profile_image === 'default' ? (
          <div className={`w-[${size}] h-[${size}] rounded-full aspect-square select-none`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              width="24.000000pt"
              height="24.000000pt"
              viewBox="0 0 446.000000 568.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform="translate(0.000000,568.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M975 5161 c-83 -23 -131 -59 -173 -130 -24 -40 -27 -56 -27 -132 0 -78 3 -90 30 -134 40 -65 101 -111 170 -126 30 -7 55 -15 55 -19 0 -31 -119 -151 -193 -194 -65 -38 -195 -83 -266 -91 -56 -6 -61 -9 -61 -31 0 -21 4 -24 40 -24 88 0 203 -63 253 -139 58 -88 58 -82 55 -862 l-3 -714 -26 -56 c-49 -105 -142 -170 -261 -184 -48 -5 -58 -10 -58 -26 0 -18 12 -19 420 -19 231 0 420 -4 420 -8 0 -5 -21 -32 -46 -62 -99 -117 -188 -286 -231 -445 -25 -90 -27 -116 -27 -255 1 -165 10 -218 61 -355 98 -261 341 -485 628 -579 145 -47 229 -59 395 -60 160 0 189 4 372 54 336 92 643 344 796 653 60 123 118 336 95 350 -5 3 -63 20 -128 37 -159 42 -189 49 -192 46 -2 -2 4 -41 12 -87 39 -222 0 -445 -107 -615 -53 -85 -168 -192 -248 -231 -131 -64 -150 -68 -330 -68 -161 1 -167 2 -255 34 -113 42 -171 71 -260 131 -95 64 -110 83 -109 134 1 37 12 55 103 171 57 72 115 146 129 165 15 19 117 150 227 291 110 140 245 313 300 384 55 70 127 162 160 204 33 42 83 105 111 141 152 196 496 636 550 705 368 468 527 676 549 717 146 268 -18 594 -326 649 -87 15 -183 0 -269 -42 -74 -38 -132 -100 -330 -355 -85 -109 -188 -242 -230 -295 -41 -52 -109 -139 -150 -192 -41 -54 -81 -96 -88 -95 -22 5 -391 737 -392 775 0 22 9 43 29 65 28 32 32 33 121 37 87 3 91 4 88 25 l-3 21 -780 2 c-921 3 -827 1 -795 15 204 91 277 136 366 229 108 113 154 211 154 326 -1 147 -98 255 -242 267 -29 3 -66 1 -83 -3z m608 -892 c75 -21 107 -63 233 -312 64 -128 154 -304 199 -392 188 -365 445 -873 445 -878 0 -3 -73 -7 -162 -10 -177 -5 -239 -14 -367 -53 -158 -48 -356 -155 -460 -250 l-42 -37 -39 18 c-51 23 -124 101 -153 162 l-22 48 0 730 0 730 23 57 c37 88 140 177 222 191 47 8 85 7 123 -4z m1905 -210 c79 -35 158 -114 198 -194 26 -55 29 -69 29 -166 0 -156 34 -102 -498 -780 -92 -118 -176 -224 -186 -236 -41 -49 -109 -52 -150 -9 -34 36 -270 504 -282 559 -14 62 -4 144 24 199 31 60 392 522 445 569 114 100 278 123 420 58z m-1246 -1535 c215 -65 404 -180 423 -256 10 -40 -11 -74 -200 -314 -93 -119 -193 -246 -222 -282 -48 -63 -118 -152 -351 -452 -119 -153 -142 -177 -177 -186 -64 -16 -133 56 -233 246 -158 300 -176 626 -50 889 43 90 62 116 132 187 67 66 98 89 167 121 81 38 139 58 204 67 61 9 255 -3 307 -20z" />
              </g>
            </svg>
          </div>
        ) : (
          <Image
            draggable={false}
            alt={`profile_${profile_image}`}
            src={`/images/profile_${profile_image}.jpeg`}
            width={parseInt(size, 10)}
            height={parseInt(size, 10)}
            className={`w-[${size}] h-[${size}] aspect-square rounded-full select-none`}
          />
        )}
      </div>
    </>
  )
}

export function ChangableProfileImage({ size = '60', profile_image = 'default', onClick }: ProfileImageProps) {
  return (
    <>
      <div className="relative">
        <div
          className={`min-w-[${size}px] w-[${size}px] h-[${size}px] min-h-[${size}px] max-w-[${size}px] max-h-[${size}px] aspect-square rounded-full flex items-center justify-center`}
        >
          {profile_image === 'default' ? (
            <div className={`w-[${size}] h-[${size}] rounded-full select-none`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                width="60.000000pt"
                height="60.000000pt"
                viewBox="0 0 446.000000 568.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g transform="translate(0.000000,568.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                  <path d="M975 5161 c-83 -23 -131 -59 -173 -130 -24 -40 -27 -56 -27 -132 0 -78 3 -90 30 -134 40 -65 101 -111 170 -126 30 -7 55 -15 55 -19 0 -31 -119 -151 -193 -194 -65 -38 -195 -83 -266 -91 -56 -6 -61 -9 -61 -31 0 -21 4 -24 40 -24 88 0 203 -63 253 -139 58 -88 58 -82 55 -862 l-3 -714 -26 -56 c-49 -105 -142 -170 -261 -184 -48 -5 -58 -10 -58 -26 0 -18 12 -19 420 -19 231 0 420 -4 420 -8 0 -5 -21 -32 -46 -62 -99 -117 -188 -286 -231 -445 -25 -90 -27 -116 -27 -255 1 -165 10 -218 61 -355 98 -261 341 -485 628 -579 145 -47 229 -59 395 -60 160 0 189 4 372 54 336 92 643 344 796 653 60 123 118 336 95 350 -5 3 -63 20 -128 37 -159 42 -189 49 -192 46 -2 -2 4 -41 12 -87 39 -222 0 -445 -107 -615 -53 -85 -168 -192 -248 -231 -131 -64 -150 -68 -330 -68 -161 1 -167 2 -255 34 -113 42 -171 71 -260 131 -95 64 -110 83 -109 134 1 37 12 55 103 171 57 72 115 146 129 165 15 19 117 150 227 291 110 140 245 313 300 384 55 70 127 162 160 204 33 42 83 105 111 141 152 196 496 636 550 705 368 468 527 676 549 717 146 268 -18 594 -326 649 -87 15 -183 0 -269 -42 -74 -38 -132 -100 -330 -355 -85 -109 -188 -242 -230 -295 -41 -52 -109 -139 -150 -192 -41 -54 -81 -96 -88 -95 -22 5 -391 737 -392 775 0 22 9 43 29 65 28 32 32 33 121 37 87 3 91 4 88 25 l-3 21 -780 2 c-921 3 -827 1 -795 15 204 91 277 136 366 229 108 113 154 211 154 326 -1 147 -98 255 -242 267 -29 3 -66 1 -83 -3z m608 -892 c75 -21 107 -63 233 -312 64 -128 154 -304 199 -392 188 -365 445 -873 445 -878 0 -3 -73 -7 -162 -10 -177 -5 -239 -14 -367 -53 -158 -48 -356 -155 -460 -250 l-42 -37 -39 18 c-51 23 -124 101 -153 162 l-22 48 0 730 0 730 23 57 c37 88 140 177 222 191 47 8 85 7 123 -4z m1905 -210 c79 -35 158 -114 198 -194 26 -55 29 -69 29 -166 0 -156 34 -102 -498 -780 -92 -118 -176 -224 -186 -236 -41 -49 -109 -52 -150 -9 -34 36 -270 504 -282 559 -14 62 -4 144 24 199 31 60 392 522 445 569 114 100 278 123 420 58z m-1246 -1535 c215 -65 404 -180 423 -256 10 -40 -11 -74 -200 -314 -93 -119 -193 -246 -222 -282 -48 -63 -118 -152 -351 -452 -119 -153 -142 -177 -177 -186 -64 -16 -133 56 -233 246 -158 300 -176 626 -50 889 43 90 62 116 132 187 67 66 98 89 167 121 81 38 139 58 204 67 61 9 255 -3 307 -20z" />
                </g>
              </svg>
            </div>
          ) : (
            <Image
              draggable={false}
              alt={`profile_${profile_image}`}
              src={`/images/profile_${profile_image}.jpeg`}
              width={parseInt(size, 10)}
              height={parseInt(size, 10)}
              className={`w-full h-full aspect-square rounded-full select-none`}
            />
          )}
        </div>
        <ProfileImageModal onClick={onClick}>
          <button
            type="button"
            className="absolute flex items-center justify-center h-[22px] w-[22px] rounded-full bg-turquoise border-2 border-white border-solid text-white -right-[2px] -bottom-[2px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </ProfileImageModal>
      </div>
    </>
  )
}

export function DummyIcon() {
  return (
    <>
      <div className="min-w-[36px] w-[36px] h-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full flex items-center justify-center bg-darkgold" />
    </>
  )
}
