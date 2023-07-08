import { useEffect, useState } from 'react'

import { ITimeBlock } from '@appTypes/TimeBlockInterfaces'

import { selectBlockByCurrentDayWithSub } from '@redux/slices/timetableSlice'
import { useAppSelector } from '@redux/store'

import * as s from './styles'
import { AnimatePresence } from 'framer-motion'

const CurrentBlockViewer = () => {
    const [currentBlock, setCurrentBlock] = useState<ITimeBlock | null>(null)

    const blocks = useAppSelector(selectBlockByCurrentDayWithSub)

    const getRemainingTimeString = (block: ITimeBlock) => {
        if (block === null) {
            return
        }
        const currentTime = new Date()
        const endTime = new Date()
        endTime.setHours(block.endTime.hours)
        endTime.setMinutes(block.endTime.minutes)
        const milliseconds = endTime.valueOf() - currentTime.valueOf()
        const minutes = Math.floor(milliseconds / 1000 / 60)
        if (minutes < 60) {
            return `${minutes} mins`
        } else {
            if (minutes % 60 === 0) {
                return `${minutes / 60} hr`
            } else {
                return `${Math.floor(minutes / 60)} hr ${minutes % 60} mins`
            }
        }
    }

    const updateCurrentTimeBlock = () => {
        let newBlock = null
        const currentTime = new Date()
        const currentHour = currentTime.getHours()
        const currentMinutes = currentTime.getMinutes()
        for (let i = 0; i < blocks.length; i++) {
            let isCurrent = true
            const block = blocks[i]
            if (block.startTime.hours > currentHour) {
                isCurrent = false
                continue
            }
            if (block.startTime.hours === currentHour && block.startTime.minutes > currentMinutes) {
                isCurrent = false
                continue
            }
            if (block.endTime.hours < currentHour) {
                isCurrent = false
                continue
            }
            if (block.endTime.hours < currentHour) {
                isCurrent = false
                continue
            }
            if (block.endTime.hours === currentHour && block.endTime.minutes < currentMinutes) {
                isCurrent = false
                continue
            }
            if (isCurrent && !newBlock) {
                newBlock = block
                break
            }
        }
        setCurrentBlock(newBlock)
    }

    let timer: NodeJS.Timer

    useEffect(() => {
        timer = setInterval(() => {
            updateCurrentTimeBlock()
        }, 500)

        return () => {
            clearInterval(timer)
        }
    }, [blocks])

    return (
        <AnimatePresence>
            {currentBlock && (
                <s.CBlockContainer>
                    <s.Heading>{currentBlock.title || ``}</s.Heading>
                    <s.SubText>{getRemainingTimeString(currentBlock)} remaining</s.SubText>
                </s.CBlockContainer>
            )}
        </AnimatePresence>
    )
}

export default CurrentBlockViewer
