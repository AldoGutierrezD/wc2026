import { getStandings } from "@/services/matches";
import { Standing } from "@/types/interfaces";
import Image from "next/image";

export default async function GroupsPage() {

    const standings = await getStandings();

    return (
        <div className="w-full flex flex-col gap-8">
            {standings.map(({ group, table }: Standing) => (
                <div key={group}>
                    <h2 className="font-wc2026 text-3xl mb-3">{group}</h2>
                    <table className="w-full text-sm bg-white font-nunito border-4 border-black">
                        <thead className="bg-[#ea1f6e]">
                            <tr className="text-left text-md text-black font-bold p-3">
                                <th className="p-2 w-6">#</th>
                                <th className="p-2">Equipo</th>
                                <th className="p-2 text-center">PJ</th>
                                <th className="p-2 text-center">G</th>
                                <th className="p-2 text-center">E</th>
                                <th className="p-2 text-center">P</th>
                                <th className="p-2 text-center">DG</th>
                                <th className="p-2 text-center font-bold">Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.map(({ team, playedGames, won, draw, lost, goalDifference, points }: {
                                team: { name: string, crest: string, shortName: string },
                                playedGames: number,
                                won: number,
                                draw: number,
                                lost: number,
                                goalDifference: number,
                                points: number
                            }, index: number) => (
                                <tr key={team.name}>
                                    <td className="p-2 text-gray-500">{index + 1}</td>
                                    <td className="p-2">
                                        <div className="flex items-center gap-2">
                                            <Image src={team.crest} width={20} height={20} alt={team.name} />
                                            <span>{team.shortName}</span>
                                        </div>
                                    </td>
                                    <td className="p-2 text-center">{playedGames}</td>
                                    <td className="p-2 text-center">{won}</td>
                                    <td className="p-2 text-center">{draw}</td>
                                    <td className="p-2 text-center">{lost}</td>
                                    <td className="p-2 text-center">{goalDifference}</td>
                                    <td className="p-2 text-center font-bold">{points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
