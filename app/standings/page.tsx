import { getAllMatches } from "@/services/matches";
import { getAllPredictions } from "@/services/predictions";
import { PLAYERS } from "@/constants";
import { Check, X } from "lucide-react";
import Image from "next/image";

function getResult(home: number, away: number) {
    if (home > away) return 'HOME';
    if (home < away) return 'AWAY';
    return 'DRAW';
}

export default async function StandingsPage() {

    const matches = await getAllMatches();
    const predictions = await getAllPredictions();

    const profilImages: Record<string, string> = {
        "A": "/profile/a-profile.png",
        "P": "/profile/p-profile.png",
        "J": "/profile/j-profile.png"
    }

    const finishedMatches = matches.filter(({ status }: { status: string }) =>
        status === 'FINISHED'
    );

    function getPoints(matchHome: number, matchAway: number, predHome: number, predAway: number) {
        if (matchHome === predHome && matchAway === predAway) return 2;

        const actualResult = getResult(matchHome, matchAway);
        const predictedResult = getResult(predHome, predAway);
        if (actualResult === predictedResult) return 1;

        return 0;
    }

    const standings = PLAYERS.map(player => {
        const playerPredictions = predictions.filter(p => p.player_name === player);

        const points = playerPredictions.reduce((total, prediction) => {
            const match = finishedMatches.find(({ id }: { id: number }) => id === prediction.match_id);
            if (!match) return total;

            return total + getPoints(
                match.score.fullTime.home,
                match.score.fullTime.away,
                prediction.predicted_home_score,
                prediction.predicted_away_score
            );
        }, 0);

        return { player, points };
    }).sort((a, b) => b.points - a.points);

    const [first, second, third] = standings;

    const podiumOrder = [
        { ...second, height: 'h-24', color: 'bg-yellow-300', position: 2 },
        { ...first, height: 'h-36', color: 'bg-lime-400', position: 1 },
        { ...third, height: 'h-16', color: 'bg-sky-300', position: 3 },
    ];

    function getPlayerResult(matchId: number, player: string) {
        const prediction = predictions.find(p => p.match_id === matchId && p.player_name === player);
        if (!prediction) return null;

        const match = finishedMatches.find(({ id }: { id: number }) => id === matchId);
        if (!match) return null;

        const actualResult = getResult(match.score.fullTime.home, match.score.fullTime.away);
        return actualResult === prediction.prediction;
    }

    const matchesWithPredictions = finishedMatches.filter(({ id }: { id: number }) =>
        predictions.some(p => p.match_id === id)
    );

    return (
        <div>
            <div className="flex items-end justify-center gap-0.5 max-w-md mx-auto font-nunito">
                {podiumOrder.map(({ player, points, height, color, position }) => (
                    <div key={player} className="flex flex-col items-center flex-1">
                        <div className="w-20 h-20 bg-amber-100 border-3 border-amber-300 rounded-3xl shadow-2xl shadow-amber-100 p-1 flex justify-center items-center overflow-hidden">
                            <Image
                                src={`${profilImages[player]}`}
                                width={100}
                                height={100}
                                alt=""
                                style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
                            />
                        </div>
                        <p className="text-xl font-semibold mb-2 dark:text-black font-wc2026">{player}</p>
                        <div className={`w-full ${height} ${color} rounded-t-lg border-3 border-black flex items-start justify-center pt-3`}>
                            <p className="font-semibold dark:text-black">{points} pts</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-dark outline-3 outline-black text-sm font-bold flex items-center justify-center -mt-3">
                            {position}
                        </div>
                    </div>
                ))}
            </div>

            <table className="w-full mt-8 text-sm font-nunito bg-white border-4 border-black">
                <thead className="bg-[#fa0260] text-white">
                    <tr>
                        <th className="text-left p-2">Partido</th>
                        {PLAYERS.map(player => (
                            <th key={player} className="p-2">{player}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-black">
                    {matchesWithPredictions.map(({ id, homeTeam, awayTeam }: { id: number, homeTeam: { name: string }, awayTeam: { name: string } }) => (
                        <tr key={id}>
                            <td className="p-2">{homeTeam.name} vs {awayTeam.name}</td>
                            {PLAYERS.map(player => {
                                const result = getPlayerResult(id, player);
                                return (
                                    <td key={player} className="p-2 text-center">
                                        {result === null ? '-' : result ? (
                                            <Check size={16} className="inline text-green-500" />
                                        ) : (
                                            <X size={16} className="inline text-red-500" />
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
