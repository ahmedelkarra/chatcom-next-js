'use client'
import React, { useEffect, useState } from 'react';

interface TimeAgoProps {
    date: Date | string | number;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
    const [timeAgo, setTimeAgo] = useState<string>('');

    useEffect(() => {
        const updateTimeAgo = (): void => {
            let timeDifference: number;
            if (typeof date === 'object' && date instanceof Date) {
                timeDifference = Date.now() - date.getTime();
            } else if (typeof date === 'string') {
                timeDifference = Date.now() - new Date(date).getTime();
            } else if (typeof date === 'number') {
                timeDifference = Date.now() - new Date(date).getTime();
            } else {
                console.error('Invalid date format provided');
                return;
            }

            const secondsDifference: number = Math.round(timeDifference / 1000);
            const minutesDifference: number = Math.round(timeDifference / (1000 * 60));
            const hoursDifference: number = Math.round(timeDifference / (1000 * 60 * 60));
            const daysDifference: number = Math.round(timeDifference / (1000 * 60 * 60 * 24));
            const weeksDifference: number = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 7));
            const yearsDifference: number = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 365));

            if (secondsDifference < 60) {
                setTimeAgo(`${secondsDifference} second${secondsDifference === 1 ? '' : 's'} ago`);
            } else if (minutesDifference < 60) {
                setTimeAgo(`${minutesDifference} minute${minutesDifference === 1 ? '' : 's'} ago`);
            } else if (hoursDifference < 24) {
                setTimeAgo(`${hoursDifference} hour${hoursDifference === 1 ? '' : 's'} ago`);
            } else if (daysDifference < 7) {
                setTimeAgo(`${daysDifference} day${daysDifference === 1 ? '' : 's'} ago`);
            } else if (weeksDifference < 52) {
                setTimeAgo(`${weeksDifference} week${weeksDifference === 1 ? '' : 's'} ago`);
            } else {
                setTimeAgo(`${yearsDifference} year${yearsDifference === 1 ? '' : 's'} ago`);
            }
        };

        updateTimeAgo();

        const interval: NodeJS.Timeout = setInterval(updateTimeAgo, 60000);

        return (): void => clearInterval(interval);
    }, [date]);

    return (
        <div>
            <p>{timeAgo}</p>
        </div>
    );
};

export default TimeAgo;
