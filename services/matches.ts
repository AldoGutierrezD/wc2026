export async function getAllMatches() {
    const response = await fetch(
        'https://api.football-data.org/v4/competitions/WC/matches',
        {
            headers: {
                'X-Auth-Token': process.env.FOOTBALL_DATA_TOKEN!
            },
            next: { revalidate: 60 }
        }
    );

    if (!response.ok) {
        console.error('Error al obtener los partidos');
    }

    const data = await response.json();

    return data.matches.sort(({ utcDate: a }: { utcDate: string }, { utcDate: b }: { utcDate: string }) =>
        new Date(a).getTime() - new Date(b).getTime()
    );
}


export async function getMatchesByDate(date: string) {
    const events = await getAllMatches();
    return events.filter(({ utcDate }: { utcDate: string }) => {
        const localDate = new Date(utcDate).toLocaleDateString('en-CA', {
            timeZone: 'America/Mexico_City'
        });
        return localDate === date;
    });
}


export async function getMatchesByTeam(team: string) {
    const events = await getAllMatches();
    return events.filter(({ homeTeam, awayTeam }: { homeTeam: { name: string }, awayTeam: { name: string } }) =>
        homeTeam.name === team || awayTeam.name === team
    );
}


export async function getStandings() {
    const response = await fetch(
        'https://api.football-data.org/v4/competitions/WC/standings',
        {
            headers: {
                'X-Auth-Token': process.env.FOOTBALL_DATA_TOKEN!
            },
            next: { revalidate: 60 }
        }
    );

    if (!response.ok) {
        console.error('Error al obtener standings');
    }

    const data = await response.json();
    return data.standings.filter(({ type }: { type: string }) => type === 'TOTAL');
}
