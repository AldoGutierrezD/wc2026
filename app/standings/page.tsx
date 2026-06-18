import { getAllMatches } from "@/services/matches";
import { getAllPredictions } from "@/services/predictions";
import { PLAYERS } from "@/constants";
import { Check, X } from "lucide-react";

function getResult(home: number, away: number) {
    if (home > away) return 'HOME';
    if (home < away) return 'AWAY';
    return 'DRAW';
}

export default async function StandingsPage() {

    const matches = await getAllMatches();
    const predictions = await getAllPredictions();

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
            <div className="flex items-end justify-center gap-4 max-w-md mx-auto font-nunito">
                {podiumOrder.map(({ player, points, height, color, position }) => (
                    <div key={player} className="flex flex-col items-center flex-1">
                        <p className="text-xl font-semibold mb-2 dark:text-black">{points}</p>
                        <div className={`w-full ${height} ${color} rounded-t-lg flex items-start justify-center pt-3`}>
                            <span className="font-bold font-wc2026 text-3xl dark:text-black">{player}</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-black text-white text-xs flex items-center justify-center -mt-3">
                            {position}
                        </div>
                    </div>
                ))}
            </div>

            <table className="w-full mt-8 text-sm font-nunito bg-white">
                <thead className="bg-[#fa0260] text-white">
                    <tr className="border-b">
                        <th className="text-left p-2">Partido</th>
                        {PLAYERS.map(player => (
                            <th key={player} className="p-2">{player}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-black">
                    {matchesWithPredictions.map(({ id, homeTeam, awayTeam }: { id: number, homeTeam: { name: string }, awayTeam: { name: string } }) => (
                        <tr key={id} className="border-b">
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
