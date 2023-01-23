interface ProgessBarProps {
    progess: number
}

export function ProgressBar(props: ProgessBarProps) {

    const progressStyles = {
        width: `${props.progess}%`
    }

    return (
        <div
            className='h-3 rounded-xl bg-zinc-700 w-full mt-4'
        >
            <div
                role="progressbar"
                aria-label="Progresso de hábitos do dia"
                aria-valuenow={props.progess}
                className='h-3 rounded-xl bg-violet-700 transition-all'
                style={progressStyles}
            />
        </div>
    )
}