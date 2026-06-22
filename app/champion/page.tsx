import Image from "next/image";

export default async function StandingsPage() {

    const results = [

        {
            id: 1,
            name: "J",
            profile: "/profile/j-profile.png",
            team: "Netherlands",
            teamImage: "https://crests.football-data.org/8601.svg"
        },
        {
            id: 2,
            name: "P",
            profile: "/profile/p-profile.png",
            team: "Netherlands",
            teamImage: "https://crests.football-data.org/8601.svg"
        },
        {
            id: 3,
            name: "A",
            profile: "/profile/a-profile.png",
            team: "Argentina",
            teamImage: "https://crests.football-data.org/762.svg"
        }
    ]

    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-0.5 max-w-md mx-auto font-nunito">
                <div
                    className="rounded-3xl py-1.5 px-4 mb-5 w-4/5 h-auto"
                    style={{
                        background: 'linear-gradient(to right, #b287fc 0%, #b287fc 15%, #a90f1d 15%, #a90f1d 50%, #b9e253 50%, #b9e253 85%, #b287fc 85%, #b287fc 100%)'
                    }}
                >
                    <div className="bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 rounded-xl flex items-center justify-between p-3 overflow-hidden">
                        <div className="flex flex-col text-white">
                            <span className="text-xl md:text-2xl font-wc2026">MUNDIAL 2026</span>
                            <span className="text-6xl md:text-7xl font-wc2026">CAMPEÓN</span>
                        </div>
                        <Image src="/world_cup.png" width={120} height={0} alt="Copa del mundo" />
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                    {results.map(({ id, name, profile, teamImage }) => (
                        <div key={id} className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-amber-100 border-3 border-amber-300 rounded-3xl shadow-2xl shadow-amber-100 p-1 flex justify-center items-center overflow-hidden">
                                <Image
                                    src={`${profile}`}
                                    width={100}
                                    height={100}
                                    alt=""
                                    style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
                                />
                            </div>
                            <span className="text-xl font-bold font-wc2026 text-black">{name}</span>
                            <Image src={`${teamImage}`} alt="Bandera de la selección" width={50} height={0} className="mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
