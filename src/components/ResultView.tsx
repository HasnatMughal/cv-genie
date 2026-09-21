import React from 'react'

function ResultView({ result }: { result: any }) {
  return (
    
        <div className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-6">
            {/* Score */}
            <div className="text-center border rounded-xl p-6">
                <p className="text-4xl font-bold">{result.score}/100</p>
                <p className="text-gray-500">Interview Score</p>
            </div>

            {/* Per-question feedback */}
            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Question-by-Question Feedback</h2>
                {result.feedback?.map((item: any, i: number) => (
                    <div key={i} className="border rounded-xl p-5 flex flex-col gap-2">
                        <p className="font-semibold">Q{i + 1}: {item.question}</p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Your Answer: </span>
                            {item.answer}
                        </p>
                        <p className="text-sm text-blue-600 mt-1">
                            <span className="font-medium">Feedback: </span>
                            {item.comment}
                        </p>
                    </div>
                ))}
            </div>

            {/* Overall Suggestions */}
            <div className="border rounded-xl p-5">
                <h2 className="text-lg font-semibold mb-2">Overall Suggestions</h2>
                <ul className="list-disc pl-5 flex flex-col gap-1 text-sm text-gray-600">
                    {result.overallSuggestions?.map((s: string, i: number) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ResultView