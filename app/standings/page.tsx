import { getAllMatches } from "@/services/matches";
import { getAllPredictions } from "@/services/predictions";
import { PLAYERS } from "@/constants";

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

    const standings = PLAYERS.map(player => {
        const playerPredictions = predictions.filter(p => p.player_name === player);

        const correct = playerPredictions.filter(prediction => {
            const match = finishedMatches.find(({ id }: { id: number }) => id === prediction.match_id);
            if (!match) return false;

            const actualResult = getResult(match.score.fullTime.home, match.score.fullTime.away);
            return actualResult === prediction.prediction;
        }).length;

        return { player, correct };
    }).sort((a, b) => b.correct - a.correct);

    const [first, second, third] = standings;

    const podiumOrder = [
        { ...second, height: 'h-24', color: 'bg-yellow-300', position: 2 },
        { ...first, height: 'h-36', color: 'bg-lime-400', position: 1 },
        { ...third, height: 'h-16', color: 'bg-sky-300', position: 3 },
    ];

    return (
        <div className="flex items-end justify-center gap-4 max-w-md mx-auto font-nunito">
            {podiumOrder.map(({ player, correct, height, color, position }) => (
                <div key={player} className="flex flex-col items-center flex-1">
                    <p className="text-xl font-semibold mb-2">{correct}</p>
                    <div className={`w-full ${height} ${color} rounded-t-lg flex items-start justify-center pt-3`}>
                        <span className="font-bold font-wc2026 text-2xl">{player}</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-black text-white text-xs flex items-center justify-center -mt-3">
                        {position}
                    </div>
                </div>
            ))}
        </div>
    );
}
