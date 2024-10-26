import Image from 'next/image'
import { FiChevronDown } from "react-icons/fi";


export default function Stages({stages, banned, setBanned, active, language}) {
    const updateBanned = index => {
        const bannedSet = new Set([...banned])
        if (bannedSet.has(index)) {
            bannedSet.delete(index)
        } else {
            bannedSet.add(index)
        }
        setBanned([...bannedSet])
    }

    const ShowStages = () => {
        const stagesToShow = [];
        stages.map(stage => {
            if (active.includes(stage.index)) {
                stagesToShow.push(
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4 aspect-video text-center">
                        <button className={"w-full h-full p-1.5 hover:bg-zinc-100"} onClick={() => updateBanned(stage.index)} key={stage.index}>
                            <div className="relative w-full h-full">
                                <Image fill src={`/assets/${stage.index}.jpg`} alt={stage.name[language]} />
                                <div className={`absolute w-full h-full bg-black/75 ${banned.includes(stage.index) ? "" : "hidden"}`} />
                            </div>
                        </button>
                        <p className="truncate font-bold lg:text-lg xl:text-xl text-zinc-100 mt-0.5 mb-1.5">{stage.name[language]}</p>
                    </div>
                )
            }
        })
        if (stagesToShow.length > 0) {
            return stagesToShow
        } else {
            return (
                <div className="flex flex-col gap-8 items-center max-w-md leading-relaxed text-center text-2xl text-zinc-100 p-4">
                    <p>
                    {language === "en"
                        ? "Your stages should load shortly, if you don't see any, please check the stage settings menu."
                        : "Los escenarios cargarán en breve, si no los ves, comprueba los ajustes de escenarios."
                    }
                    </p>
                    <FiChevronDown className="text-7xl animate-bounce"/>
                </div>
            )
        }
    }

    return (
        <div className="flex flex-wrap justify-center">
            <ShowStages />
        </div>
  )
}