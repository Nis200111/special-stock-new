import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const CreativeGuidance = () => {
    return (
        <section className="py-16 px-6 bg-white text-black">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                    Creative and Marketing Guidance
                </h2>

                {/* Main Featured Article */}
                <Link href="/blog/post-1" className="grid md:grid-cols-2 gap-6 mb-10 group cursor-pointer rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80"
                            alt="Featured Article"
                            className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-4 md:p-0">
                        <h4 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                            In The Wild: TurboSquid x <em>House of Kardashian</em>
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                            TurboSquid is the world&apos;s premier 3D design resource. In the first installment of Special Stocks&apos; digital series <em>In The Wild</em>, watch global creative studio Coffee & TV use TurboSquid&apos;s premium 3D models to craft <em>House of Kardashian</em>&apos;s opening sequence.
                        </p>
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-blue-600 font-medium text-sm inline-flex items-center">
                                Read More <FaArrowRight className="ml-2" />
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Three Smaller Articles */}
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="group cursor-pointer rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                            <div className="overflow-hidden h-48">
                                <img
                                    src={`https://images.unsplash.com/photo-${item === 1 ? '1606857521015-7f9fcf423740' : item === 2 ? '1542744173-8e7e53415bb0' : '1496171367470-9ed9a91ea931'}?w=400&q=80`}
                                    alt={`Article ${item}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-4">
                                <h5 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                                    {item === 1 ? "5 Design Trends to Watch in 2024" : item === 2 ? "How to Monetize Your Creative Assets" : "The Future of AI in Stock Photography"}
                                </h5>
                                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-blue-600 font-medium text-xs inline-flex items-center">
                                        Read More <FaArrowRight className="ml-1" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CreativeGuidance;
