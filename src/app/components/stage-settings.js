import { MdClose } from 'react-icons/md'

export default function StageSettings({stages, active, setActive, setShowSettings, language}) {
    
    const updateActive = index => {
        const activeSet = new Set([...active])
        if (activeSet.has(index)) {
            activeSet.delete(index)
        } 
        else {
            activeSet.add(index)
        }
        setActive([...activeSet])
    }

    return (
        <div className="fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-black/80 py-16">
            <div className="w-fit max-h-96 lg:max-h-full bg-slate-600 rounded-xl overflow-y-auto">
                <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-slate-700 backdrop-blur-lg">
                    <p className="sm:text-xl font-bold text-slate-200">{language === "en" ? "Stage selection" : "Selección de escenarios"}</p>
                    <button className="text-2xl sm:text-3xl self-end text-slate-300 hover:text-slate-300 active:text-zinc-100" onClick={() => {
                        setShowSettings(false)
                        document.documentElement.style.overflowY = 'auto'
                    }}>
                        <MdClose />
                    </button>
                </div>
                <div className="flex flex-col px-4">
                    {
                        stages.map((stage, index) => {
                            const isActive = active.includes(stage.index);
                            return (
                                <div className={`flex flex-col sm:flex-row justify-between items-center py-4 gap-2 sm:gap-8 xl:gap-16 ${index < stages.length - 1 ? "border-b border-slate-400/50" : ""}`} key={stage.index}>
                                    <p className="truncate text-lg text-zinc-100">{stage.name[language]}</p>
                                    <button className={`group w-14 h-8 p-0.5 rounded-full border-2 border-zinc-100 ${isActive ? "bg-emerald-500 hover:bg-emerald-400" : "bg-neutral-600 hover:bg-neutral-500"}`} onClick={e => updateActive(stage.index)}>
                                        <div className={`h-full aspect-square bg-zinc-100 rounded-full transition-all duration-150 ${isActive ? "translate-x-full group-active:translate-x-0" : "translate-x-0 group-active:translate-x-full"}`}/>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
  )
}