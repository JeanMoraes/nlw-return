import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning.ts"
import HabitDay from "./HabitDay"

const weekDays: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>

export function SummaryTable() {

    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {
        api.get('/summary')
            .then(response => setSummary(response.data))
            .catch(error => console.log({error}))
    }, [])

    return (
        <div className="w-full flex ">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                { weekDays.map((day, idx) => (
                    <div key={`${day}-${idx}`} className="text-zinc-400 text-xl w-10 h-10 font-bold flex items-center justify-center">
                        {day}
                    </div>
                )) }
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                { summary.length > 0 &&  summaryDates.map((date) => {
                    
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                    })

                    return (
                    <HabitDay
                        key={date.toString()}
                        date={date}
                        amount={dayInSummary?.amount}
                        dafaultCompleted={dayInSummary?.completed}
                    />
                )})}

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill}).map((_, idx) => (
                    <div key={idx} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
                ))}
            </div>
        </div>
    )
}