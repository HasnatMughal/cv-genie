"use client"

import Link from 'next/link'
import React from 'react'
import { FiLock } from 'react-icons/fi'

type FeatureCardProps = {
    link: string,
    name: string,
    icon: React.ElementType,
    description?: string,
    available? : boolean
}

function FeatureCard({ link, name, icon, description, available }: FeatureCardProps) {
    const Icon = icon;
    return (
        <Link
            href={link}
            className='flex flex-col gap-3 p-5 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all h-48'
        >
            <div className='w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100'>
                <Icon className='text-xl' />
            </div>
            <p className='font-semibold flex items-center gap-2'>{name}{available === false ? <FiLock /> : ""}</p>
            {description && <p className='text-sm text-gray-500'>{description}</p>}
        </Link>
    )
}

export default FeatureCard;