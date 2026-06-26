import "@/styles/global.css";
import { getMatchesByTeam } from "@/services/matches";
import { getPredictionsByMatches } from "@/services/predictions";
import MatchCard from "@/components/MatchCard";
import { Match, MatchWithPredictions } from "@/types/interfaces";

interface TeamProps {
    params: Promise<{ slug: string }>;
}

export default async function Home({ params }: TeamProps) {

    const { slug } = await params;

    const matches = await getMatchesByTeam(slug);

    const matchIds = matches.map((match: Match) => match.id);
    const predictions = await getPredictionsByMatches(matchIds);

    return (
        <div className="w-full">
            {matches.map((match: Match) => {
                const matchPredictions = predictions.filter(p => p.match_id === match.id);
                const matchWithPredictions: MatchWithPredictions = { ...match, predictions: matchPredictions };
                const groupStr = match.group ? match.group.replace('_', ' ') : 'Eliminatorias';
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
