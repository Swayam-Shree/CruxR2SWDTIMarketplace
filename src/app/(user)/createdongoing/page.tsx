"use client"

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { socket } from '../../socket';

import type { Auction } from '@/app/customTypes';

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import AuctionItemDisplay from '@/app/components/AuctionItemDisplay';

export default function CreatedOngoing() {
	const router = useRouter();
	const [user, authLoading, authError] = useAuthState(auth);

	const [auctionsLoading, setAuctionsLoading] = useState(true);
	const [auctions, setAuctions] = useState([] as Auction[]);

	useEffect(() => {
		try{
			socket.emit('getCreatedOngoingAuctions', user?.uid, (data: Auction[]) => {
				setAuctionsLoading(false);
				setAuctions(data);
			});
		} catch (e) {
			router.push('/dashboard');
		}
	}, []);

	let auctionsJsx;
	if (!auctionsLoading) {
		if (auctions.length === 0) {
			auctionsJsx = <div>No ongoing auctions...</div>;
		} else {
			auctionsJsx = auctions.map((auction: Auction, index) => {
				return (
					<div key={index}>
						<AuctionItemDisplay auction={auction} />
					</div>
				);
			});
		}
	} else {
		auctionsJsx = (
			<div>
				Loading...
				<CircularProgress />
			</div>
		);
	}

	if (user) {
		return (<div className='flex flex-col items-center'>
			<Typography className='text-center' variant='h2'>Created Ongoing Auctions</Typography>
			<div className='grid md:grid-cols-2 lg:grid-cols-3'>
				{ auctionsJsx }
			</div>
		</div>);
	} else if (authLoading) {
		return (
			<div>
				Loading...
				<CircularProgress />
			</div>
		);
	} else if (authError) {
		return (<div>Error</div>);
	} else {
		router.push('/');
	}
}