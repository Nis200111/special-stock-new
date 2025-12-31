import { trustedCompanies } from "@/data/mockData";

const TrustedBy = () => {
    return (
        <section className="py-12 bg-gray-50 text-center text-black">
            <span className="text-gray-700 mb-8 block text-xl font-bold">
                Trusted by the world&apos;s largest companies
            </span>

            {/* Marquee Container */}
            <div className="logo-company-slider overflow-hidden relative w-full m-auto">
                <div className="logo-company-track flex animate-scroll w-[calc(250px*10)]">
                    {/* 
                Original uses 'animate-scroll' which we need to define in global CSS. 
                We duplicate the list to ensure seamless looping. 
            */}
                    {[...trustedCompanies, ...trustedCompanies, ...trustedCompanies].map((company, index) => (
                        <div key={`${company.name}-${index}`} className="flex items-center justify-center mx-10 w-[200px] flex-shrink-0 h-20 opacity-60 hover:opacity-100 transition-opacity">
                            {/* Replace text with img tags if logos are available */}
                            <span className="text-xl font-bold text-gray-400">{company.name}</span>
                            {/* <img src={company.logo} alt={company.name} className="h-full object-contain" /> */}
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-gray-700 mt-8 mb-4 text-lg">
                Need a personalized package for your business?
            </p>
            <a
                href="/register"
                className="inline-block px-12 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-medium"
            >
                Request a Quote
            </a>
        </section>
    );
};

export default TrustedBy;
