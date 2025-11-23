import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-linear-to-t from-black to-zinc-900/90 border-t border-zinc-800/30 font-roboto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <nav className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Main Nav */}
                    <div className="space-y-4">
                        {/* <h3 className="text-white font-semibold text-lg">
                            Navigation
                        </h3> */}
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/create"
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    Create Collection
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    Collections
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/profile"
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/activity"
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    Activity
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                </nav>

                {/* Copyright */}
                <div className="pt-8 border-t border-zinc-800/30 text-center">
                    <p className="text-zinc-500 text-sm">
                        © 2024 EmelPad. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
