const paragraphs = [
    "My fellow Americans, due to the overwhelming amount of Black squares teenage girls are posting on Instagram, the supreme court has decided end racism completely. We did not think you would go to such extreme measures but you have very much proved your point. The Military will be told to stand down just please stop. Thank you",
    "In truth, not every night out at sea is filled with wind and waves. When the weather is clear, the moonlight flows over the rippling water, and schools of fish circle the hull of the ship. At moments like that, when I look out into the distance from the prow, I feel like this journey is worth it... The only thing that takes away from that feeling is the sailors singing. They are so loud... don't they need to sleep?",
    "Being defeated means being expelled from the field, and there is no greater despair for a warrior. But too many mediocre people do not properly etch that despair into their souls. Finding out that you lack talent and that your weakness defeated you… They are afraid to acknowledge their mistakes, so they unconsciously explain it away.",
    "Ah, that girl... She used to be the kind of person who could easily be swayed with some fried tofu. It is a relief to see how shrewd and resourceful she has now become. Still, I have to admit that I was a little upset to become the target of her scheming myself. I know it was for my own good, but I am afraid she will mock me next time we meet... Perhaps I should take the initiative and strike her first? Hmm, she will dodge it anyway.",
    "On behalf of the Streamer and whole chat I would like to extend our greatest gratitude for your invaluable care about this hardstuck challenger players mental state, since after 10 years of streaming he is not able to control his anger and tilt. Your contribution to helping him get over his weak mentality and becoming an untiltable champion of the top lane will never be forgotten!"
]

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);