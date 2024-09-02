import { useGameSettingsStore} from "@/stores/gameSettings";
import { computed } from "vue";

export const useFormattedTime = () => {
    const gameSettingsStore = useGameSettingsStore();

    const formattedTime = computed(() => {
        const paddedMinutes = String(gameSettingsStore.gameDuration.minutes).padStart(2, '0');
        const paddedSeconds = String(gameSettingsStore.gameDuration.seconds).padStart(2, '0');
        return `${paddedMinutes}:${paddedSeconds}`;
    })

    return { formattedTime };
};