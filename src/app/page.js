'use client';
import { React, useEffect, useState } from 'react'
import { MdRestartAlt, MdSettings } from 'react-icons/md'
import Stages from './components/stages'
import StageSettings from './components/stage-settings';
import { ReactCountryFlag } from 'react-country-flag';

export const getStages = async () => {
    const res = await fetch('files/stages.json')
    const stage_data = await res.json() 

    return stage_data
}

export default function Home() {
  const [stages, setStages] = useState([])
  const [banned, setBanned] = useState([])
  const [active, setActive] = useState([0,1,2,3,4,5,6,7,8])  
  const [showSettings, setShowSettings] = useState(false)
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const initialize = async () => {
      const stage_data = await getStages()
      setStages(stage_data)
    }
    initialize()
  }, [])

  const MyButton = ({content, action}) => {
    return (
      <button className="p-1 border-2 rounded-full hover:bg-zinc-100/20" onClick={action}>
        {content}
      </button>
    )
  }

  return (
    <div className="mx-auto min-h-screen px-1.5 py-4 sm:p-4 lg:p-8 xl:p-12 flex flex-col justify-between gap-8">
      <header className="sm:flex justify-between items-end px-1.5">
        <div className="text-zinc-100">
          <p className="text-3xl mb-1 font-bold">Stage Striking</p>
          <p className="text-sm font-bold">Super Smash Bros. Ultimate</p>
        </div>
        <div className="flex gap-2 text-2xl h-fit mt-4 sm:mt-0">
          <button className="flex" disabled={language === "en"} onClick={() => setLanguage("en")}>
            <ReactCountryFlag className={`${language === 'es' ? "hover:opacity-100 opacity-50" : ""} leading-6`} countryCode="GB" svg/>
          </button>
          <button className="flex" disabled={language === "es"} onClick={() => setLanguage("es")}>
            <ReactCountryFlag className={`${language === 'en' ? "hover:opacity-100 opacity-50" : ""} leading-6`} countryCode="ES" svg/>
          </button>
        </div>
      </header>
      <Stages stages={stages} banned={banned} setBanned={setBanned} active={active} language={language} />
      <div className="flex gap-4 text-4xl text-zinc-100 self-center">
        {active.length > 0 &&
        <MyButton content={<MdRestartAlt />} action={() => setBanned([])} />
        }
        <MyButton content={<MdSettings />} action={() => {
          setShowSettings(true);
          document.documentElement.style.overflowY = "hidden";
        }} />
      </div>
      {showSettings &&
        <StageSettings stages={stages} active={active} setActive={setActive} setShowSettings={setShowSettings} language={language} />
      }
    </div>
  )
}
