import Image from 'next/image'
import styles from '../page.module.css'
import { MdArrowDownward } from "react-icons/md";


export default function Stages({stages, banned, setBanned, active}) {
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
                    <button className={styles.stage} style={{opacity: banned.includes(stage.index) ? 0.25 : 1}} onClick={() => updateBanned(stage.index)} key={stage.index}>
                        <Image fill={true} src={`/assets/${stage.index}.jpg`} alt={stage.name}/>
                    </button>
                )
            }
        })
        if (stagesToShow.length > 0) {
            return stagesToShow
        } else {
            return (
                <div className={styles.empty}>
                    <p style={{fontWeight: 600, fontSize: 32}}>PLEASE, SELECT SOME STAGES IN THE SETTINGS MENU</p>
                    <div className={styles.arrow}>
                        <MdArrowDownward fontSize={72} color='#fff'/>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <div className={styles.stages}>
                <ShowStages />
            </div>
        </div>
  )
}