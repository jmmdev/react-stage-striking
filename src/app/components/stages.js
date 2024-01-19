import Image from 'next/image'
import styles from '../page.module.css'

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

    return (
        <div>
            <div className={styles.stages}>
                {
                    stages.map(stage => {
                        if (active.includes(stage.index)) {
                            <button className={styles.stage} style={{opacity: banned.includes(stage.index) ? 0.25 : 1}} onClick={() => updateBanned(stage.index)} key={stage.index}>
                                <Image fill={true} src={`/assets/${stage.index}.jpg`} alt={stage.name}/>
                            </button>
                        }
                    })
                }
            </div>
        </div>
  )
}