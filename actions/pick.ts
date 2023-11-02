import { Game } from "@/types/custom.types";
import { Row } from "@/types/database-helpers.types";
import toast from "react-hot-toast";

const pickingPhrases = [
    "Putting your life savings on",
    "Going all in on",
    "Betting the house on",
    "Risking it all on",
    "Putting everything on",
    "Going for broke on",
    "Going for it all on",
    "Rolling the dice on",
    "Betting your kids' college fund on",
    "Risking your life on",
    "Pawning your wife's wedding ring for",
    "Cashing out your 401k for",
    "Selling your soul for",
    "Selling your firstborn child for",
    "Mortgaging your house for",
];
const pickMadePhrases = [
    "The pick is in",
    "Let's hope you don't regret this",
    "Good luck with that",
    "May the odds be ever in your favor",
    "No turning back now",
    "You're locked in",
];
const pickMadeIcon = ["✅", "👍", "👌", "👏", "🤞", "👀"];

const makePick = async (team: Row<"teams">, game: Game) => {
    const res = await fetch("/api/pick", {
        method: "POST",
        body: JSON.stringify({
            game_id: game.id,
            selection_id: team.id,
        }),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error);
    }
};

export default async (team: Row<"teams">, game: Game) => {
    const loadingPhrase =
        pickingPhrases[Math.floor(Math.random() * pickingPhrases.length)];
    const successPhrase =
        pickMadePhrases[Math.floor(Math.random() * pickMadePhrases.length)];
    const teamNameOrCity =
        Math.random() < 0.5 ? `the ${team.team_name}` : team.city;
    let toastId = toast.loading(`${loadingPhrase} ${teamNameOrCity}...`, {
        id: "pick-loading",
    });
    try {
        await makePick(team, game);
        toast.dismiss(toastId);
        toast.success(`${successPhrase}`, {
            icon: pickMadeIcon[Math.floor(Math.random() * pickMadeIcon.length)],
            duration: 3000,
            id: "pick-success",
        });
    } catch (e: any) {
        console.log(e.message);
        toast.dismiss(toastId);
        toast.error(e.message, {
            id: "pick-error",
        });
    }
};
