import { Check, GameController } from 'phosphor-react'
import { Input } from './Input'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useEffect, useState } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'

interface Game {
    id: string
    name: string
}

export function Form() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)
 
    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if (!data.name || !data.discord || !data.hourStart || !data.hourEnd) {
            return
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
        } catch(error) {
            alert('Erro ao criar o anúncio!')
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <select name="game" id="game" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500">
                    <option disabled defaultValue="">Selecione o game que deseja jogar</option>
                    {games.map(game => {
                        return <option key={game.id} value={game.id}>{game.name}</option>
                    })}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <Input type="number" name="yearsPlaying" id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu discord?</label>
                    <Input name="discord" id="discord" placeholder="Usuario#0000" />
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <ToggleGroup.Root type="multiple" value={weekDays} onValueChange={setWeekDays} className="grid grid-cols-4 gap-2">
                        <ToggleGroup.Item value="0" title="Domingo" className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                        <ToggleGroup.Item value="1" title="Segunda" className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                        <ToggleGroup.Item value="2" title="Terça" className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                        <ToggleGroup.Item value="3" title="Quarta" className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                        <ToggleGroup.Item value="4" title="Quinta" className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                        <ToggleGroup.Item value="5" title="Sexta" className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                        <ToggleGroup.Item value="6" title="Sábado" className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input type="time" name="hourStart" id="hourStart" placeholder="De" />
                        <Input type="time" name="hourEnd" id="hourEnd" placeholder="Até" />
                    </div>
                </div>
            </div>
            <label className="mt-2 flex gap-2 text-sm items-center">
                <Checkbox.Root onCheckedChange={() => setUseVoiceChannel(!useVoiceChannel)} className="w-6 h-6 p-1 rounded bg-zinc-900">
                    <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400" />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
            </label>
            <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 transition-colors px-5 h-12 rounded-md font-semibold">Cancelar</Dialog.Close>
                <button type="submit" className="bg-violet-500 hover:bg-violet-600 transition-colors px-5 h-12 rounded-md font-semibold flex items-center gap-3"><GameController size={24} />Encontrar duo</button>
            </footer>
        </form>
    )
}
