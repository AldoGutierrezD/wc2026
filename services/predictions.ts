import { supabase } from './supabase';

export async function getPredictionsByMatch(matchId: number) {
    const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('match_id', matchId);

    if (error) {
        console.error('Error al obtener las predicciones', error);
        return [];
    }

    return data;
}

export async function savePrediction(
    matchId: number,
    playerName: string,
    prediction: string,
    predictedHomeScore: number,
    predictedAwayScore: number
) {
    const { data, error } = await supabase
        .from('predictions')
        .upsert(
            {
                match_id: matchId,
                player_name: playerName,
                prediction,
                predicted_home_score: predictedHomeScore,
                predicted_away_score: predictedAwayScore
            },
            { onConflict: 'match_id,player_name' }
        )
        .select();

    if (error) {
        console.error('Error al guardar la predicción', error);
        return null;
    }

    return data;
}

export async function getPredictionsByMatches(matchIds: number[]) {
    const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .in('match_id', matchIds);

    if (error) {
        console.error('Error al obtener las predicciones', error);
        return [];
    }

    return data;
}

export async function getAllPredictions() {
    const { data, error } = await supabase
        .from('predictions')
        .select('*');

    if (error) {
        console.error('Error al obtener las predicciones', error);
        return [];
    }

    return data;
}
