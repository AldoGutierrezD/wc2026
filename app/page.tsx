import "@/styles/global.css";
import { getMatchesByDate } from "@/services/matches";
import { getPredictionsByMatches } from "@/services/predictions";
import DateNavigator from "@/components/DateNavigator";
import MatchCard from "@/components/MatchCard";
import { Match, MatchWithPredictions } from "@/types/interfaces";

interface HomeProps {
    searchParams: Promise<{ date?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {

    const { date: dateParam } = await searchParams;
    const today = new Date();
    const date = dateParam ?? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const matches = await getMatchesByDate(date);

    const matchIds = matches.map((match: Match) => match.id);
    const predictions = await getPredictionsByMatches(matchIds);

    return (
        <div className="w-full">
            <DateNavigator date={date} />
            {matches.map((match: Match) => {
                const matchPredictions = predictions.filter(p => p.match_id === match.id);
                const matchWithPredictions: MatchWithPredictions = { ...match, predictions: matchPredictions };
                const groupStr = match.group.replace('_', ' ');
                const stageStr = match.stage.replace('_', ' ');
                return (
                    <MatchCard
                        key={match.id}
                        matchId={match.id}
                        group={groupStr}
                        stage={stageStr}
                        date={match.utcDate}
                        homeTeam={match.homeTeam.name}
                        homeTeamBadge={match.homeTeam.crest}
                        awayTeam={match.awayTeam.name}
                        awayTeamBadge={match.awayTeam.crest}
                        strStatus={match.status}
                        intHomeScore={match.score.fullTime.home}
                        intAwayScore={match.score.fullTime.away}
                        strCountry=""
                        predictions={matchWithPredictions.predictions}
                    />
                );
            })}
        </div>
    );
}
