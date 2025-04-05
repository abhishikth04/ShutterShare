import { Instagram , Youtube , Linkedin , Facebook} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="h-auto w-full flex flex-row items-center justify-between bg-neutral-900
        border-t-2 border-t-white text-white pt-3 
        pb-3.5 pl-9 pr-9">
        
        <div>
            <p className="text-gray-300 mb-3">Powered by</p>
            <h1 className="text-white text-4xl">
                <span className="text-gray-300"><i>de</i></span><span className="font-semibold">TECH</span>
                <span className="text-gray-300"><i>tives</i></span>
                </h1>
        </div>
        <div className="flex flex-col justify-center">
           <p className="mb-6 text-gray-300">Follow Us</p>
           <div className="flex flex-row justify-center gap-5">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-8 h-8 text-white hover:text-pink-500 hover:w-9 hover:h-9 transition-all duration-300 relative z-50" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-8 h-8 text-white hover:text-blue-500 hover:w-9 hover:h-9 transition-all duration-300 relative z-50" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-8 h-8 text-white hover:text-red-500 hover:w-9 hover:h-9 transition-all duration-300 relative z-50" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-8 h-8 text-white hover:text-blue-700 hover:w-9 hover:h-9 transition-all duration-300 relative z-50" />
                </a>
            </div>




        </div>
        <div>
            <p className="mb-2 text-gray-300">Quick Links</p>
            <ul className="text-red-500">
                <li><a href="">About</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">Login</a></li>
            </ul>
        </div>

        <div>
            <p className="mb-3 text-gray-300">Contact Us</p>
            <p><span className="text-red-500">Email</span> &nbsp;: &nbsp;deTechtivesupport@mail.com</p>
            <p><span className="text-red-500">Phone</span>  &nbsp;: +91 9x1x4x6x64</p>
        </div>


        </footer>
    );
};

export default Footer;

