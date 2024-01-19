'use client';
import { useEffect, useState } from 'react'
import { MdRestartAlt, MdSettings } from 'react-icons/md'
import Image from 'next/image'

import styles from './page.module.css'
import Stages from './components/stages'
import StageSettings from './components/stage-settings';

export const getStages = async () => {
    const res = await fetch('files/stages.json', {cache: 'force-cache'})
    const stage_data = await res.json() 

    return stage_data
}

export default function Home() {
  const [stages, setStages] = useState([])
  const [banned, setBanned] = useState([])
  const [active, setActive] = useState([0,1,2,3,4,5,6,7,10])  
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      const stage_data = await getStages()
      setStages(stage_data)
    }
    initialize()
  }, [])

  const Settings = () => {
    if (showSettings) {
      return (
        <StageSettings stages={stages} active={active} setActive={setActive} setShowSettings={setShowSettings} />
      )
    }
    return null;
  }

  const RestartButton = () => {
    if (active.length > 0) {
      return (
        <button className={styles.button} onClick={() => setBanned([])}>
          <MdRestartAlt fontSize={36}/>
        </button>
      )
    }
    return null
  }

  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Image fill src={`/assets/logo.svg`} alt='Logo'/>
      </div>
      <Stages stages={stages} banned={banned} setBanned={setBanned} active={active}/>
      <div className={styles.buttons}>
        <RestartButton />
        <button className={styles.button} onClick={() => setShowSettings(true)}>
          <MdSettings fontSize={36}/>
        </button>
      </div>
      <Settings />
    </main>
  )
}
