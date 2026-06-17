"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useRouter } from "next/navigation";

interface DateNavigatorProps {
    date: string;
}

export default function DateNavigator({ date }: DateNavigatorProps) {
    const router = useRouter();

    const navigate = (days: number) => {
        const current = new Date(`${date}T00:00:00`);
        current.setDate(current.getDate() + days);
        const next = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
        router.push(`/?date=${next}`);
    };

    function setFormatDate(date: string) {
        const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const month = parseInt(date.split('-')[1]) - 1;
        const day = date.split('-')[2];
        return `${day} ${MONTHS[month]}`;
    }

    return (
        <div className="w-full flex justify-between items-center gap-4 mb-4">
            <button
                onClick={() => navigate(-1)}
                className="bg-[#00c752] w-8 h-8 rounded-md cursor-pointer flex justify-center items-center"
            >
                <ChevronLeft size={16} className="text-white font-bold" />
            </button>
            <span className="font-wc2026 text-3xl">{setFormatDate(date)}</span>
            <button
                onClick={() => navigate(1)}
                className="bg-[#00c752] w-8 h-8 rounded-md cursor-pointer flex justify-center items-center"
            >
                <ChevronRight size={16} className="text-white font-bold" />
            </button>
        </div>
    );
}
