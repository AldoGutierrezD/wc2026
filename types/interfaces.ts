export interface Area {
    id: number;
    name: string;
    code: string;
    flag: string | null;
}

export interface Competition {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
}

export interface Season {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: string | null;
}

export interface Team {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
}

export interface ScoreDetail {
    home: number | null;
    away: number | null;
}

export interface Score {
    winner: string | null;
    duration: string;
    fullTime: ScoreDetail;
    halfTime: ScoreDetail;
}

export interface Referee {
    id: number;
    name: string;
    type: string;
    nationality: string;
}

export interface Match {
    area: Area;
    competition: Competition;
    season: Season;
    id: number;
    utcDate: string;
    status: string;
    matchday: number;
    stage: string;
    group: string;
    lastUpdated: string;
    homeTeam: Team;
    awayTeam: Team;
    score: Score;
    referees: Referee[];
}

export interface Prediction {
    id: string;
    match_id: number;
    player_name: string;
    prediction: string;
    predicted_home_score: number | null;
    predicted_away_score: number | null;
    created_at: string;
}

export interface MatchWithPredictions extends Match {
    predictions: Prediction[];
}
