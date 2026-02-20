import React from 'react';
import useUser from '../../features/User/useUser';

function Dashboard() {
    const { isLoading, user } = useUser();

    const getGreeting = () => {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            return { text: "صبح بخیر", emoji: "☀️" };
        } else if (hour >= 12 && hour < 17) {
            return { text: "ظهر بخیر", emoji: "🌞" };
        } else if (hour >= 17 && hour < 20) {
            return { text: "عصر بخیر", emoji: "🌆" };
        } else {
            return { text: "شب بخیر", emoji: "🌙" };
        }
    };

    const greeting = getGreeting();

    return (
        <div className="p-4">
            <h2 className="text-xl">
                سلام {user?.name} {greeting.text} {greeting.emoji}
            </h2>
        </div>
    );
}

export default Dashboard;