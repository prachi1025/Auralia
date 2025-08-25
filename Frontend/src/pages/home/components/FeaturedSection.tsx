import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";

const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore();

	if (isLoading) return <FeaturedGridSkeleton />;

	if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6'>
			{featuredSongs.map((song) => (
				<div
					key={song._id}
					className='flex items-center gap-3 
                    bg-slate-900/70 hover:bg-white/5 
                    border border-white/10 
                    rounded-md overflow-hidden cursor-pointer group
                    transition-colors duration-300 
                    '
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className='w-16 sm:w-20 h-16 sm:h-20 
                        object-cover rounded-md'
					/>

					<div className='flex-1 pr-4'>
						<p className='font-medium text-slate-100 truncate group-hover:text-sky-300 transition-colors'>
							{song.title}
						</p>
						<p className='text-sm text-slate-400 truncate group-hover:text-slate-200 transition-colors'>
							{song.artist}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default FeaturedSection;