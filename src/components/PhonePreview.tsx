'use client'

import { CaseColor } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import { cn } from '@/lib/utils'
// in order to show the user what exactly he/she has bought, we need to show the user exactly 
// the cropped image, the phone case, and the color user has chosen for the iphone(caseColor)
const PhonePreview = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string
  color: CaseColor
}) => {
  const ref = useRef<HTMLDivElement>(null)
// why do we need this state ? because we need to know about the size of user's device
// in order to know how large should the image be rendered on the device 
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  })
// basically, we use handleResize to update the reference of our dimensions(of the pages)
  const handleResize = () => {
    if (!ref.current) return
//the boundingClientRect() gives us useful options (height,width,top,bottom,..) to get from the device
    const { width, height } = ref.current.getBoundingClientRect()
    setRenderedDimensions({ width, height })
  }
// we use the useEffect to fire the resize function and listen to whenever window is resized 
// then for best practice , we're gonna remove the eventListener as a cleanup function
  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [ref.current])

  let caseBackgroundColor = 'bg-zinc-950'
  if (color === 'blue') caseBackgroundColor = 'bg-blue-950'
  if (color === 'rose') caseBackgroundColor = 'bg-rose-950'

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className='relative'>
      <div
        className='absolute z-20 scale-[1.0352]'
        style={{
          left:
          // WHY are we diving width by 2 ? >> because if you take a look at the main picture we're using 
          //to put the croppedImage on it (clearphone.png), we need to send the croppedImage in exactly 
          //the rightSide of the whole picture (not centered, but actually the left side is started on the
          // start of the right Half of the picture!) and HOW did we get the (1216/121) ? >> 
          //basically we got this by measuring the dimensions of the PHONE in the main picture (just tried a lot!)
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}>
        <img
        alt='cropped-image'
        //again, some phtoshop measuring
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            'phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]',
            caseBackgroundColor
          )}
          src={croppedImageUrl}
        />
      </div>
      {/* the actual image of our phone which upper image goes on */}
      <div className='relative h-full w-full z-40'>
        <img
          alt='phone'
          src='/clearphone.png'
          className='pointer-events-none h-full w-full antialiased rounded-md'
        />
      </div>
    </AspectRatio>
  )
}

export default PhonePreview
