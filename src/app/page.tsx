import Link from 'next/link';

export default function Home() {
    return (
        <main className="layout-wrapper">
            <section className="mb-16">
                <h1 className="text-3xl font-bold mb-4 uppercase">Arham Lodha</h1>
                <hr className="hr-double mb-8" />

                <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                    <div className="w-full md:w-3/5 space-y-8">
                        <div>
                            <p className="text-xl leading-relaxed mb-6 font-medium italic">
                                Welcome to my personal website. I am interested in mathematics,
                                programming, and design.
                            </p>

                            <div className="space-y-4 text-gray-800">
                                <p>
                                    This site is built with Next.js and uses a custom LaTeX rendering pipeline to support
                                    arbitrary compiled LaTeX diagrams (TikZ, etc.) in a static web environment.
                                </p>
                                <p>
                                    The design is a blend of technical monospaced aesthetics and
                                    Edward Tufte's principles of information design.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="flex items-center gap-4">
                                <a href="/CV.pdf" className="btn-arham">
                                    Download CV
                                </a>
                                <span className="text-sm text-gray-500 uppercase tracking-wide">
                                    [Last updated: Oct 2023]
                                </span>
                            </div>

                            <a href="https://github.com/arham-lodha" className="btn-arham">
                                GitHub
                            </a>
                        </div>

                        <section className="pt-8">
                            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider">Interests</h2>
                            <ul className="list-disc pl-5 space-y-3">
                                <li className="hover:text-ochre transition-colors">Mathematics (Algebra, Topology)</li>
                                <li className="hover:text-ochre transition-colors">Systems Programming</li>
                                <li className="hover:text-ochre transition-colors">Information Design</li>
                            </ul>
                        </section>
                    </div>

                    <div className="w-full md:w-2/5 flex flex-col gap-4">
                        <img
                            src="/images/profile.jpeg"
                            alt="Profile"
                            className="w-full h-auto border-2 border-black shadow-[8px_8px_0px_0px_#8c4b2d] bg-white transition-transform hover:-translate-y-1"
                        />
                        <div className="text-right">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Arham Lodha</p>
                            <p className="text-[10px] uppercase text-gray-400">Mathematics & Research</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
