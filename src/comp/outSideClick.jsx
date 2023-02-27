import { useEffect, useRef } from 'react';

export function OutSideClick(props) {
    const ref = useRef(null);
    const { onClickOutside, active, children, className } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        if (active) {
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    }, [onClickOutside, active]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>);
}