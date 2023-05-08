const { useState } = React;

export function LongTxt({ txt, length = 100 }) {
    const [isLong, setIsLong] = useState(false)
    const [displayText, setDisplayText] = useState(txt.substring(0, length) + '...');

    function toggleTxtDisplay() {
        setIsLong(!isLong);
        setDisplayText(isLong ? txt.substring(0, length) + '...' : txt);
    }

    return (
        <div>
            <p>{displayText}</p>
            {txt.length > length && (
                <button onClick={toggleTxtDisplay}>
                    {isLong ? "Read Less" : "Read More"}
                </button>
            )}
        </div>
    );
}