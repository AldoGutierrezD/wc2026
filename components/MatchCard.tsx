"use client"

import { useState } from "react";
import Image from "next/image"
import { PLAYERS } from "@/constants";
import { savePrediction } from "@/services/predictions";
import { Prediction } from "@/types/interfaces";
import { CheckCheck, CircleCheckBig } from "lucide-react";

type Props = {
    matchId: number,
    group: string,
    stage: string,
    date: string,
    homeTeam: string,
    homeTeamBadge: string,
    awayTeam: string,
    awayTeamBadge: string,
    strStatus: string,
    intHomeScore: number | null,
    intAwayScore: number | null,
    strCountry: string,
    predictions: Prediction[]
}

export default function MatchCard({ matchId, predictions, group, stage, date, homeTeam, homeTeamBadge, awayTeam, awayTeamBadge, strStatus, intHomeScore, intAwayScore, strCountry }: Props) {

    const countryColors = {
        "Mexico": ['#afea00', '#01c852', '#004d40'],
        "Canada": ['#ff3d00', '#d40100', '#741311'],
        "United States": ['#83b1ff', '#304fff', '#1b237e']
    };

    const playerColors: Record<string, string> = {
        "A": '#01c852',
        "P": '#304fff',
        "J": '#b57edc'
    };

    const colors = countryColors[strCountry as keyof typeof countryColors];

    const timeMexico = new Date(date).toLocaleTimeString('es-MX', {
        timeZone: 'America/Mexico_City',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    function getMatchStatus(status: string) {
        if (['SCHEDULED', 'TIMED'].includes(status)) return `${timeMexico}`;
        if (['IN_PLAY', 'PAUSED'].includes(status)) return `${intHomeScore} - ${intAwayScore}`;
        if (['FINISHED'].includes(status)) return `${intHomeScore} - ${intAwayScore}`;

        return 'other';
    }

    function getMatchStatusColor(status: string) {
        if (['SCHEDULED', 'TIMED'].includes(status)) return '#01fed7';
        if (['IN_PLAY', 'PAUSED'].includes(status)) return '#e5fe01';
        if (['FINISHED'].includes(status)) return '#fa0260';

        return '#c860cc';
    }

    function setFormatDate(date: string) {
        const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const localDate = new Date(date).toLocaleDateString('en-CA', {
            timeZone: 'America/Mexico_City'
        });
        const year = localDate.split('-')[0];
        const month = parseInt(localDate.split('-')[1]) - 1;
        const day = localDate.split('-')[2];
        return `${day}.${MONTHS[month]}.${year}`;
    }

    const [scores, setScores] = useState<Record<string, { home: string; away: string }>>(
        PLAYERS.reduce((acc, player) => {
            const existing = predictions.find(p => p.player_name === player);
            acc[player] = {
                home: existing?.predicted_home_score?.toString() ?? '',
                away: existing?.predicted_away_score?.toString() ?? ''
            };
            return acc;
        }, {} as Record<string, { home: string; away: string }>)
    );

    const [saved, setSaved] = useState<Record<string, boolean>>(
        PLAYERS.reduce((acc, player) => {
            const existing = predictions.find(p => p.player_name === player);
            acc[player] = !!existing;
            return acc;
        }, {} as Record<string, boolean>)
    );

    function getResult(home: number, away: number) {
        if (home > away) return 'HOME';
        if (home < away) return 'AWAY';
        return 'DRAW';
    }

    async function handleSave(player: string) {
        const { home, away } = scores[player];
        if (home === '' || away === '') return;

        const homeScore = parseInt(home);
        const awayScore = parseInt(away);
        const prediction = getResult(homeScore, awayScore);

        await savePrediction(matchId, player, prediction, homeScore, awayScore);
        setSaved(prev => ({ ...prev, [player]: true }));
    }

    return (
        <div
            className="rounded-3xl py-1.5 px-4 mb-5"
            style={{
                background: 'linear-gradient(to right, #b287fc 0%, #b287fc 15%, #a90f1d 15%, #a90f1d 50%, #b9e253 50%, #b9e253 85%, #b287fc 85%, #b287fc 100%)'
            }}
        >
            <div className="bg-white w-full rounded-[20px] relative text-black dark:text-black">
                <div className="w-full p-4 font-nunito">
                    <div className="flex justify-between items-center mb-4 font-light text-xs">
                        <span>{group}</span>
                        <span>{stage}</span>
                    </div>
                    <div className="w-20 h-6 flex justify-center items-center absolute top-5 left-1/2 -translate-x-1/2 rounded-full"
                        style={{ backgroundColor: getMatchStatusColor(strStatus) }}>
                        <span className="text-center text-xs font-bold">{strStatus}</span>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col justify-center items-center">
                            <Image src={homeTeamBadge} width={50} height={50} alt="" />
                            <span>{homeTeam}</span>
                        </div>
                        <h4 className="font-wc2026 text-5xl text-center">{getMatchStatus(strStatus)}</h4>
                        <div className="flex flex-col justify-center items-center">
                            <Image src={awayTeamBadge} width={50} height={50} alt="" />
                            <span>{awayTeam}</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-2 font-wc2026 text-xl">
                    {PLAYERS.map(player => (
                        <div key={player} className="flex justify-between items-center gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: playerColors[player] }}></div>
                                <span className="w-6">{player}</span>
                            </div>
                            <input
                                type="number"
                                min="0"
                                className="w-20 md:w-36 text-center border rounded"
                                value={scores[player].home}
                                onChange={(e) => setScores(prev => ({
                                    ...prev,
                                    [player]: { ...prev[player], home: e.target.value }
                                }))}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                min="0"
                                className="w-20 md:w-36 text-center border rounded"
                                value={scores[player].away}
                                onChange={(e) => setScores(prev => ({
                                    ...prev,
                                    [player]: { ...prev[player], away: e.target.value }
                                }))}
                            />
                            {saved[player] ? (
                                <CheckCheck size={20} className="text-[#00c752] font-bold" />
                            ) : (
                                <button
                                    onClick={() => handleSave(player)}
                                    className="text-sm bg-[#00c752] text-white px-2 py-1 rounded cursor-pointer hover:shadow-md"
                                >
                                    <CircleCheckBig size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div >
        </div>
    )

}
