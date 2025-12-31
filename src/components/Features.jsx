import Link from "next/link";
import { FaImage, FaVideo, FaMusic } from "react-icons/fa";

const Features = () => {
    // Using placeholders for images
    return (
        <section className="py-16 px-6 bg-white text-black">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mx-5 mb-8">
                    Your stories aren&apos;t one-dimensional, neither is our content library
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
                    <Link href="/images" className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition group">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-sm overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1542204637-e67bc7d41e48?w=200" alt="Images" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold text-gray-700 group-hover:text-black">Images</p>
                    </Link>

                    <Link href="/video" className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition group">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-sm overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200" alt="Video" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold text-gray-700 group-hover:text-black">Video</p>
                    </Link>

                    <Link href="/music" className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition group">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-sm overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200" alt="Music" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold text-gray-700 group-hover:text-black">Music</p>
                    </Link>

                    <Link href="/exclusive-images" className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg transition group">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-sm overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200" alt="Exclusive" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="text-sm font-bold text-gray-700 group-hover:text-black">Exclusive Images</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Features;
