import './Header.module.scss';
export default function Header () {
    return (
        <header>
            <nav>
                <img src="/assets/shared/logo.svg" alt="logo of galleria" />
                <div className="slideshow-btn">start slideshow</div>
            </nav>
        </header>
    )
}