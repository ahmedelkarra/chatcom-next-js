import QuestionComponent from '@/components/QuestionComponent'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Chatcom",
    description: "Chatcom is an interactive Q&A platform designed to connect curious minds with knowledgeable experts. Explore diverse topics, get answers to your questions, and contribute to our vibrant community.",
    keywords: [
        "Q&A platform",
        "Question and answer website",
        "Knowledge sharing",
        "Community forum",
        "Expert advice",
        "Online discussions",
        "User-generated content",
        "Tech questions",
        "Science questions",
        "Arts and humanities",
        "Ask an expert",
        "Answer questions",
        "Get answers",
        "Discussion board",
        "Collaborative learning",
        "Educational platform",
        "Find answers online",
        "Ask questions online",
        "Interactive Q&A",
        "Online knowledge base",
        "Community-driven answers",
        "Ask and answer",
        "Share expertise",
        "User profiles",
        "Reputation points",
        "Voting system",
        "Verified experts",
        "Advanced search",
        "Real-time notifications",
        "Mobile-friendly Q&A"
    ]
};


function page() {
    return (
        <QuestionComponent />
    )
}

export default page